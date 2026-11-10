jQuery(document).ready(function () { // 시작 코드 블럭
    /* 메인 01 : 키비주얼 (index.html 의 section 클래스로 형태 선택 : kv_full / kv_banner / kv_card) */
    const visual = jQuery(".m_sec01.main_visual");
    const visualMulti = !visual.hasClass("kv_full"); // 배너형 · 카드형 : 여러 장이 함께 보임

    // 링크가 비어 있는 배너는 이미지 링크 제거
    visual.find(".kv_link").each(function () {
        const link = jQuery(this).attr("href");
        if (!link || link === "#" || link === "#none") jQuery(this).remove();
    });

    // 여러 장이 보이는 형태는 장수가 적으면 루프가 끊기므로 슬라이드를 복제해 채움
    const visualOrigin = visual.find(".swiper_visual .swiper-slide");
    if (visualMulti && visualOrigin.length > 1) {
        while (visual.find(".swiper_visual .swiper-slide").length < 8) {
            visualOrigin.clone().appendTo(visual.find(".swiper_visual .swiper-wrapper"));
        };
    };

    const visualLength = visual.find(".swiper_visual .swiper-slide").length;
    var swiper_visual = new Swiper(".swiper_visual", {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        slidesPerView: visualMulti ? "auto" : 1,
        centeredSlides: visualMulti,
        spaceBetween: visual.hasClass("kv_banner") ? 40 : visual.hasClass("kv_card") ? 24 : 0,
        loop: visualLength > 1,
        loopedSlides: visualMulti ? visualLength : null,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        speed: 1000,
        breakpoints: visualMulti ? {
            0: {spaceBetween: 12},
            768: {spaceBetween: visual.hasClass("kv_banner") ? 40 : 24},
        } : {},
        pagination: {
            el: ".swiper-pagination-visual",
            clickable: true,
        },
        navigation: {
            prevEl: ".swiper-button-prev-main",
            nextEl: ".swiper-button-next-main",
        },
    });


    /* 메인 01 : 키비주얼 모바일 페이지 표시 (현재 / 전체) */
    const kvFraction = visual.find(".kv_fraction");
    kvFraction.find(".total").text(visual.find(".swiper_visual .swiper-slide:not(.swiper-slide-duplicate)").length);
    swiper_visual.on("slideChange", function () {
        kvFraction.find(".cur").text(this.realIndex + 1);
    });


    /* 메인 02 : 카테고리 */
    var swiper01 = new Swiper(".swiper01", {
        slidesPerView: "auto",
        spaceBetween: 12,
        watchOverflow: true,
        breakpoints: {
            768: {
                spaceBetween: 40,
            },
        },
    });


    /* 메인 03 : 2단 배너 */
    var swiper02 = new Swiper(".swiper02", {
        enabled: false, // 1024px 이하 : 세로로 쌓기
        slidesPerView: 1,
        spaceBetween: 12,
        watchOverflow: true,
        pagination: {
            el: ".swiper-pagination02",
            clickable: true,
        },
        breakpoints: {
            1025: {
                enabled: true,
                slidesPerView: 2,
                spaceBetween: 24,
            },
        },
    });


    /* 메인 상품진열 형식 (section 클래스 : prd_tab / prd_rolling / prd_basic / prd_timesale) */
    jQuery(".m_prd").each(function () {
        const sec = jQuery(this);
        const first = sec.find(".tab_content").first();
        const items = first.find(".prdList > li");

        // 탭 진열형 : 탭 클릭 시 같은 순서의 tab_content 표시
        if (sec.hasClass("prd_tab")) {
            new Swiper(sec.find(".swiper_tab")[0], {
                slidesPerView: "auto",
                spaceBetween: 8,
                watchOverflow: true,
                breakpoints: {
                    768: {
                        spaceBetween: 12,
                    },
                },
            });

            sec.find(".prd_tab_menu li").each(function (index) {
                jQuery(this).on("click", function () {
                    jQuery(this).addClass("selected").siblings("li").removeClass("selected");
                    sec.find(".tab_content").removeClass("selected").eq(index).addClass("selected");
                });
            });
        };

        // 롤링 · 기본 진열형 : 순위 숫자 (01, 02 ...)
        if (sec.is(".prd_rolling, .prd_basic")) {
            items.each(function (index) {
                jQuery(this).find(".num").text(String(index + 1).padStart(2, "0"));
            });
        };

        // 롤링 진열형 : 4개 보이고 1개씩 슬라이드 + 페이지 점
        if (sec.hasClass("prd_rolling")) {
            first.find(".ec-base-product").addClass("swiper prd_swiper");
            first.find(".prdList").addClass("swiper-wrapper");

            new Swiper(first.find(".prd_swiper")[0], {
                slidesPerView: 1.6,
                spaceBetween: 8,
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
        };

        // 기본 진열형 : 2줄씩 보여주고 [더 보기] 로 2줄씩 추가 (줄당 개수 = 화면 열 수)
        if (sec.hasClass("prd_basic")) {
            const btn = sec.children(".btn_more");
            const cols = getComputedStyle(first.find(".prdList")[0] || document.body).gridTemplateColumns.split(" ").length || 5;
            const size = cols * 2;
            const total = Math.max(1, Math.ceil(items.length / size));
            let page = 1;

            items.slice(size).addClass("hide");
            btn.find(".total").text(total);
            if (total <= 1) btn.addClass("hide");

            btn.on("click", function () {
                page++;
                items.slice(0, page * size).removeClass("hide");
                btn.find(".cur").text(page);
                if (page >= total) btn.addClass("hide");
            });
        };
    });


    /* 메인 05 : 브랜드 라인업 */
    var swiper03 = new Swiper(".swiper03", {
        slidesPerView: "auto",
        spaceBetween: 12,
        breakpoints: {
            768: {
                spaceBetween: 20,
            },
        },
    });


    /* 메인 07 : 영상 (배너관리자 동영상 URL 1 — 유튜브 또는 mp4) */
    function getYoutubeId(url) {
        const match = (url || "").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match ? match[1] : "";
    };

    /* 메인 07 : 영상 쇼츠형 (가운데 카드만 썸네일을 숨기고 쇼츠 영상 자동 재생 · 음소거 반복) */
    const shorts = jQuery(".vd_shorts .swiper_shorts");

    // 배너관리자가 넣어 둔 영상은 미리 비우고 주소만 저장 (가운데 카드에서만 다시 불러옴)
    shorts.find(".swiper-slide .video").each(function () {
        const src = jQuery(this).find("iframe").attr("src") || jQuery(this).find("video, source").attr("src") || "";
        jQuery(this).attr({"data-yt": getYoutubeId(src), "data-src": src}).empty();
    });

    function playShorts(sw) {
        shorts.find(".card").removeClass("playing").find(".video").empty();

        const card = jQuery(sw.slides[sw.activeIndex]).find(".card");
        const wrap = card.find(".video");
        const id = wrap.attr("data-yt");
        const src = wrap.attr("data-src");

        if (id) {
            wrap.html('<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id + '&controls=0&playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>');
        } else if (src) {
            wrap.html('<video src="' + src + '" autoplay muted loop playsinline></video>');
        } else {
            return;
        };
        card.addClass("playing");
    };

    if (shorts.length) {
        const shortsLength = shorts.find(".swiper-slide").length;
        var swiper_shorts = new Swiper(shorts[0], {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 0,
            loop: shortsLength > 1,
            loopedSlides: shortsLength,
            speed: 600,
            slideToClickedSlide: true,
            on: {
                init: function () { playShorts(this); },
                slideChangeTransitionEnd: function () { playShorts(this); },
            },
        });
    };


    /* 메인 07 : 영상 배너형 (재생 버튼 클릭 시 유튜브 영상 재생) */
    jQuery(".vd_banner .video_thumb").on("click", function (e) {
        const ban = jQuery(this).parents(".m_ban");
        const wrap = ban.find(".video");
        const iframe = wrap.find("iframe");
        const video = wrap.find("video");
        const youtubeId = getYoutubeId(iframe.attr("src") || wrap.attr("data-video"));
        const link = jQuery(this).attr("href");

        if (youtubeId) {
            e.preventDefault();
            wrap.html('<iframe src="https://www.youtube.com/embed/' + youtubeId + '?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>');
            ban.addClass("playing");
        } else if (video.length) {
            e.preventDefault();
            ban.addClass("playing");
            video.attr({controls: true, playsinline: true});
            video[0].play();
        } else if (!link || link === "#" || link === "#none") {
            e.preventDefault();
        };
    });


    /* 메인 08 : 상품 스크롤바 */
    jQuery(".m_sec08 .right .prdArea").on("scroll", function () {
        const bar = jQuery(this).siblings(".scroll_bar");
        const thumb = bar.children("span");
        const scrollable = this.scrollHeight - this.clientHeight;

        if (scrollable <= 0) return;
        thumb.css("top", (this.scrollTop / scrollable) * (bar.height() - thumb.height()));
    });


    /* 메인 09 : 텍스트 배너 (끊김 없이 흐르도록 복제) */
    jQuery(".m_sec09 .marquee_list").clone().attr("aria-hidden", "true").appendTo(".m_sec09 .marquee");


    /* 메인 상품진열 : 타임세일 진행 상품 (모든 형식) */
    setTimeout(function () {
        jQuery(".m_prd .prdList > li").each(function () {
            if (jQuery.trim(jQuery(this).find(".timesale_box").text()).length) {
                jQuery(this).addClass("has_timesale");
            };
        });
    }, 300);


    /* 메인 11 : 이벤트 배너 슬라이드형 (가운데 배너의 글씨만 보임) */
    jQuery(".ev_slide .thumb").each(function () {
        const link = jQuery(this).attr("href");
        if (!link || link === "#" || link === "#none") jQuery(this).removeAttr("href");
    });

    const eventLength = jQuery(".swiper_event .swiper-slide").length;
    var swiper_event = new Swiper(".swiper_event", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 12,
        loop: eventLength > 1,
        loopedSlides: eventLength,
        speed: 800,
        slideToClickedSlide: true,
        breakpoints: {
            768: {
                spaceBetween: 40,
            },
        },
    });


    /* 메인 11 : 이벤트 배너 배너형 (PC 만 배경 고정, 모바일은 이미지 그대로) */
    jQuery(".ev_banner .m_ban").each(function () {
        const img = jQuery(this).find(".bg img").get(0);
        if (!img) return;
        const ban = jQuery(this);
        const setBg = function () {
            if (jQuery(window).innerWidth() <= 767) {
                ban.css("background-image", "").removeClass("fixed_bg");
                return;
            };
            ban.css("background-image", "url('" + (img.currentSrc || img.src) + "')").addClass("fixed_bg");
        };
        img.complete ? setBg() : jQuery(img).on("load", setBg);
        jQuery(window).on("resize", setBg);
    });


    /* 메인 12 : 스포트라이트 (배너 1개 + 상품 2개씩 묶음 / 상하형 sp_col · 좌우형 sp_row) */
    jQuery(".m_sec12").each(function () {
        const sec = jQuery(this);
        const bans = sec.find(".spot_ban .morenvy-banner");
        const items = sec.find(".main_prd .prdList > li");
        if (!bans.length) return;

        const list = jQuery('<div class="sp_list swiper"><div class="sp_wrap swiper-wrapper"></div></div>');
        bans.each(function (index) {
            const group = jQuery('<div class="sp_group swiper-slide"><div class="sp_ban"></div><div class="main_prd type_h"><div class="ec-base-product"><ul class="prdList"></ul></div></div></div>');
            group.find(".sp_ban").append(this);
            group.find(".prdList").append(items.slice(index * 2, index * 2 + 2));
            list.children(".sp_wrap").append(group);
        });
        sec.find(".spot_ban, .prdArea").remove();
        sec.append(list);

        new Swiper(list[0], sec.hasClass("sp_row") ? {
            slidesPerView: "auto",
            spaceBetween: 12,
            watchOverflow: true,
            breakpoints: {
                768: {
                    slidesPerView: "auto",
                    spaceBetween: 24,
                },
                1025: {
                    slidesPerView: "auto",
                    spaceBetween: 44,
                },
            },
        } : {
            slidesPerView: "auto",
            spaceBetween: 12,
            watchOverflow: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                1025: {
                    slidesPerView: 3,
                    spaceBetween: 44,
                },
            },
        });
    });


    /* 메인 13 : 리뷰 */
    var swiper04 = new Swiper(".swiper04", {
        slidesPerView: "auto",
        spaceBetween: 12,
        watchOverflow: true,
        pagination: {
            el: ".swiper-pagination04",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1025: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });


    /* 메인 14 : 인스타그램 */
    const instaLength = jQuery(".swiper05 .swiper-slide").length;
    var swiper05 = new Swiper(".swiper05", {
        slidesPerView: "auto",
        spaceBetween: 12,
        centeredSlides: false,
        loop: instaLength > 1,
        loopedSlides: instaLength,
        breakpoints: {
            768: {
                spaceBetween: 20,
                centeredSlides: true,
            },
        },
    });

}); // 시작 코드 블럭 종료