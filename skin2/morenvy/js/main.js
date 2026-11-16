jQuery(document).ready(function () { // 시작 코드 블럭

	/* 메인 01 : 키비주얼 */
	// 고정 박스 텍스트 업데이트 함수
	function updateFixedText(swiper) {
		var activeSlide = swiper.slides[swiper.activeIndex];
		if (!activeSlide) return;

		var originTxt = activeSlide.querySelector('.origin_txt');
		var fixedBox = document.querySelector('.main_visual .fixed_txt_box');
		var fixedTxtInner = fixedBox ? fixedBox.querySelector('.txt') : null;

		if (originTxt && fixedBox) {
			// 부드러운 전환 효과를 위해 살짝 사라졌다가 글자 변경
			if (fixedTxtInner) fixedTxtInner.classList.add('is-changing');

			setTimeout(function() {
				var title = originTxt.querySelector('h2') ? originTxt.querySelector('h2').innerHTML : '';
				var desc = originTxt.querySelector('p') ? originTxt.querySelector('p').innerHTML : '';
				var btn = originTxt.querySelector('button') ? originTxt.querySelector('button').innerHTML : '';
				
				var titleColor = originTxt.querySelector('h2') ? originTxt.querySelector('h2').style.color : '';
				var descColor = originTxt.querySelector('p') ? originTxt.querySelector('p').style.color : '';
				var btnColor = originTxt.querySelector('button') ? originTxt.querySelector('button').style.color : '';

				var link = originTxt.querySelector('.slide_link') ? originTxt.querySelector('.slide_link').innerText : '#';
				var target = originTxt.querySelector('.slide_target') ? originTxt.querySelector('.slide_target').innerText : '_self';

				// 데이터 반영
				var fixedTitle = fixedBox.querySelector('.fixed_title');
				var fixedDesc = fixedBox.querySelector('.fixed_desc');
				var fixedBtn = fixedBox.querySelector('.fixed_btn');
				var fixedLink = fixedBox.querySelector('.fixed_link');

				if (fixedTitle) { fixedTitle.innerHTML = title; fixedTitle.style.color = titleColor; }
				if (fixedDesc) { fixedDesc.innerHTML = desc; fixedDesc.style.color = descColor; }
				if (fixedBtn) { fixedBtn.innerHTML = btn; fixedBtn.style.color = btnColor; }
				if (fixedLink) { fixedLink.setAttribute('href', link); fixedLink.setAttribute('target', target); }

				if (fixedTxtInner) fixedTxtInner.classList.remove('is-changing');
			}, 150);
		}
	}

	var swiper_visual = new Swiper(".swiper_visual", {
		observer: true,
		observerParents: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: -0.5,
		loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
		speed: 1000,
		pagination: {
			el: ".swiper-pagination-visual",
			type: "fraction",
		},
		navigation: {
			prevEl: ".swiper-button-prev-main",
			nextEl: ".swiper-button-next-main",
		},
		on: {
			init: function () {
				updateFixedText(this);
			},
			slideChange: function () {
				updateFixedText(this);
			}
		}
	});

    var singleswiper = new Swiper(".single-swiper", {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
		pagination: {
            el: ".swiper-pagination-single",
        },
        navigation: {
            prevEl: ".swiper-button-prev-single",
            nextEl: ".swiper-button-next-single",
        },	
		/*
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
		*/
    });



(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ⓪ 부드러운 스크롤: 휠 스크롤만 부드럽게 (모바일 터치는 기본 스크롤 그대로) */
  if (window.Lenis) {
    new Lenis({
      lerp: 0.1,               // 작을수록 더 미끄러짐 (0.05 ~ 0.15 권장)
      autoRaf: true,
      anchors: true,           // #앵커 링크도 부드럽게 이동
      allowNestedScroll: true  // 메뉴·검색 레이어 등 안쪽 스크롤 영역은 그대로 스크롤
    });
  }

  /* ① 히어로 커튼: 히어로는 느리게 내려가며 커지고 어두워지고, 아래 영역이 덮으며 올라옴 */
  var HERO_SPEED = 0.5;  // 히어로가 스크롤을 따라 내려가는 비율 (0 = 보통 스크롤, 1 = 완전 고정)
  var HERO_ZOOM = 0.06;  // 다 덮일 때까지 사진이 커지는 정도 (100% → 106%)
  var HERO_DIM = 0.5;    // 다 덮일 때 어두워지는 정도
  var hero = document.querySelector('.main_visual');
  if (hero) document.documentElement.classList.add('hero-parallax');

  /* ② 배너 패럴렉스: 배너마다 사진 틀(picture) 높이를 기준으로, 틀이 위로 지나가면 사진은 내려가며 확대
     (모바일처럼 배너가 위아래로 쌓여도 사진이 틀 밖으로 밀려나 빈 공간이 생기지 않음) */
  var units = [];
  document.querySelectorAll('#contents section:not(.main_visual) .morenvy-banner').forEach(function (b) {
    b.querySelectorAll('picture img').forEach(function (img) { img.style.objectFit = 'cover'; });
    units.push({
      frame: b.querySelector('picture') || b,
      imgs: b.querySelectorAll('picture img'),
      // 사진 위에 겹친 문구만 위로 빠지며 흐려짐 (사진 아래 문구 박스는 그대로)
      txts: Array.prototype.filter.call(b.querySelectorAll('.txt'), function (t) {
        return getComputedStyle(t).position === 'absolute';
      })
    });
  });

  /* ③ 글자 채움: 문구를 글자 단위로 나눠 두고, 화면 85% 지점 → 40% 지점을 지나는 동안 순서대로 진해짐 */
  var fills = [];
  document.querySelectorAll('.m_sec05 .txt').forEach(function (el) {
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { split(c); return; }
        if (c.nodeType !== 3 || !c.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        c.textContent.split('').forEach(function (ch) {
          if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
          var s = document.createElement('span');
          s.className = 'px-ch';
          s.textContent = ch;
          frag.appendChild(s);
        });
        node.replaceChild(frag, c);
      });
    })(el);
    el.classList.add('px-fill');
    fills.push({ el: el, chars: el.querySelectorAll('.px-ch'), done: -1 });
  });

  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  var ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;

    if (hero) {
      // 히어로 자신은 움직이므로 바로 다음 영역의 위치로 원래 자리를 계산
      var h = hero.offsetHeight;
      var next = hero.nextElementSibling;
      var top = next ? next.getBoundingClientRect().top + window.pageYOffset - h : 0;
      var moved = clamp(window.pageYOffset - top, 0, h);
      var hp = moved / h;
      hero.style.transform = moved ? 'translate3d(0,' + (moved * HERO_SPEED).toFixed(1) + 'px,0)' : '';
      hero.style.setProperty('--hero-zoom', (1 + hp * HERO_ZOOM).toFixed(4));
      hero.style.setProperty('--hero-dim', (hp * HERO_DIM).toFixed(3));
    }

    units.forEach(function (u) {
      var box = u.frame.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      // 0: 영역 상단이 화면 맨 위 / 1: 영역이 화면 밖으로 다 나감
      var p = clamp(-box.top / box.height, 0, 1);
      u.imgs.forEach(function (img) {
        img.style.transform = 'translate3d(0,' + (p * box.height * 0.15) + 'px,0) scale(' + (1.02 + p * 0.3) + ')';
      });
      u.txts.forEach(function (t) {
        t.style.transform = 'translate3d(0,' + (-p * 80) + 'px,0)';
        t.style.opacity = 1 - p * 1.4;
      });
    });

    fills.forEach(function (f) {
      var r = f.el.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      var p = clamp((vh * 0.85 - mid) / (vh * 0.45), 0, 1);
      var n = Math.round(p * f.chars.length);  // 진하게 보일 글자 수
      if (n === f.done) return;
      for (var i = 0; i < f.chars.length; i++) f.chars[i].style.opacity = i < n ? 1 : '';
      f.done = n;
    });
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

})();


}); // 시작 코드 블럭 종료