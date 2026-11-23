jQuery(document).ready(function ($) {

    /* 탭 : 1024px 이하에서 가로로 끌어서 넘김 */
    var swiper_project = null;
    function initOrDestroySwiper() {
        if (!$('.swiper_project').length) return;
        if (window.innerWidth < 1025) {
            if (!swiper_project) {
                swiper_project = new Swiper('.swiper_project', {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    watchOverflow: true
                });
            }
        } else if (swiper_project) {
            swiper_project.destroy(true, true);
            swiper_project = null;
        }
    }
    initOrDestroySwiper();
    $(window).on('resize', initOrDestroySwiper);

    function getSectionRange($anchor) {
        var $start = $($anchor.attr('href'));
        if (!$start.length) return null;
        var $end = $start.next('.ec-base-product');
        var startTop = $start.offset().top - 200;
        var endBottom = $end.length ? $end.offset().top + $end.outerHeight() - 200 : startTop + $start.outerHeight();
        return {start: startTop, end: endBottom};
    }

    /* 스크롤 위치의 탭 표시 */
    $(window).on('scroll load', function () {
        var scrollTop = $(window).scrollTop();
        var $tabs = $('.swiper_project a');
        $tabs.parent().removeClass('selected');
        $tabs.each(function () {
            var range = getSectionRange($(this));
            if (range && scrollTop >= range.start && scrollTop < range.end) {
                var $li = $(this).parent().addClass('selected');
                if (swiper_project) swiper_project.slideTo($li.index());
                return false;
            }
        });
    });

    /* 탭 누르면 그 구역으로 이동 */
    $('.swiper_project a').on('click', function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href'));
        var gap = $('#header').outerHeight() + $('.fixTab').outerHeight() + 24;
        if ($target.length) $('html, body').animate({scrollTop: $target.offset().top - gap}, 500);
    });
});
