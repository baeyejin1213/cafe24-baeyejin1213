jQuery(document).ready(function () {
    /* notToday_pop 쿠키가 없으면 팝업 출력 */
    if (!getCookiefss("notToday_pop")) {
        setTimeout(function () {
            jQuery(".main_popup").addClass("on");
        }, 500);

        setTimeout(function () {
            jQuery(".main_popup .popup").addClass("up");
        }, 1000);
    };

    var swiper_visual = new Swiper(".popup-swiper", {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        spaceBetween: -0.5,
        loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        speed: 1000,
        pagination: {
            el: ".popup-swiper .swiper-pagination",
            type: "fraction",
        },
    });


    /* 팝업 닫기 */
    jQuery(".main_popup .popup .btn_close").on("click", function () {
        jQuery(this).parents(".main_popup").hide();
    });

    /* 하루 동안 보지 않기 */
    jQuery(".main_popup .popup .notToday").on("click", function () {
        jQuery(this).parents(".main_popup").hide();
        setCookieCpa("notToday_pop", "yes", 1);
    });
});