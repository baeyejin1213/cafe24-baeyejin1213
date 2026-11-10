jQuery(document).ready(function () { // 시작 코드블럭
    /* 사이드바 열기 (모바일 메뉴 버튼 · 전체메뉴 헤더 햄버거 버튼) */
    jQuery("#header .all_cate").on("click", function (e) {
        e.preventDefault();
        jQuery("body").addClass("side");
    });


    /* 사이드바 닫기 (닫기 버튼 · 바깥 dim 클릭) */
    function closeSide() {
        jQuery("body").removeClass("side");
        jQuery("#aside .side_cate li.selected").removeClass("selected").children("div").hide();
    };

    jQuery("#aside .side_close, #aside .side_dim").on("click", function (e) {
        e.preventDefault();
        closeSide();
    });


    /* 사이드바 카테고리 (화살표를 누르면 하위분류 펼침/접힘) */
    jQuery("#aside").on("click", ".side_cate .open", function (e) {
        e.preventDefault();
        const li = jQuery(this).closest("li");
        const sub = li.children("div");

        if (!sub.length) return;
        if (li.hasClass("selected")) {
            li.removeClass("selected");
            sub.stop().slideUp(300);
            li.find("li.selected").removeClass("selected").children("div").hide();
        } else {
            li.siblings(".selected").removeClass("selected").children("div").stop().slideUp(300);
            li.addClass("selected");
            sub.stop().slideDown(300);
        };
    });


    /* 사이드바 검색 (사이드바를 닫고 상단 검색창 열기) */
    jQuery("#aside .side_icon .side_search").on("click", function (e) {
        e.preventDefault();
        closeSide();
        jQuery("#header .h_sec03 .h_menu .search").trigger("click");
    });

});/* 시작 코드블럭 종료 */
