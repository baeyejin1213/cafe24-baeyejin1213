$(document).ready(function () { // 시작 코드블럭

    /* 추천상품 · 신상품 */
    $('.list_slide .swiper').each(function () {
        var $box = $(this).closest('.list_slide');
        if (!$(this).find('.prdList > li').length) { $box.addClass('displaynone'); return; }
        new Swiper(this, {
            slidesPerView: 1.6,
            spaceBetween: 12,
            grabCursor: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                600: {slidesPerView: 2.6, spaceBetween: 12},
                900: {slidesPerView: 3.4, spaceBetween: 20},
                1440: {slidesPerView: 4.4, spaceBetween: 20}
            }
        });
    });


    /* 상단 이미지 없으면 list_ban 숨기기 */
    if (jQuery(".list_ban .product_top_image img").length === 0) {
        jQuery(".list_ban").addClass("displaynone");
    }


    /* 하위 분류 탭 */
    var swiperTitleTab = null;

    function initOrDestroySwiper() {
        var $swiperContainer = $('.swiper_title_tab');
        if ($swiperContainer.length === 0) return;

        if (window.innerWidth < 1025) {
            if (!swiperTitleTab) {
                swiperTitleTab = new Swiper('.swiper_title_tab', {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    watchOverflow: true
                });
            }
        } else if (swiperTitleTab) {
            swiperTitleTab.destroy(true, true);
            swiperTitleTab = null;
        }
    }

    if (jQuery('.swiper_title_tab .swiper-slide').length > 0) {
        jQuery('.swiper_title_tab').addClass('default');
    }

    initOrDestroySwiper();
    $(window).on('resize', initOrDestroySwiper);

}); // 시작 코드블럭 종료
