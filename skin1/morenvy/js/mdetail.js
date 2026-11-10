/* morenvy.com 250811 지인 */
jQuery(document).ready(function () {
    // 메인 이미지 슬라이더
    var swiper_keyimg = new Swiper('.swiper_keyimg', {
        slidesPerView: 1,
        spaceBetween: 0,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        speed: 700,
        pagination: {
            el: '.swiper-pagination-keyimg',
            clickable: true,
        },
    });

    /* 추가 이미지 */
    var swiper_addimg = new Swiper('.swiper_addimg', {
        slidesPerView: "auto", // 썸네일 120px 고정 폭
        spaceBetween: 16,
        watchOverflow: true,
        observer: true,
        observeParents: true,
    });

    jQuery(".swiper_addimg .swiper-slide").each(function (index) {
        jQuery(this).on("click", function () {
            swiper_keyimg.slideTo(index);
        });
    });


    /* 브랜드 추가 */
    jQuery('.infoArea .mainArea').prepend('<div class="brand_name">' + jQuery('[rel="브랜드"] .m_item').text() + '</div>')

    if (jQuery('.brand_name').text().trim().length < 1) {
        jQuery('.brand_name').hide();
    }


    /* 상품 요약 설명 없으면 삭제 */
    if (jQuery('.summary_desc').text().trim().length < 1) {
        jQuery('.summary_desc').hide();
    }

    /* 상세페이지 : 구매하기 */
	jQuery('.infoArea .layer_open').click(function(){
		jQuery('#wrap').addClass('layer_option');
	});
	jQuery('.infoArea .layer_close , #layoutDimmed').click(function(){
		jQuery('#wrap').removeClass('layer_option');
	});

    /* 상품 상세페이지 탭 클릭하면 스크롤 부드럽게 */
    // jQuery('.detail_fix_menu ul a').on('click', function (e) {
    //     e.preventDefault();


    //     if (jQuery(window).width() > 1024) {
    //         var offsetTop = jQuery($(this).attr('href')).offset().top - 120;
    //     } else {
    //         var $clickedLi = jQuery(this).closest('li');
    //         var $selectLi = jQuery('.detail_fix_menu ul li.select');
    //         var isLeftOfSelect = $clickedLi.index() < $selectLi.index();

    //         var offsetTop = jQuery(jQuery(this).attr('href')).offset().top - (isLeftOfSelect ? 120 : 70);
    //     }

    //     jQuery('body,html').animate({
    //         scrollTop: offsetTop
    //     }, 600);
    // });

    /* 상품 상세페이지 탭 스크롤에 따라 클래스 추가 */
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        var current = "";

        if ($(".xans-product-additional .detail_fix_menu").offset().top - scrollTop - $("#header").outerHeight() === 0) {
            $(".xans-product-additional .detail_fix_menu").addClass("fixed");
        } else {
            $(".xans-product-additional .detail_fix_menu").removeClass("fixed");
        };

        $(".xans-product-additional > div").each(function () {
            var id = "#" + $(this).attr("id");
            var offsetTop = $(this).offset().top - 180;


            if (scrollTop >= offsetTop) {
                current = id;
                $('.detail_menu a[href="' + current + '"]').parent("li").addClass("select").siblings().removeClass('select');
            }

            if (!current) {
                $(".detail_menu li").removeClass("select");

                $('.detail_menu a[href="#prdDetail"]')
                    .parent("li")
                    .addClass("select");
            }
        });


        jQuery('.detail_menu').attr('data-bar', jQuery('.detail_menu .select').index() + 1);
    });

    // jQuery('.detail_menu a').on('click',f')


    /* 쿠폰 팝업 ============================================================ */

    jQuery('div.coupon_btn').bind('click', function (e) {
        e.preventDefault();
        jQuery('#coupon_pop').bPopup({
            follow: [true, true],
            position: ['50%', '50%'],
            modalClose: true,
            opacity: 0.4,
            positionStyle: 'fixed',
            onOpen: function () {
                $("body").css("overflow", "hidden"); // 스크롤 막기
            },
            onClose: function () {
                $("body").css("overflow", "auto"); // 스크롤 다시 허용
            }
        });
    });
    jQuery('.btn_share').bind('click', function (e) {
        e.preventDefault();
        jQuery('.detail_sns').bPopup({
            follow: [true, true],
            position: ['50%', '50%'],
            modalClose: true,
            opacity: 0.4,
            positionStyle: 'fixed'
        });
    });
    jQuery('.sns_popup .close').click(function () {
        jQuery('.detail_sns').bPopup().close(); // bPopup 닫기 메서드 호출
    });

    /* 쿠폰 팝업 종료 ============================================================ */


    /* URL 복사 ================================================================= */

    $('#copyButton').on('click', function () {
        const url = $(location).attr('href'); // 복사할 URL
        const $hiddenTextarea = $('#hiddenTextarea');

        // Clipboard API 지원 여부 확인
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () {
                alert('URL이 복사되었습니다! :)');
            }).catch(function (err) {
                console.error('Clipboard API 사용 실패:', err);
            });
        } else {
            // 구형 브라우저 대응 (텍스트 영역 사용)
            $hiddenTextarea.val(url).select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    alert('URL이 복사되었습니다! :)');
                } else {
                    alert('복사에 실패했습니다. 수동으로 복사해주세요.');
                }
            } catch (err) {
                console.error('execCommand 사용 실패:', err);
            }
            $hiddenTextarea.blur(); // 텍스트 영역 비활성화
        }
    });

    /* URL 복사 종료 ================================================================= */


    /* 상세 옵션 : 스크롤형은 하단 상세를 이미지 아래로 옮기고, 정보 영역이 길면 아래 끝에 맞춰 고정 */
    var pdpScroll = jQuery("#pdpType").hasClass("pdp_scroll");
    if (pdpScroll) {
        var detailArea = jQuery("#pdpType .xans-product-detail .detailArea");
        detailArea.find(".imgArea").wrap("<div class='pdp_left'></div>");
        detailArea.find(".pdp_left").append(jQuery("#pdpType .xans-product-additional"));

        var pdpInfo = detailArea.find(".infoArea");
        var setInfoTop = function () {
            pdpInfo.css("top", Math.min(100, window.innerHeight - pdpInfo.outerHeight() - 40) + "px");
        };
        setInfoTop();
        jQuery(window).on("resize load", setInfoTop);
    }


    /* 관련상품 : 기본형 4개 · 스크롤형 3개 */
    var swiper_rel = new Swiper('.swiper_rel', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1.6,
        spaceBetween: 10,
        breakpoints: {
            768: {
                spaceBetween: 20,
                slidesPerView: 3,
            },
            1025: {
                spaceBetween: 20,
                slidesPerView: pdpScroll ? 3 : 4,
            },
        },
        navigation: {
            prevEl: ".swiper-button-prev-rel",
            nextEl: ".swiper-button-next-rel",
        },
        pagination: {
            el: ".swiper-pagination-rel",
            clickable: true,
        },
    });

    
    /* 추가 구성 상품 ================================================================================== */



    /* 추가구성상품 */
    // var swiper_add_option = new Swiper('.swiper_add_option', {
    //     slidesPerView: 3.5,
    //     spaceBetween: 8,
    //     // autoHeight : true,
    //     // watchOverflow: 'true',
    //     // observer: true,
    //     // observeParents: true,
    //     // speed: 700,
    //     // touchReleaseOnEdges: 'true',
    //     // navigation: {
    //     //     nextEl: '.swiper-button-next-add',
    //     //     prevEl: '.swiper-button-prev-add',
    //     // },
    //     // breakpoints: {
    //     //     1024: {
    //     //         slidesPerView: 4,
    //     //     },
    //     // },
    // });

    /* 추가 구성 상품 종료 ================================================================================== */


    /* 옵션 없으면 클래스 추가 */
    jQuery('#totalProducts tbody:not(.option_products) tr').each(function () {
        if (jQuery(this).length > 0) {
            jQuery(this).parent().addClass('noOption');
        }
    });

    /* 추가 구성 상품 토글 */
    jQuery('.add_item_box > .title').on('click', function () {
        var scrollTop = jQuery(window).scrollTop(); // 현재 스크롤 위치 저장

        jQuery('.add_item_box').toggleClass('active');
        jQuery('.add_item_box .product').slideToggle(400, function () {
            // 애니메이션 종료 후 스크롤 위치 복구
            jQuery(window).scrollTop(scrollTop);
        });
    });


    /* 구매안내 토글 */
    jQuery('#prdInfo .info_t_title').on('click', function () {

        jQuery('html,body').animate({
            scrollTop: jQuery('#prdInfo').offset().top - 120
        }, 400);

        jQuery(this).parent().toggleClass('active')
            .siblings().removeClass('active')
            .find('.prdInfo_text').stop().slideUp(400);

        jQuery(this).siblings('.prdInfo_text').stop().slideToggle(400);
    });


    // /* 상세 타임세일 */
    // var periodText = $('[rel="할인 기간"] .m_item .period').text().trim();
    // var $outputBox = $('.detail_time_box');

    // if (!periodText.includes('~')) return;

    // var timeArr = periodText.split('~');
    // var startStr = $.trim(timeArr[0]);
    // var endStr = $.trim(timeArr[1]);

    // var startDate = new Date(startStr.replace(/-/g, '/'));
    // var endDate = new Date(endStr.replace(/-/g, '/'));

    // function getTimeParts(ms) {
    //     var totalSec = Math.floor(ms / 1000);
    //     var days = Math.floor(totalSec / 86400);
    //     var hours = Math.floor((totalSec % 86400) / 3600);
    //     var minutes = Math.floor((totalSec % 3600) / 60);
    //     var seconds = totalSec % 60;
    //     return { days: days, hours: hours, minutes: minutes, seconds: seconds };
    // }

    // function renderCountdown(label, remainMs) {
    //     var time = getTimeParts(remainMs);

    //     var html = '';
    //     html += '<div class="countdown_box">';
    //     html += '<span class="cd_label">' + label + ' </span>';
    //     html += '<span class="cd_time">';
    //     html += '<div class="time_icon"></div>';
    //     html += '<span class="num">' + time.days + 'd</span> : ';
    //     html += '<span class="num">' + String(time.hours).padStart(2, '0') + '</span> : ';
    //     html += '<span class="num">' + String(time.minutes).padStart(2, '0') + '</span> : ';
    //     html += '<span class="num">' + String(time.seconds).padStart(2, '0') + '</span> ';
    //     html += '<span class="unit">남음</span>';
    //     html += '</span>';
    //     html += '</div>';

    //     $outputBox.html(html);
    // }

    // function updateCountdown() {
    //     var now = new Date();

    //     if (now < startDate) {
    //         renderCountdown('시작 전', startDate - now);
    //     } else if (now >= startDate && now <= endDate) {
    //         renderCountdown('타임세일', endDate - now);
    //     } else {
    //         $outputBox.html(
    //             '<div class="countdown_box end">' +
    //             '<span class="cd_label">할인 종료</span>' +
    //             '</div>'
    //         );
    //         clearInterval(interval);
    //     }
    // }

    // updateCountdown(); // 최초 실행
    // var interval = setInterval(updateCountdown, 1000); // 1초마다 갱신


    /* 쿠폰 텍스트 형식 변경 */
    jQuery('#coupon_pop .discount').each(function () {
        var $this = jQuery(this);
        var text = $this.text().trim();

        // % 할인 처리
        if (text.includes('%')) {
            text = text.replace(/(\d+)\.0%(.*)/, '$1%$2');  // "77.0% 할인" → "77% 할인"
        }

        // 원 할인 처리
        if (text.includes('원')) {
            text = text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');  // 숫자에 천단위 콤마 추가
        }

        $this.text(text);
    });
});

