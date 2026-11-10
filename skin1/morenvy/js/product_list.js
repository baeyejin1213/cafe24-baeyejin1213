$(document).ready(function () { // 시작 코드블럭
    /* 타이틀 : 상위 분류 > 현재 분류, 전체 상품 수 */
    const pathNames = jQuery(".list_title .path li:not(.displaynone) a").map(function () {
        return jQuery.trim(jQuery(this).text());
    }).get();
    if (pathNames.length > 2) {
        jQuery(".list_title .parent").text(pathNames[pathNames.length - 2]);
    } else {
        jQuery(".list_title .parent").remove();
    };
    jQuery(".list_title .title_count").text(jQuery.trim(jQuery(".list_prd .prdCount .prd_count").text()));


    /* 하위분류 없으면 list_tab 숨기기 */
    if (jQuery(".list_tab li").length === 0) {
        jQuery(".list_tab").addClass("displaynone");
    };


    /* 분류 상단 이미지 : 이미지 1 = PC, 이미지 2 = 모바일 (1장만 있으면 둘 다 사용) */
    const topImgs = jQuery(".list_ban .product_top_image img");
    if (topImgs.length === 0) {
        jQuery(".list_ban").addClass("displaynone");
    } else if (topImgs.length > 1) {
        jQuery(".list_ban").addClass("has_mo");
    };


    /* 추천상품 · 신상품 : 4개 보이고 1개씩 슬라이드 + 순위 숫자 + 페이지 점 (상품 없으면 영역 숨김) */
    jQuery(".list_rolling").each(function () {
        const sec = jQuery(this);
        const items = sec.find(".prdList > li");
        if (!items.length) return sec.addClass("displaynone");

        items.each(function (index) {
            jQuery(this).find(".num").text(String(index + 1).padStart(2, "0"));
        });

        new Swiper(sec.find(".prd_swiper")[0], {
            slidesPerView: "auto",
            spaceBetween: 12,
            watchOverflow: true,
            pagination: {
                el: sec.find(".swiper-pagination-prd")[0],
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                1025: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    });


    /* 정렬 : 현재 정렬 표시 */
    const sortParam = (location.search.match(/sort_method=\d+/) || [""])[0];
    jQuery(".list_prd #type a").each(function () {
        const href = jQuery(this).attr("href") || "";
        if (sortParam ? href.indexOf(sortParam) > -1 : jQuery(this).parent().index() === 0) jQuery(this).addClass("on");
    });


    /* 타임세일 진행 상품 표시 */
    function checkTimesale() {
        jQuery(".m_prd .prdList > li, .list_prd .prdList > li").each(function () {
            if (jQuery.trim(jQuery(this).find(".timesale_box").text()).length) jQuery(this).addClass("has_timesale");
        });
    };
    setTimeout(checkTimesale, 300);


    /* 더보기 버튼 눌렀을 때 : 새로 불러온 상품에도 타임세일 · 리뷰 처리 */
    $(".list_prd .more").on("click", function () {
        setTimeout(function () {
            addTimeSaleBox();
            jQuery(".list_prd .spec li[rel='리뷰']").each(function () {
                if (!jQuery(this).find(".review").length) jQuery(this).wrapInner("<div class='review'></div>");
            });
            setReviewRating();
            setTimeout(checkTimesale, 300);
        }, 500);
    });
}); // 시작 코드블럭 종료
