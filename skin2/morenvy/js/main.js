/* 메인 */
jQuery(function ($) {

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    /* 배너관리자 영역이 채워질 때까지 기다렸다가 실행 (최대 6초) */
    function whenBanner(sel, fn) {
        var tries = 0;
        (function check() {
            var $area = $(sel);
            if (!$area.length) return;
            var ready = $area.hasClass('init') || $area.find('.morenvy-banner img').length;
            if (ready || tries++ > 30) fn($area);
            else setTimeout(check, 200);
        })();
    }

    /* 01 / 03 표시 */
    function setCount($box, swiper, total) {
        $box.find('.cur').text(pad(swiper.realIndex + 1));
        $box.find('.total').text(pad(total));
    }


    /* 키비주얼 */
    whenBanner('.kv_swiper', function ($area) {
        var total = $area.find('.swiper-slide').length;
        var $count = $('.m_sec01 .kv_count');
        if (total < 2) { $count.hide(); $('.m_sec01 .kv_btn').hide(); }
        new Swiper($area[0], {
            loop: total > 1,
            speed: 1000,
            autoplay: total > 1 ? {delay: 6000, disableOnInteraction: false} : false,
            navigation: {prevEl: '.m_sec01 .kv_btn.prev', nextEl: '.m_sec01 .kv_btn.next'},
            on: {
                init: function () { setCount($count, this, total); },
                slideChange: function () { setCount($count, this, total); }
            }
        });
    });


    /* 카테고리 아이콘 */
    whenBanner('.cate_list', function ($area) {
        new Swiper($area[0], {
            slidesPerView: 'auto',
            spaceBetween: 12,
            centerInsufficientSlides: true,
            grabCursor: true,
            breakpoints: {1025: {spaceBetween: 26}}
        });
    });


    /* 상품 가로 슬라이드 */
    var prdSwipers = [];
    $('.main_wrap .prd_slide').each(function () {
        if (!$(this).find('.prdList > li').length) { $(this).closest('.tab_panel, .prd_slide').addClass('empty'); return; }
        var inBanner = $(this).closest('.m_sec04').length;
        var views = inBanner
            ? {0: [2.2, 12], 600: [3.2, 12], 768: [4.2, 12], 1025: [1.6, 24], 1440: [2.3, 24]}
            : {0: [1.6, 12], 600: [2.6, 12], 900: [3.4, 20], 1440: [4.4, 20]};
        var bp = {};
        $.each(views, function (w, v) { bp[w] = {slidesPerView: v[0], spaceBetween: v[1]}; });
        prdSwipers.push(new Swiper(this, {
            slidesPerView: bp[0].slidesPerView,
            spaceBetween: bp[0].spaceBetween,
            grabCursor: true,
            observer: true,
            observeParents: true,
            breakpoints: bp
        }));
    });


    /* Weekly Best 탭 */
    $('.m_sec03 .tab_menu').on('click', 'button', function () {
        var idx = $(this).parent().index();
        $(this).parent().addClass('on').siblings().removeClass('on');
        $('.m_sec03 .tab_panel').removeClass('on').eq(idx).addClass('on');
        $.each(prdSwipers, function (i, s) { s.update(); });
    });


    /* Hot Deal */
    var $timer = $('.m_sec06 .deal_timer');
    function parseEnd(txt) {
        var m = $.trim(txt || '').match(/^(\d{4})[-.\/](\d{1,2})[-.\/](\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
        if (!m) return null;
        return new Date(+m[1], m[2] - 1, +m[3], m[4] ? +m[4] : 23, m[5] ? +m[5] : 59, m[6] ? +m[6] : (m[4] ? 0 : 59));
    }
    function startTimer(fixedEnd) {
        (function tick() {
            var now = new Date();
            var end = fixedEnd || new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            var s = Math.max(0, Math.floor((end - now) / 1000));
            var d = Math.floor(s / 86400);
            s %= 86400;
            $timer.text((d > 0 ? d + '일 ' : '') + pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60));
            if (fixedEnd && end <= now) return;
            setTimeout(tick, 1000 - now.getMilliseconds());
        })();
    }
    if ($timer.length) {
        if ($('.deal_end').length) {
            whenBanner('.deal_end', function ($area) {
                startTimer(parseEnd($area.find('.end').first().text()));
            });
        } else {
            startTimer(null);
        }
    }


    /* 2단 배너 */
    whenBanner('.two_swiper', function ($area) {
        var total = $area.find('.swiper-slide').length;
        var $count = $('.m_sec07 .two_count');
        var $blur = $('.m_sec07 .right .blur');
        if (total < 2) $count.hide();
        function setBlur(swiper) {
            var img = swiper.slides[swiper.activeIndex] && swiper.slides[swiper.activeIndex].querySelector('img');
            if (img) $blur.css('background-image', 'url("' + (img.currentSrc || img.src) + '")');
        }
        new Swiper($area[0], {
            loop: total > 1,
            speed: 800,
            autoplay: total > 1 ? {delay: 5000, disableOnInteraction: false} : false,
            on: {
                init: function () { setCount($count, this, total); setBlur(this); },
                slideChange: function () { setCount($count, this, total); setBlur(this); }
            }
        });
    });


    /* 프로모션 배너 */
    whenBanner('.promo_list', function ($area) {
        new Swiper($area[0], {
            slidesPerView: 1.1,
            spaceBetween: 16,
            grabCursor: true,
            breakpoints: {
                600: {slidesPerView: 2.1, spaceBetween: 16},
                1025: {slidesPerView: 3, spaceBetween: 16},
                1281: {slidesPerView: 3, spaceBetween: 32}
            }
        });
    });
});