/* 카카오톡 공유 링크
Kakao.init('');
function sendLink() {
    var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    var sharetitle = jQuery(".xans-product-detail .minfoArea .prd_info .prd_name").text();
    var summary = jQuery(".xans-product-detail .minfoArea .prd_info .summary_desc").text();
    var shareimg = jQuery(".xans-product-detail .mimgArea .swiper_addimg .swiper-wrapper .swiper-slide:first-child img").attr('src');
    Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: sharetitle,
      description: summary,
      imageUrl: 'https:'+shareimg,
      link: {
        mobileWebUrl: newURL,
        webUrl: newURL
      }
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: newURL,
          webUrl: newURL
        }
      },
    ]
  });
}
 */

/* 페이스북 공유 */
function shareFacebook() {
    var c = document.querySelector('link[rel=canonical]');
    var url = encodeURIComponent((c && c.href) || (location.origin + location.pathname));

    var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;

    // 모바일 브라우저 감지
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // 모바일은 직접 이동 (팝업 차단 방지)
        location.href = shareUrl;
    } else {
        // PC는 팝업
        window.open(shareUrl, 'facebooksharedialog',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=1090'
        );
    }
}

var displaystatus = "none";
// 바로선택 오픈상태
jQuery(document).ready(function() {
    jQuery(".infoArea .layer_open").click(function() {
        if (displaystatus == "none") {
            jQuery("div#pop_option_box.on").slideDown(300);
            jQuery("div#pop_option_box").addClass("on");
            displaystatus = "display";
        } else {
            jQuery("div#pop_option_box.on").slideUp(300);
            jQuery("div#pop_option_box").removeClass("on");
            displaystatus = "none";
        }
    });
    jQuery('.infoArea .layer_close , #layoutDimmed').click(function() {
        jQuery("div#pop_option_box.on").slideUp(300);
        jQuery("div#pop_option_box").removeClass("on");
        setTimeout(function() {
            displaystatus = "none";
        }, 300)
    })
});

