$(document).ready(function () { // 시작 코드블럭

    /* 추천상품 · 신상품 가로 슬라이드 (마우스로 끌어서 넘김)
       한 줄에 보이는 상품 수(slidesPerView)로 카드 폭을 정함. 소수점 = 다음 상품이 살짝 보이게
       시안 : PC 1920 카드 400 · 간격 20 (1840+20)/420 ≈ 4.4 / 모바일 360 카드 200 · 간격 12 (320+12)/212 ≈ 1.6 */
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


    /* 하위 분류 탭 : 1024px 이하에서 가로로 끌어서 넘김 */
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
