jQuery(document).ready(function () { // 시작 코드블럭

    /* 사이드바 열기 */
    jQuery("#header .open-gnb").on("click", function () {
        jQuery("#aside").addClass("active");
        jQuery("#layoutDimmed").addClass("active");
    });

    /* 사이드바 닫기 */
    jQuery(".side_close").on("click", function () {
        jQuery("#aside").removeClass("active");
        jQuery("#layoutDimmed").removeClass("active");
    });



    var swiper_visual = new Swiper(".aside-swiper", {
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
            el: ".aside-swiper .swiper-pagination",
            type: "fraction",
        },
    });



    /* 사이드바 카테고리 */
    (function () {
        var speed = 300;
        function getSubMenu($li) {
            return $li.children(".depth2, .depth3, .depth4").first();
        }
        function initSideCategory() {
            jQuery("#aside .side_middle li").each(function () {
                var $li = jQuery(this);
                var $subMenu = getSubMenu($li);

                if ($subMenu.length && !$li.hasClass("noChild")) {
                    $li.addClass("hasChild");

                    if ($li.hasClass("selected")) {
                        $subMenu.show();
                    } else {
                        $subMenu.hide();
                    }
                }
            });
        }
        function closeDescendants($li) {
            $li.find("li.hasChild").removeClass("selected");
            $li.find(".depth2, .depth3, .depth4").hide();
        }
        function closeSiblingMenus($li) {
            $li.siblings("li.hasChild.selected").each(function () {
                var $sibling = jQuery(this);
                var $subMenu = getSubMenu($sibling);

                $sibling.removeClass("selected");

                $subMenu.stop(true, true).slideUp(speed, function () {
                    closeDescendants($sibling);
                });
            });
        }

        jQuery(document).on("click", "#aside .side_middle li.hasChild > a .open", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $li = jQuery(this).closest("li");
            var $subMenu = getSubMenu($li);

            if (!$subMenu.length || $li.hasClass("noChild")) return;

            closeSiblingMenus($li);

            $li.toggleClass("selected");
            $subMenu.stop(true, true).slideToggle(speed, function () {
                if (!$li.hasClass("selected")) {
                    closeDescendants($li);
                }
            });
        });

        initSideCategory();

        if (window.MutationObserver) {
            var sideMiddle = document.querySelector("#aside .side_middle");

            if (sideMiddle) {
                var observer = new MutationObserver(function () {
                    initSideCategory();
                });

                observer.observe(sideMiddle, {
                    childList: true,
                    subtree: true
                });
            }
        }
    })();


    /* 사이드바 검색 클릭 */
    jQuery("#aside .side_icon .side_search").on("click", function () {
        jQuery("body").removeClass("side").addClass("searchOn");
        jQuery("#aside .side_cate li").removeClass("selected").css("margin-bottom", 0);
    });

});/* 시작 코드블럭 종료 */