var layerHeight = jQuery('#pop_option_box').innerHeight();
/* morenvy.com 상세페이지 상품정보 따라다니기 */
jQuery(window).scroll(function() {
	var buttonstart_height = $('div.xans-product-additional .detail_fix_menu').offset();
    if (jQuery(this).scrollTop() + 56 >= buttonstart_height.top) {
        jQuery("div#pop_option_box").addClass("on");
        jQuery('.xans-product-detaildesign').css('padding-bottom', layerHeight + 'px');
		
        if (displaystatus == "none") {
            jQuery("div#pop_option_box").css("display", "none");
        }
    } else {
        jQuery("div#pop_option_box").removeClass("on");
        jQuery('.xans-product-detaildesign').css('padding-bottom', ''); // 원래대로 복구
		
        if (displaystatus == "none") {
            jQuery("div#pop_option_box").css("display", "block");
        }
		
		jQuery('.infoArea .layer_close').trigger('click')
    }
});

/* 상세 : 구매 수 · 무이자 할부 팝업 · 오늘출발 */
jQuery(document).ready(function () {
    /* 공유하기 : 상품명 줄 오른쪽으로 */
    jQuery(".infoArea .btn_share").prependTo(".infoArea .mainArea");


    /* 구매 수 : 상품정보 표시 항목 [구매수] 값을 말풍선으로 */
    const buyRow = jQuery(".xans-product-detaildesign tr[rel='구매수']");
    const buyNum = jQuery.trim(buyRow.find(".m_item").text());
    buyRow.remove();
    if (buyNum) {
        jQuery(".buy_count span").text("총 " + buyNum.replace(/명$/, "") + "명");
        jQuery(".buy_count").removeClass("displaynone");
    }


    /* 무이자 할부 팝업 */
    const installPop = jQuery("#installment_pop").appendTo("body");
    jQuery(".btn_installment").on("click", function () {
        installPop.addClass("on");
    });
    installPop.on("click", function (e) {
        if (e.target === this || jQuery(e.target).closest(".pop_close").length) installPop.removeClass("on");
    });


    /* 오늘출발 : 배너관리자 타이틀의 마감 시간까지 남은 시간 (지나면 숨김) */
    function updateTodayShip() {
        const area = jQuery(".today_ship");
        const time = (area.find(".morenvy-banner").attr("data-time") || "").match(/(\d{1,2})\s*:\s*(\d{2})/);
        const now = new Date();
        const left = time ? Math.ceil((new Date().setHours(+time[1], +time[2], 0, 0) - now) / 60000) : 0;
        area.toggleClass("on", left > 0);
        if (left <= 0) return;

        const hour = Math.floor(left / 60);
        const text = (hour ? hour + "시간 " : "") + (left % 60 ? left % 60 + "분" : "");
        area.find(".txt").html("<b>" + jQuery.trim(text) + "안에 주문</b>하시면 <span>오늘 발송</span> 됩니다.");
    }
    updateTodayShip();
    setInterval(updateTodayShip, 1000); // 배너관리자 출력이 늦어도 인식
});


