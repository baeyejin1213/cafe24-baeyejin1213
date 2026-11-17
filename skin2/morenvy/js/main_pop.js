/* 메인 : 팝업 */
jQuery(function ($) {
    var $pop = $('.main_popup');
    if (!$pop.length || getCookiefss('notToday_pop')) return;

    var tries = 0;
    (function check() {
        var $area = $pop.find('.popup_swiper');
        var ready = $area.hasClass('init') || $area.find('.morenvy-banner img').length;
        if (!ready && tries++ < 30) return setTimeout(check, 200);

        var total = $area.find('.swiper-slide').length;
        if (!total) return;
        var mo = window.innerWidth < 1025;
        function num(n) { return mo && n < 10 ? '0' + n : String(n); }
        var $count = $pop.find('.pop_count');
        $count.find('.total').text(num(total));
        if (total < 2) $count.addClass('hide');

        new Swiper($area[0], {
            loop: total > 1,
            speed: 800,
            autoplay: total > 1 ? {delay: 5000, disableOnInteraction: false} : false,
            on: {slideChange: function () { $count.find('.cur').text(num(this.realIndex + 1)); }}
        });
        $count.find('.cur').text(num(1));

        $pop.addClass('on');
        setTimeout(function () { $pop.find('.popup').addClass('up'); }, 100);
    })();

    /* 닫기 / 오늘 하루 보지 않기 */
    $pop.on('click', '.btn_close', function () { $pop.removeClass('on'); });
    $pop.on('click', function (e) { if (e.target === this) $pop.removeClass('on'); });  /* 모바일 딤 누르면 닫기 */
    $pop.on('click', '.notToday', function (e) {
        e.preventDefault();
        $pop.removeClass('on');
        setCookieCpa('notToday_pop', 'yes', 1);
    });
});
