/* morenvy.com 250811 지인 */
jQuery(document).ready(function () {

	detail_slide ();
	jQuery(window).resize(function(){
		detail_slide ();
	});

	var swiper_addimg = null;
	/* morenvy.com 추가이미지 썸네일 리사이즈 */
	function detail_slide() {
		var all_size = window.innerWidth;
		if (all_size < 768) {
			if (!swiper_addimg) { // swiper_addimg가 없을 때만 생성
				swiper_addimg = new Swiper('.swiper_addimg', {
					slidesPerView: '1',
					watchOverflow: true,
					pagination: {
						el: ".swiper-pagination-addimg",
						type: "fraction",
					},
				});
			}
		} else {
			if (swiper_addimg) { // swiper_addimg가 있을 때만 삭제
				swiper_addimg.destroy(true, true);
				swiper_addimg = null; // 제거 후 null 처리
			}
		}
	}


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

    jQuery('.toggle-title button').click(function(){
        jQuery(this).toggleClass('on');
        jQuery('.toggle-table').slideToggle('fast');
    });


    $('.detail_menu a').on('click', function (e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        var $target = $(targetId);
        if ($target.length) {
            // 상단 Header + Sticky Menu의 전체 높이 계산 (여유값 20px 추가)
            var headerHeight = $("#header").length ? $("#header").outerHeight() : 0;
            var menuHeight = $(".detail_pc_fix_menu").outerHeight() || 0;
            var totalOffset = headerHeight + menuHeight + 20;
            var targetPosition = $target.offset().top - totalOffset;
            $('html, body').stop().animate({
                scrollTop: targetPosition
            }, 400);
        }
    });


    // 2. 스크롤 감지 및 활성화 상태 변경
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        var headerHeight = $("#header").length ? $("#header").outerHeight() : 0;
        var menuHeight = $(".detail_pc_fix_menu").outerHeight() || 0;
        // 감지 여유 기준점 (메뉴 높이 + 여유 offset)
        var offsetOffset = headerHeight + menuHeight + 50; 
        var current = "";
        // 각 섹션 감지
        $(".xans-product-additional > div").each(function () {
            var id = $(this).attr("id");
            if (!id) return;
            var targetId = "#" + id;
            var offsetTop = $(this).offset().top - offsetOffset;
            if (scrollTop >= offsetTop) {
                current = targetId;
            }
        });

        // 탭 active 처리 및 data-bar 갱신
        if (current) {
            $('.detail_menu a[href="' + current + '"]')
                .parent("li")
                .addClass("select")
                .siblings()
                .removeClass("select");
        } else {
            $(".detail_menu li").removeClass("select");
            $('.detail_menu a[href="#prdDetail"]').parent("li").addClass("select");
        }
        var selectIndex = $(".detail_menu li.select").index();
        if (selectIndex !== -1) {
            $(".detail_menu").attr("data-bar", selectIndex + 1);
        }
    });





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


    /* 관련상품 */
    var swiper_rel = new Swiper('.swiper_rel', {
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
            prevEl: ".swiper-button-prev-rel",
            nextEl: ".swiper-button-next-rel",
        },
    });

  

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
    jQuery(".infoArea .layer_open").click(function() {
        if (jQuery(window).width() > 768) return;
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
        if (jQuery(window).width() > 768) return;
        jQuery("div#pop_option_box.on").slideUp(300);
        jQuery("div#pop_option_box").removeClass("on");
        setTimeout(function() {
            displaystatus = "none";
        }, 300);
    });

jQuery(window).scroll(function() {
    if (jQuery(window).width() <= 768) {
        var $fixMenu = $('div.xans-product-additional .detail_fix_menu');
        if (!$fixMenu.length) return;
        var buttonstart_height = $fixMenu.offset();
        var layerHeight = jQuery('#pop_option_box').innerHeight();
        if (jQuery(this).scrollTop() + 56 >= buttonstart_height.top) {
            jQuery("div#pop_option_box").addClass("on");
            jQuery('.xans-product-detaildesign').css('padding-bottom', layerHeight + 'px');
            if (displaystatus == "none") {
                jQuery("div#pop_option_box").css("display", "none");
            }
        } else {
            jQuery("div#pop_option_box").removeClass("on");
            jQuery('.xans-product-detaildesign').css('padding-bottom', ''); 
            if (displaystatus == "none") {
                jQuery("div#pop_option_box").css("display", "block");
            }
            jQuery('.infoArea .layer_close').trigger('click');
        }
    }
});