/* 옵션 : 미리보기에 이미지를 등록한 옵션은 시안의 목록형으로 (이름 · 금액 · 추가금액 · 무료배송 아이콘) */
jQuery(document).ready(function () {
    const limitMatch = jQuery(".free_shipping .delivery_price").text().match(/([\d,]+)원\s*이상/);
    const freeLimit = limitMatch ? Number(limitMatch[1].replace(/,/g, "")) : 0;
    const toNum = function (text) {
        return Number(String(text).replace(/[^0-9]/g, ""));
    };
    const basePrice = toNum(jQuery(".prd_price .sale:not(.displaynone)").first().text()) || toNum(jQuery("#span_product_price_text").text());

    jQuery(".xans-product-option ul.ec-product-preview").each(function () {
        const list = jQuery(this);
        if (!list.find("li a img").length) return; // 색상칩(이미지 없음)은 그대로

        list.addClass("opt_list").closest("tr").addClass("opt_box");
        // 추가구성상품 옵션은 해당 상품 금액 기준
        const addBox = list.closest(".add_item_box li.box");
        const listBase = addBox.length ? (toNum(addBox.find(".price_box .salePrice").first().text()) || toNum(addBox.find(".price_box .price").first().text())) : basePrice;
        list.find("li").each(function () {
            const item = jQuery(this);
            const match = (item.attr("title") || "").match(/^(.*?)\s*\(([+-])([\d,]+)원\)\s*$/);
            const name = match ? match[1] : item.attr("title");
            const add = match ? toNum(match[3]) * (match[2] === "-" ? -1 : 1) : 0;
            const price = listBase + add;

            const info = jQuery("<span class='opt_info'><em class='name'></em><span class='price'><b></b></span></span>");
            info.find(".name").text(name);
            info.find("b").text(price.toLocaleString() + "원");
            if (match) info.find(".price").append(jQuery("<i></i>").text("(" + match[2] + match[3] + ")"));
            item.find("a").append(info);
            if (freeLimit && price >= freeLimit) item.find("a").append("<span class='opt_free'>무료배송</span>");
        });
    });

    /* 옵션 박스 접기 · 펼치기 */
    jQuery(".xans-product-option tr.opt_box > th").on("click", function () {
        jQuery(this).toggleClass("off").next("td").slideToggle(200);
    });
});
