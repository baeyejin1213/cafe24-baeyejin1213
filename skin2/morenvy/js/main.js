/* -------------------------------------------------------------------
    에이가구(a GaGu) 메인 동작
    - 키비주얼 · 2단 배너 슬라이드 (배너관리자가 배너를 채운 뒤 시작)
    - 상품 가로 슬라이드, Weekly Best 탭, Hot Deal 카운트다운
------------------------------------------------------------------- */
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


    /* ① 키비주얼 */
    whenBanner('.gg_kv_swiper', function ($area) {
        var total = $area.find('.swiper-slide').length;
        var $count = $('.gg_kv .kv_count');
        if (total < 2) { $count.hide(); $('.gg_kv .kv_btn').hide(); }
        new Swiper($area[0], {
            loop: total > 1,
            effect: 'fade',
            fadeEffect: {crossFade: true},
            speed: 1000,
            autoplay: total > 1 ? {delay: 6000, disableOnInteraction: false} : false,
            navigation: {prevEl: '.gg_kv .kv_btn.prev', nextEl: '.gg_kv .kv_btn.next'},
            on: {
                init: function () { setCount($count, this, total); },
                slideChange: function () { setCount($count, this, total); }
            }
        });
    });


    /* ② 상품 가로 슬라이드 (마우스로 끌어서 넘김) */
    var prdSwipers = [];
    $('.gg_main .gg_prd_slide').each(function () {
        if (!$(this).find('.prdList > li').length) { $(this).closest('.gg_panel, .gg_prd_slide').addClass('empty'); return; }
        var inBanner = $(this).closest('.gg_bnprd').length;
        prdSwipers.push(new Swiper(this, {
            slidesPerView: 'auto',
            spaceBetween: 12,
            freeMode: {enabled: true, momentum: true},
            grabCursor: true,
            observer: true,
            observeParents: true,
            breakpoints: {768: {spaceBetween: inBanner ? 24 : 20}}
        }));
    });


    /* ③ Weekly Best 탭 */
    $('.gg_tabprd .gg_tab').on('click', 'button', function () {
        var idx = $(this).parent().index();
        $(this).parent().addClass('on').siblings().removeClass('on');
        $('.gg_tabprd .gg_panel').removeClass('on').eq(idx).addClass('on');
        $.each(prdSwipers, function (i, s) { s.update(); });
    });


    /* ④ Hot Deal : 오늘 자정까지 남은 시간 */
    var $timer = $('.gg_hotdeal .gg_timer');
    if ($timer.length) {
        (function tick() {
            var now = new Date();
            var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            var s = Math.max(0, Math.floor((end - now) / 1000));
            $timer.text(pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60));
            setTimeout(tick, 1000 - now.getMilliseconds());
        })();
    }


    /* ⑤ 2단 배너 오른쪽 슬라이드 (뒤 배경 = 현재 사진을 흐리게) */
    whenBanner('.gg_two_swiper', function ($area) {
        var total = $area.find('.swiper-slide').length;
        var $count = $('.gg_two .two_count');
        var $blur = $('.gg_two .right .blur');
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
});
