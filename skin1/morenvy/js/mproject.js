/* morenvy.com 250825 지인 */
jQuery(document).ready(function () {

    /* 탭 스와이퍼 */
    var swiper_project = new Swiper('.swiper_project', {
        slidesPerView: 'auto',
        spaceBetween: 32,
        watchOverflow: true,
        observer: true,
        observeParents: true,
    });

    function getSectionRange($anchor) {
        var targetId = $anchor.attr('href');
        var $start = $(targetId);
        var $end = $start.next('.ec-base-product');

        if ($start.length && $end.length) {
            var startTop = $start.offset().top - 200;
            var endBottom = $end.offset().top + $end.outerHeight() - 200;
            return { start: startTop, end: endBottom };
        } else if ($start.length) {
            var startTop = $start.offset().top  - 200;
            var endBottom = startTop + $start.outerHeight() - 200;
            return { start: startTop, end: endBottom };
        }
        return null;
    }

    // 스크롤 시 active 토글
    $(window).on('scroll load', function () {
        var scrollTop = $(window).scrollTop();
        var found = false;

        $('.swiper_project a').each(function () {
            var range = getSectionRange($(this));
            if (!range) return;

            if (scrollTop >= range.start && scrollTop < range.end) {
                $('.swiper_project a').removeClass('active');
                $(this).addClass('active');
                // 👉 현재 위치한 슬라이드로 스와이프 이동
                var slideIndex = $(this).closest('.swiper-slide').index();
                swiper_project.slideTo(slideIndex);
                found = true;
                return false; // 첫 번째 해당 영역만 처리
            }
        });

        if (!found) {
            $('.swiper_project a').removeClass('active');
            $(".swiper_project .bar_under").hide();
        } else {
            $(".swiper_project .bar_under").show();
        }
        
        const activeLi = $(".swiper_project li:has(.active)");
        if (activeLi.length > 0) {
            console.log(activeLi.offsetParent())
            $(".swiper_project .bar_under").css({width: activeLi.css("width"), left: activeLi.position().left});
        };
    });

    // 클릭 시 스크롤 이동 + active 처리
    $('.swiper_project a').on('click', function (e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        var $target = $(targetId);

        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 120
            }, 500);

            $('.swiper_project a').removeClass('active');
            $(this).addClass('active');
        }
        
        const activeLi = $(".swiper_project li:has(.active)");
        $(".swiper_project .bar_under").css({width: activeLi.css("width"), left: activeLi.position().left});
    });
});