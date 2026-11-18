/* 에이가구 : 상품 상세 (product/detail.html) */
jQuery(function ($) {

    var isMo = function () { return window.innerWidth < 1025; };
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };


    /* ① 대표 이미지 슬라이드 : 01 / 05 */
    var $keyImg = $('.swiper_keyimg');
    if ($keyImg.find('.swiper-slide').length) {
        new Swiper($keyImg[0], {
            slidesPerView: 1,
            watchOverflow: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination-keyimg',
                type: 'custom',
                renderCustom: function (swiper, cur, total) {
                    return total > 1 ? '<span class="cur">' + pad(cur) + '</span><span class="bar"></span><span>' + pad(total) + '</span>' : '';
                }
            }
        });
    }

    if (!$.trim($('.infoArea .summary_desc').text())) $('.infoArea .summary_desc').hide();

    /* 세트상품 가격 : 상품정보 표에 판매가 줄이 없으면 공통 할인율 계산(cal_percent)이 돌지 않으므로 직접 계산 */
    function setPrice() {
        var $p = $('.infoArea > .mainArea .prd_price');
        if (!$('.xans-product-setproduct').length || !$p.length || $('.xans-product-detaildesign tr[rel="판매가"]').length) return;
        var num = function (s) { return Number(String(s).split('(')[0].replace(/[^0-9]/g, '')) || 0; };
        var won = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; };
        var $price = $p.find('.price'), $sale = $p.find('.sale'), $rate = $p.find('.sale_box');
        var price = num($price.text());
        var sale = $sale.hasClass('displaynone') ? 0 : num($sale.text());
        if (sale && sale < price) {
            $price.text(won(price)).addClass('through').css('display', '');
            $sale.removeClass('displaynone').text(won(sale)).css('display', '');
            $rate.text(Math.round((price - sale) / price * 100) + '%').css('display', '');
        } else {
            $price.text(won(price)).removeClass('through').css('display', '');
            $sale.hide();
            $rate.text('').css('display', '');
        }
    }
    setPrice();
    $(window).on('load', setPrice);


    /* ② 팝업 : 쿠폰받기 · 공유하기 */
    var $dim = $('<div class="pop_dim"></div>').appendTo('body');
    function openPop($pop) {
        $('body > .layer_pop').removeClass('on');
        $pop.addClass('on');
        $dim.addClass('on');
        $('html').css('overflow', 'hidden');
    }
    function closePop() {
        $('body > .layer_pop').removeClass('on');
        $dim.removeClass('on');
        $('html').css('overflow', '');
    }
    function movePop(sel) {
        var $pop = $(sel).first();
        if ($pop.length && !$pop.parent().is('body')) $pop.appendTo('body');
        return $('body > ' + sel);
    }
    $(document).on('click', '.coupon_btn', function (e) {
        e.preventDefault();
        openPop(movePop('#coupon_pop'));
    });
    $(document).on('click', '.share_icon', function (e) {
        e.preventDefault();
        openPop(movePop('.sns_popup'));
    });
    $(document).on('click', '.layer_pop .pop_close, .pop_dim', closePop);
    $(document).on('keydown', function (e) { if (e.key === 'Escape') closePop(); });

    /* 쿠폰 문구 : 77.0% → 77%, 원 단위 콤마 */
    function formatCoupon() {
        $('#coupon_pop .discount').each(function () {
            var text = $.trim($(this).text()).replace(/(\d+)\.0%/, '$1%');
            if (text.indexOf('원') > -1) text = text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            $(this).text(text);
        });
    }
    formatCoupon();
    $(window).on('load', formatCoupon);

    /* 공유 */
    var pageUrl = function () {
        var c = document.querySelector('link[rel=canonical]');
        return (c && c.href) || (location.origin + location.pathname + location.search);
    };
    $(document).on('click', '.share_kakao', function () {
        if (typeof sendLink === 'function') sendLink();
    });
    $(document).on('click', '.share_facebook', function () { shareFacebook(); });
    $(document).on('click', '.share_x', function () {
        var url = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(pageUrl()) + '&text=' + encodeURIComponent($.trim($('.infoArea .prd_name').first().text()));
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) location.href = url;
        else window.open(url, 'xsharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    });
    $(document).on('click', '.share_url', function () {
        var url = pageUrl();
        var done = function () { alert('URL이 복사되었습니다.'); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(done);
        } else {
            var $t = $('<textarea>').val(url).css({position: 'fixed', opacity: 0}).appendTo('body').select();
            document.execCommand('copy');
            $t.remove();
            done();
        }
    });


    /* ③ 추가구성상품 펼치기 */
    $(document).on('click', '.add_item_box > .title', function () {
        $(this).parent().toggleClass('active').children('.product').stop().slideToggle(300);
    });


    /* ④ 무료배송 바 : 옵션 상품은 고른 옵션이 하나도 없으면 숨김 */
    var $freeShip = $('.xans-product-detail .free_shipping');
    function checkFreeShip() {
        var hasRow = $('#totalProducts tr.option_product, #totalProducts tr.add_product').length > 0
            || $('#totalProducts > table > tbody:not(.displaynone, .option_products, .add_products) > tr:first-child').length > 0;
        $freeShip.toggleClass('off', !hasRow);
    }
    if ($freeShip.length && $('#totalProducts').length) {
        checkFreeShip();
        if (window.MutationObserver) new MutationObserver(checkFreeShip).observe($('#totalProducts')[0], {childList: true, subtree: true});
    }


    /* ⑤ 상세정보 · 후기 · 문의 이동 */
    $('.xans-product-additional .detail_menu a').on('click', function (e) {
        var $target = $($(this).attr('href'));
        if (!$target.length) return;
        e.preventDefault();
        $('html, body').stop().animate({scrollTop: $target.offset().top - ($('#header').outerHeight() || 0)}, 400);
    });

    /* 구매안내 펼침 */
    $('#prdInfo .info_t').each(function () {
        if (!$.trim($(this).find('.prdInfo_text').text())) $(this).addClass('empty');
    });
    $('#prdInfo .info_t_title').on('click', function () {
        $(this).parent().toggleClass('active').children('.prdInfo_text').stop().slideToggle(300);
    });


    /* ⑥ 관련상품 */
    var $rel = $('.product_relation');
    if (!$rel.find('.prdList > li').length) {
        $rel.hide();
    } else {
        new Swiper($rel.find('.prd_slide')[0], {
            slidesPerView: 2.5,
            spaceBetween: 12,
            grabCursor: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                600: {slidesPerView: 3.5, spaceBetween: 12},
                1025: {slidesPerView: 3.4, spaceBetween: 20},
                1440: {slidesPerView: 4.4, spaceBetween: 20}
            }
        });
    }


    /* ⑦ 아래 고정 구매 버튼(#orderFixArea)
       본문 구매 버튼이 화면 위로 지나가면 나타남. 누르면 옵션 레이어(#pop_option_box)를 먼저 열고,
       열린 상태에서 누르면 원래대로 장바구니·구매 진행 */
    var $fix = $('#orderFixArea');
    var $box = $('#pop_option_box');
    var $holder = $('.option_holder');
    var $inBtn = $('.infoArea > .productAction');

    function setFixH() {
        document.body.style.setProperty('--fix-h', $fix.outerHeight() + 'px');
    }
    function openOption() {
        if (!isMo()) {
            var $top = $('.infoArea > .mainArea').clone();
            $top.find('.coupon_box, .hit_count, .topLogo, .layer_pop').remove();
            var $spec = $('.infoArea > .spec_box').clone();
            var $info = $box.find('.pop_layer_info').empty().append($top, $spec);
            $info.find('[id]').removeAttr('id');
        }
        $holder.css('min-height', $holder.outerHeight());
        $box.addClass('is_open');
        $('body').addClass('fix_option_open');
    }
    function closeOption() {
        if (!$box.hasClass('is_open')) return;
        $box.removeClass('is_open').find('.pop_layer_info').empty();
        $holder.css('min-height', '');
        $('body').removeClass('fix_option_open');
    }
    function checkFix() {
        if (!$fix.length || !$inBtn.length) return;
        var past = $inBtn[0].getBoundingClientRect().bottom < 0;
        if (past === $fix.hasClass('on')) return;
        if (past) {
            $fix.addClass('on');
            $('body').addClass('fix_buy_on');
            setFixH();
        } else {
            closeOption();
            $fix.removeClass('on');
            $('body').removeClass('fix_buy_on');
        }
    }
    if ($fix.length && $box.length) {
        document.addEventListener('click', function (e) {
            if ($box.hasClass('is_open')) return;
            var btn = e.target.closest('#orderFixArea .action_button > a, #orderFixArea .action_button > button');
            if (!btn) return;
            e.preventDefault();
            e.stopImmediatePropagation();
            openOption();
        }, true);

        $(document).on('click', function (e) {
            if (!$box.hasClass('is_open')) return;
            if ($(e.target).closest('#pop_option_box .pop_layer_wrap, #orderFixArea, .layer_pop, .pop_dim, [id^="ec-"], .ec-base-layer').length) return;
            closeOption();
        });

        $(window).on('scroll', checkFix);
        $(window).on('resize', function () { checkFix(); if ($fix.hasClass('on')) setFixH(); });
        checkFix();
    }
});


/* 카카오톡 공유 : 카카오 앱 키를 넣고 주석을 풀면 공유 버튼에서 바로 씀 */
// Kakao.init('');
// function sendLink() {
//     var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
//     var sharetitle = jQuery(".xans-product-detail .infoArea .prd_name").first().text();
//     var summary = jQuery(".xans-product-detail .infoArea .summary_desc").first().text();
//     var shareimg = jQuery(".xans-product-detail .imgArea .swiper_keyimg .swiper-slide:first-child img").attr('src');
//     Kakao.Link.sendDefault({
//     objectType: 'feed',
//     content: {
//       title: sharetitle,
//       description: summary,
//       imageUrl: 'https:'+shareimg,
//       link: {
//         mobileWebUrl: newURL,
//         webUrl: newURL
//       }
//     },
//     buttons: [
//       {
//         title: '웹으로 보기',
//         link: {
//           mobileWebUrl: newURL,
//           webUrl: newURL
//         }
//       },
//     ]
//   });
// }

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
