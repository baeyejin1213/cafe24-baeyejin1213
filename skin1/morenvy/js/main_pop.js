jQuery(document).ready(function () {
    /* 팝업 이미지 슬라이드 (배너 2개 이상일 때만 넘김 · 페이지 점 표시) */
    const popLength = jQuery(".main_popup .swiper_pop .swiper-slide").length;

    // 배너가 없으면 팝업을 띄우지 않음
    if (!popLength) return jQuery(".main_popup").remove();

    // 링크가 비어 있는 배너는 이미지 링크 제거
    jQuery(".main_popup .pop_link").each(function () {
        const link = jQuery(this).attr("href");
        if (!link || link === "#" || link === "#none") jQuery(this).contents().unwrap();
    });

    var swiper_pop = new Swiper(".swiper_pop", {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: popLength > 1,
        speed: 600,
        autoplay: popLength > 1 ? {
            delay: 4000,
            disableOnInteraction: false,
        } : false,
        pagination: {
            el: ".swiper-pagination-pop",
            clickable: true,
        },
    });


    /* notToday_pop 쿠키가 없으면 팝업 출력 */
    if (!getCookiefss("notToday_pop")) {
        setTimeout(function () {
            jQuery(".main_popup").addClass("on");
        }, 500);

        setTimeout(function () {
            jQuery(".main_popup .popup").addClass("up");
        }, 1000);
    };

    /* 팝업 닫기 (X · 닫기 버튼 · 바깥 배경 클릭) */
    function closePop() {
        jQuery(".main_popup").removeClass("on");
    };

    jQuery(".main_popup .btn_close, .main_popup .btn_wrap .close").on("click", function (e) {
        e.preventDefault();
        closePop();
    });

    jQuery(".main_popup").on("click", function (e) {
        if (e.target === this) closePop();
    });

    /* 오늘하루 보지않기 */
    jQuery(".main_popup .notToday").on("click", function (e) {
        e.preventDefault();
        closePop();
        setCookieCpa("notToday_pop", "yes", 1);
    });
});
