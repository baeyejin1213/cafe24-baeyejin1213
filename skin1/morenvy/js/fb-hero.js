/*
    메인 히어로 슬라이드 (flybaby.berlin mu-slideshow 이식) — index.html에서만 로드
    - 슬라이드는 모렌비 배너관리자가 페이지 로드 후 채운다 → 채워진 영역(.init)을 확인한 뒤 한 번만 초기화
    - 전환: .is-active 크로스페이드 / 진행 막대: 영상 재생 진행률(영상 끝나면 다음), 영상 없는 슬라이드는 5초 타이머
    - PC/모바일 미디어: 이미지 슬롯 1·2, 동영상 URL 1·2 를 화면 폭 1000px 기준으로 골라 쓴다(없으면 다른 쪽으로 대체)
*/
(function () {
    document.documentElement.classList.add('mb-js');

    var BREAKPOINT = '(max-width: 999px)';
    var IMAGE_DURATION = 5000;
    var mq = window.matchMedia ? window.matchMedia(BREAKPOINT) : null;

    function isMobile() { return !!(mq && mq.matches); }

    // 배너관리자가 치환하지 못한 {#…} 글자(예: 동영상 URL 2 행이 없는 배너의 {#video_2}) 제거
    function stripLeftovers(el) {
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function (n) {
            if (n.nodeValue.indexOf('{#') > -1) n.nodeValue = n.nodeValue.replace(/\{#[a-zA-Z0-9_]+\}/g, '');
        });
    }

    function usableImg(wrap) {
        var img = wrap && wrap.querySelector('img');
        return !!(img && img.getAttribute('src'));
    }

    function slideVideoEl(slide, kind) {
        return slide.querySelector('.fb-hero-video--' + kind + ' video');
    }

    function init(area) {
        var root = area.closest('.fb-hero');
        if (!root || root.getAttribute('data-hero-init')) return;
        root.setAttribute('data-hero-init', '1');
        stripLeftovers(area);

        var slides = Array.prototype.slice.call(area.querySelectorAll('.fb-hero-slide'));
        var controls = root.querySelector('.fb-hero-controls');
        var bulletsWrap = root.querySelector('.fb-hero-bullets');
        var toggle = root.querySelector('.fb-hero-playpause');
        if (!slides.length) { root.style.display = 'none'; return; }

        // 서버가 붙이는 loop/autoplay 제거 — loop면 ended가 안 오고, autoplay면 비활성 슬라이드 영상도 재생된다
        slides.forEach(function (slide) {
            Array.prototype.forEach.call(slide.querySelectorAll('video'), function (v) {
                v.loop = false;
                v.removeAttribute('loop');
                v.removeAttribute('autoplay');
                v.muted = true;
                v.setAttribute('playsinline', '');
                v.setAttribute('preload', 'metadata');
                v.pause();
                v.addEventListener('playing', function () { v.classList.add('is-ready'); });
                v.addEventListener('ended', function () { onVideoEnd(v); });
                v.addEventListener('pause', function () {
                    // 끝 근처에서 pause만 오고 ended가 안 오는 경우 대비
                    if (!suppressPause && v.duration && v.currentTime >= v.duration - 0.25) onVideoEnd(v);
                });
                v.addEventListener('timeupdate', function () {
                    if (v === activeVideo() && v.duration) setProgress(v.currentTime / v.duration);
                });
            });
        });

        // 슬라이드별 PC/모바일 미디어 선택
        function pickMedia(slide) {
            var mo = isMobile();
            var hasPc = usableImg(slide.querySelector('.fb-hero-media--pc'));
            var hasMo = usableImg(slide.querySelector('.fb-hero-media--mo'));
            slide.setAttribute('data-img', (mo && hasMo) || !hasPc ? 'mo' : 'pc');

            var vPc = slideVideoEl(slide, 'pc');
            var vMo = slideVideoEl(slide, 'mo');
            var srcOf = function (v) { return v ? (v.getAttribute('src') || v.getAttribute('data-src') || '') : ''; };
            var pick = null;
            if (mo) pick = srcOf(vMo) ? 'mo' : (srcOf(vPc) ? 'pc' : null);
            else pick = srcOf(vPc) ? 'pc' : (srcOf(vMo) ? 'mo' : null);
            if (pick) slide.setAttribute('data-video', pick); else slide.removeAttribute('data-video');

            // 쓰지 않는 쪽 영상은 src를 떼서 내려받지 않는다
            [['pc', vPc], ['mo', vMo]].forEach(function (pair) {
                var v = pair[1];
                if (!v) return;
                if (pair[0] === pick) {
                    if (!v.getAttribute('src') && v.getAttribute('data-src')) {
                        v.setAttribute('src', v.getAttribute('data-src'));
                        v.load();
                    }
                } else if (v.getAttribute('src')) {
                    v.setAttribute('data-src', v.getAttribute('src'));
                    v.pause();
                    v.removeAttribute('src');
                    v.load();
                }
            });
        }

        // 진행 막대(bullet)는 슬라이드 수만큼 생성
        bulletsWrap.innerHTML = '';
        var bullets = slides.map(function (s, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'fb-hero-bullet';
            b.setAttribute('role', 'tab');
            b.setAttribute('aria-label', (i + 1) + '번 슬라이드로 이동');
            b.innerHTML = '<span class="track" aria-hidden="true"></span><span class="fill" aria-hidden="true"></span>';
            b.addEventListener('click', function () { if (i !== activeIndex) goTo(i); });
            bulletsWrap.appendChild(b);
            return b;
        });

        var activeIndex = 0;
        var playing = true;
        var rafId = 0, imageStart = 0, imageElapsed = 0, watchdog = 0;
        var suppressPause = false;
        var advanced = typeof WeakSet === 'function' ? new WeakSet() : null;

        function activeVideo() {
            var slide = slides[activeIndex];
            var kind = slide.getAttribute('data-video');
            return kind ? slideVideoEl(slide, kind) : null;
        }
        function pauseVideo(v) { suppressPause = true; v.pause(); suppressPause = false; }
        function setProgress(r) {
            r = r < 0 ? 0 : r > 1 ? 1 : r;
            var b = bullets[activeIndex];
            if (b) b.style.setProperty('--fb-hero-progress', (r * 100) + '%');
        }
        function stopTimer() { if (rafId) cancelAnimationFrame(rafId); rafId = 0; }
        function tick(now) {
            var elapsed = imageElapsed + (now - imageStart);
            setProgress(elapsed / IMAGE_DURATION);
            if (elapsed >= IMAGE_DURATION) { goTo(activeIndex + 1); return; }
            rafId = requestAnimationFrame(tick);
        }
        function startTimer(resume) {
            stopTimer();
            if (!resume) imageElapsed = 0;
            imageStart = performance.now();
            rafId = requestAnimationFrame(tick);
        }
        function pauseTimer() {
            if (!rafId) return;
            imageElapsed += performance.now() - imageStart;
            stopTimer();
        }
        function clearWatchdog() { if (watchdog) clearTimeout(watchdog); watchdog = 0; }
        function playVideo(v, fromStart) {
            clearWatchdog();
            if (fromStart) {
                try { v.currentTime = 0; } catch (e) {}
                if (advanced) advanced['delete'](v);
            }
            var p = v.play();
            if (p && p['catch']) p['catch'](function () {});
            // 1.2초 안에 재생이 시작되지 않으면(자동재생 차단 등) 다음 슬라이드로
            watchdog = setTimeout(function () {
                if (activeVideo() === v && v.paused && v.currentTime < 0.1) goTo(activeIndex + 1);
            }, 1200);
        }
        function onVideoEnd(v) {
            if (v !== activeVideo() || !playing) return;
            if (advanced) { if (advanced.has(v)) return; advanced.add(v); }
            goTo(activeIndex + 1);
        }
        function activate(index) {
            stopTimer();
            clearWatchdog();
            var prev = activeVideo();
            if (prev) pauseVideo(prev);
            slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
            bullets.forEach(function (b, i) {
                b.classList.toggle('is-active', i === index);
                b.setAttribute('aria-selected', i === index ? 'true' : 'false');
                if (i !== index) b.style.removeProperty('--fb-hero-progress');
            });
            activeIndex = index;
            setProgress(0);
            if (!playing) return;
            var v = activeVideo();
            if (v) playVideo(v, true); else startTimer(false);
        }
        function goTo(index) {
            var n = slides.length;
            activate(((index % n) + n) % n);
        }

        toggle.addEventListener('click', function () {
            playing = !playing;
            toggle.classList.toggle('is-paused', !playing);
            toggle.setAttribute('aria-pressed', playing ? 'false' : 'true');
            toggle.setAttribute('aria-label', playing ? '일시정지' : '재생');
            var v = activeVideo();
            if (playing) { if (v) playVideo(v, false); else startTimer(true); }
            else { clearWatchdog(); if (v) pauseVideo(v); else pauseTimer(); }
        });

        slides.forEach(pickMedia);
        if (mq) {
            var onChange = function () {
                slides.forEach(pickMedia);
                goTo(activeIndex); // 현재 슬라이드를 새 미디어로 처음부터
            };
            if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
        }

        if (slides.length < 2) bulletsWrap.style.display = 'none';
        activate(0);
        root.classList.add('is-ready');
    }

    function scan() {
        Array.prototype.forEach.call(document.querySelectorAll('.fb-hero-track.morenvy-banner-area.init'), init);
    }

    // 배너관리자 엔진 이벤트(영역 치환 완료) + 이미 끝난 경우 대비 재확인
    document.addEventListener('after-morenvy-banner-area', scan);
    document.addEventListener('after-morenvy-banner', scan);
    document.addEventListener('DOMContentLoaded', function () {
        if (window.jQuery) window.jQuery(document).on('after-morenvy-banner-area after-morenvy-banner', scan);
        scan();
    });
    window.addEventListener('load', function () {
        scan();
        // 안전망: 엔진이 영역을 처리하지 못했으면(데이터 없음·스크립트 오류) 원문이 보이지 않게 히어로를 숨긴다
        setTimeout(function () {
            scan();
            Array.prototype.forEach.call(document.querySelectorAll('.fb-hero:not(.is-ready)'), function (root) {
                root.style.display = 'none';
            });
        }, 5000);
    });
})();
