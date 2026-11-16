$(document).ready(function () { // 시작 코드블럭
    /* 추천 & 신상품 */
    var swiper_recmd, swiper_new;
    const swiperVars = [swiper_recmd, swiper_new];
    const swiperClasses = [".swiper_recmd", ".swiper_new"];
    const swiperPrev = [".swiper-button-prev-recmd", ".swiper-button-prev-new"];
    const swiperNext = [".swiper-button-next-recmd", ".swiper-button-next-new"];
    jQuery.each(swiperVars, function (index, swiperVar) {
        jQuery.each(swiperClasses, function (i, swiperClass) {
            if (index === i) {
                swiperVar = new Swiper(swiperClass, {
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                    slidesPerView: 1.2,
                    spaceBetween: 0,
                    breakpoints: {
                        1024: {
                            spaceBetween: 0,
                            slidesPerView: 4,
                        },
                        768: {
                            spaceBetween: 0,
                            slidesPerView: 2,
                        },
                    },
                    navigation: {
                        prevEl: swiperPrev[index],
                        nextEl: swiperNext[index],
                    },
                });
            }
        })
    })


    /* 배너 이미지 없으면 list_ban 숨기기 */
    if (jQuery(".list_ban .product_top_image img").length === 0) {
        jQuery(".list_ban").addClass("displaynone");
    };

    var swiperTitleTab = null;

    function initOrDestroySwiper() {
        var windowWidth = $(window).width();
        var $swiperContainer = $('.swiper_title_tab');

        if ($swiperContainer.length === 0) return;

        // 1400 이하: 초기화
        if (windowWidth <= 1024) {
            if (!swiperTitleTab) {
                swiperTitleTab = new Swiper('.swiper_title_tab', {
                    slidesPerView: 'auto',
                    watchOverflow: true,
                    spaceBetween: 4,
                    breakpoints: {
                        768: {
                            spaceBetween: 4
                        }
                    }
                });
            }
        }
        // 1400 초과: 제거
        else {
            if (swiperTitleTab) {
                swiperTitleTab.destroy(true, true);
                swiperTitleTab = null;
            }
        }
    }

    if (jQuery('.swiper_title_tab .swiper-slide').length > 0) {
        jQuery('.swiper_title_tab').addClass('default');
    }

    initOrDestroySwiper(); // 상품 목록 탭 반응형


    $(window).on('resize', function () {
        initOrDestroySwiper();  // 상품 목록 탭 반응형
    });



    /* 더보기 버튼 눌렀을 때 */
    $(".list_prd .more").on("click", function () {
        /* 할인율, 타임세일박스 */
        setTimeout(function () {
            addTimeSaleBox();

            jQuery(".spec").each(function () {
                /* 브랜드 */
                if (jQuery(this).siblings(".brand").length === 0) {
                    jQuery(this).siblings(".name").before("<div class='brand'></div>");
                    jQuery(this).siblings(".brand").each(function () {
                        jQuery(this).text(jQuery(this).siblings(".spec").find("li[rel='브랜드']").children(".m_item").children("span").text());
                    });
                };

                if (jQuery(this).find(".review").length === 0) {
                    /* 리뷰 */
                    jQuery(this).find("li[rel='리뷰']").each(function () {
                        jQuery(this).wrapInner("<div class='review'></div>");
                    });
                };
            });

            /* 장바구니 버튼 */
            jQuery(".ec-base-product .thumbnail .button .cart img.ec-admin-icon.cart").each(function () {
                jQuery(this).siblings(".cart_icon").attr("src", jQuery(this).attr("src"));
            });
        }, 500);
    });


}); // 시작 코드블럭 종료