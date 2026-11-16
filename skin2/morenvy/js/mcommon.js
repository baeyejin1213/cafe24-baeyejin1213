/* morenvy.com 250829 이동혁 */
jQuery(document).ready(function () {

    /* 0.1초 후 화면 출력 */
    setTimeout(function () {
        jQuery('body').css('opacity', '1');
    }, 100);


    /* ----------------------------------------------------
        상단 : 시작
    ---------------------------------------------------- */


	/*  텍스트 띠배너 */
    if (!getCookiefss("notToday_txtBan2")) {
        jQuery(".txt_ban2").show();
    };
    jQuery(".txt_ban2 .btn_close").on("click", function () {
        jQuery(this).hide().parents(".txt_ban2").slideUp();
        setCookieCpa("notToday_txtBan2", "yes", 1);
    });



    /* 상단 : 검색창 */
    jQuery(".search_box #keyword").attr("placeholder", jQuery(".search_box fieldset").attr("title"));

    /* 검색창 열기 */
    jQuery("#header .h_sec03 .h_menu .search").on("click", function () {
        jQuery("#searchBarForm").addClass("active");
        jQuery("#layoutDimmed").addClass("active");
    });

    jQuery(".side_login .search").on("click", function () {
        jQuery("#searchBarForm").addClass("active");
        jQuery("#layoutDimmed").addClass("active");
		jQuery("#aside").removeClass("active");
    });

    /* 검색창 닫기 */
    jQuery("#searchBarForm .top svg").on("click", function () {
        jQuery("#searchBarForm").removeClass("active");
        jQuery("#layoutDimmed").removeClass("active");
    });

    jQuery("#layoutDimmed").on("click", function () {
        jQuery("#aside").removeClass("active");
        jQuery("#searchBarForm").removeClass("active");
        jQuery("#layoutDimmed").removeClass("active");
    });

    /* ----------------------------------------------------
        상단 : 종료
    ---------------------------------------------------- */



    /* ----------------------------------------------------
        상품 진열
    ---------------------------------------------------- */
    
	/* 장바구니 버튼 */
    jQuery(".ec-base-product .thumbnail .button .cart img.ec-admin-icon.cart").each(function () {
        jQuery(this).siblings(".cart_icon").attr("src", jQuery(this).attr("src"));
    });

    /* 브랜드 */
    jQuery(".description .spec li[rel='브랜드'] .m_item span").each(function () {
        jQuery(this).parents(".spec").siblings(".name").before("<div class='brand'></div>");
        jQuery(this).parents(".spec").siblings(".brand").text(jQuery(this).text());
    });


    /* 리뷰 */
    jQuery(".description .spec li[rel='리뷰']").each(function () {
        jQuery(this).wrapInner("<div class='review'></div>");
    });

    /* ----------------------------------------------------
        상품 진열 종료
    ---------------------------------------------------- */




    /* ----------------------------------------------------
        하단 : 시작
    ---------------------------------------------------- */


    /* 하단 : 사업자정보확인 */
    const comRegno = jQuery("#footer .f_sec02 .company .com_regno_btn").eq(0).text().replace(/[\[\]]/g, "");
    jQuery("#footer .f_sec02 .company .com_regno_btn").text(comRegno);


    /* ----------------------------------------------------

        하단 : 종료
        
    ---------------------------------------------------- */





    /* ----------------------------------------------------
        검색 페이지 : 시작
    ---------------------------------------------------- */

    /* 검색창 멘트 */
    jQuery(".xans-product-searchdata .searchField .keyword").attr("placeholder", jQuery(".search_box fieldset").attr("title"));


    /* 검색창 돋보기 아이콘 */
    if (jQuery(window).innerWidth() <= 767) {
        jQuery(".xans-product-searchdata .searchField .btnSearch").attr("src", "/morenvyimg/search_m.svg");
    } else {
        jQuery(".xans-product-searchdata .searchField .btnSearch").attr("src", "/morenvyimg/search.svg");
    };
    
    jQuery(window).on("resize", function () {
        if (jQuery(window).innerWidth() <= 767) {
            jQuery(".xans-product-searchdata .searchField .btnSearch").attr("src", "/morenvyimg/search_m.svg");
        } else {
            jQuery(".xans-product-searchdata .searchField .btnSearch").attr("src", "/morenvyimg/search.svg");
        };
    });

    /* ----------------------------------------------------
        검색 페이지 : 종료
    ---------------------------------------------------- */


    addSaleBox(); // 세일박스 추가
    cal_percent(); //할인율


    setTimeout(function () {
        addSaleBox(); // 세일박스 추가
        cal_percent(); //할인율
    }, 500);

    /* morenvy.com 목록 더보기 클릭시 할인율 계산 */
    jQuery('.ec-base-product ul.prdList').each(function(i){
        const target = this;
        let observer = new MutationObserver((mutations) => { // 노드가 변경 됐을 때의 작업
            addSaleBox(); // 세일박스 추가
            cal_percent(); //할인율
        });
        observer.observe(target, { attributes: false, childList: true });
    });


    /* morenvy.com 로그인폼 placeholder 추가 */
    if (jQuery('.xans-member-login').val() != undefined) {
        jQuery('#member_passwd').attr('placeholder', '비밀번호');
    }

    /* 로그인 모바일/pc 비교 */
    if (jQuery('.login_wrap .option .auto input').length > 0) {
        jQuery('.login_wrap .option .auto').addClass('mo');
    } else {
        jQuery('.login_wrap .option .auto').hide();
    }

    if(jQuery('.wrap_sns_log a:not(.displaynone)').length > 0) {
        jQuery('.login__sns .sns_h').show();
    } else {
        jQuery('.login__sns .sns_h').hide();
    }


    /* morenvy.com 비회원 주문조회페이지 placeholder 추가 */
    setTimeout(function () {
        if (jQuery('.xans-myshop-orderhistorynologin').val() != undefined) {
            jQuery('#order_name').attr('placeholder', '주문자명');
            jQuery('#order_id').attr('placeholder', '주문번호 (하이픈 “-”포함)');
            jQuery('#order_password').attr('placeholder', '비회원 주문 비밀번호');
        }
    }, 100);


    /* 주문 조회 경로에서만 주문 조회 보이게 */
    var fileName = window.location.pathname.split('/').pop(); // login.html
    var returnUrl = new URLSearchParams(window.location.search).get('returnUrl'); // /myshop/order/list.html
    if (fileName == 'login.html') {
        if (returnUrl == '/myshop/order/list.html') {
            jQuery('.login_wrap').addClass('noLogin');
            jQuery('.login_wrap .login .log_menu li a').first().removeClass('active');
            jQuery('.login_wrap .login .log_menu li a').last().addClass('active');
        }
    }

    /* morenvy.com 품절상품 */
    jQuery('.ec-base-product .prdList li').each(function () {
        var soldout = $(this).find('.soldout_icon');

        if (soldout.find('img').length > 0) {
            soldout.addClass('soldout');
            soldout.html(`SOLD<br>OUT`);
        }
    });


    /* 회원가입 페이지 토글 */
    jQuery('.xans-member-join .agreeInner .arrBtn').on('click', function () {
        jQuery(this).toggleClass('active');
        jQuery(this).parents('.agreeArea').find('.content').slideToggle(400);
    })

    /* 마이페이지 최근 본 상품 */
    $('.myshopArea .xans-product-listitem li').each(function () {
        var Btn = $(this);
        // 할인가격
        var price = Btn.find('.price li:nth-child(2)');
        // 프로모션 가격
        var salePrice = Btn.find('.price li:last-child');

        // 프로모션 가격이 있으면 할인가격 숨김
        if (!salePrice.hasClass('displaynone')) {
            price.hide();
        }
    });

    /* 마이페이지 메뉴에서 해당 페이지에서 클래스 추가 */
    var titleText = $('.myshopArea .titleArea h2').text().trim();

    $('.xans-myshop-main .menu li a').each(function () {
        if ($(this).text().trim().indexOf(titleText) !== -1) {
            $(this).addClass('on');
        }
    });

    /* morenvy.com 장바구니에서 할인금액 0원이면 숨김 */
    jQuery('.xans-order-list .prdBox .price .txtSecondary').each(function () {
        var discount_price = jQuery(this).text();

        if (discount_price == '-0') {
            jQuery(this).parent().remove();
        }
    });

    
    /* 게시판 댓글 */
    jQuery("#contents .xans-board-commentlist .boardComment li .btnNormal.typeReplyList").on("click", function () {
        jQuery(this).toggleClass("on");
    });
});


/* 세일박스 없을 경우를 대비 */
function addSaleBox() {
    jQuery('.spec').each(function () {
        var thisResult = jQuery(this).find('.sale_box').length;
        if (!thisResult) {
            jQuery(this).prepend('<div class="sale_box"></div>');
        }
    });
}



/* morenvy.com 할인율 */
function cal_percent() {
    jQuery("[rel='판매가']").each(function(){
        var that = jQuery(this);
        // if ((that.siblings(".sale_box").length != 0) || (that.parents("li").find(".description .sale_box.m_off").length != 0 )) { // 할인율이 이미 있다면 실행안함
        //     return;
        // }


        /* DOM캐싱해서 한번만 처리 */
        var that_m_custom = jQuery(".xans-product-setproduct").length > 0 ? that : that.siblings("[rel='소비자가']");
        var that_m_sale = that.siblings("[rel='할인판매가']");
        var that_sale_box = that.parents('li').find('.sale_box');
        var that_m_item = that.find('.m_item');
        var that_product_detail = that.parents('.xans-product-detail');

        var m_custom = jQuery(".xans-product-setproduct").length > 0 ? that_m_custom.find('.m_item').text().split('(')[0].replace(/[^0-9]/g,'') : that_m_custom.find('.m_item').text().replace(/[^0-9]/g,'');  //소비자가
        var m_price = jQuery(".xans-product-setproduct").length > 0 ? that_m_item.text().split('(')[0].replace(/[^0-9]/g,'') : that_m_item.text().replace(/[^0-9]/g,''); // 판매가
        var m_price_detail = jQuery('.xans-product-detail .prd_price .price').text().replace(/[^0-9]/g,''); // 판매가(셋트상품 + 상세페이지)
        var m_sale = '';
        if (that_m_sale.find('#span_product_price_sale').length != 0 ){
            m_sale =  that_m_sale.find('#span_product_price_sale').html().split('<')[0].replace(/[^0-9]/g,''); //상세페이지 할인판매가
        } else {
            m_sale = that_m_sale.find('.m_item').text().replace(/[^0-9]/g,''); //상품목록 할인판매가
        }
        if( typeof m_sale == "undefined" || m_sale == "" || m_sale == null ) { //할인판매가가 공백일 때
            m_sale = m_price
        }
        /* 할인율 계산 */
        if(that_m_sale.length != 0 && m_price != m_sale){
            /* 할인판매가 O */
            var c_sale = Math.round(( m_custom - m_sale ) / m_custom * 100 );  //소비자가와 할인판매가
            var p_sale = Math.round(( m_price - m_sale ) / m_price * 100 ); //판매가와 할인판매가
            var p_sale_detail = Math.round(( m_price_detail - m_sale ) / m_price_detail * 100 ); //판매가와 할인판매가(상세페이지)
            if(that.parent().hasClass('spec')){
                if (that_m_custom.length != 0){
                    /* 상품목록 */
                    that_sale_box.text(c_sale + '%').insertBefore(jQuery(this).siblings("[rel='할인판매가']")).css('display','inline-block'); // 상품목록 할인율 출력
                    that.hide();
                    that_m_custom.addClass('through');
                    that_m_sale.addClass('msale');
                } else { // 소비자가가 없을때
                    /* 상품목록 */
                    that_sale_box.text(p_sale + '%').insertBefore(jQuery(this).siblings("[rel='할인판매가']")).css('display','inline-block'); // 상품목록 할인율 출력
                    that.addClass('through');
                    that_m_sale.addClass('msale');
                }
            } else {
                if (that_m_custom.length != 0){
                    /* 상세페이지 */
                    that_product_detail.find('.prd_price .sale_box').text(c_sale + '%').css('display','inline-block'); // 상세페이지 할인율 출력
                    var m_salea = numberWithCommas(m_sale) + "원";
                    that_product_detail.find('.prd_price .sale').addClass('msale').text(m_salea);
                    that_product_detail.find('.prd_price .custom').addClass('through').text(numberWithCommas(m_price_detail) + "원");
                    that_product_detail.find('.prd_price .price').hide();
                } else { // 소비자가가 없을때
                    /* 상세페이지 */
                    that_product_detail.find('.prd_price .sale_box').text(p_sale_detail + '%').css('display','inline-block'); // 상세페이지 할인율 출력
                    var m_salea = numberWithCommas(m_sale) + "원";
                    that_product_detail.find('.prd_price .sale').addClass('msale').text(m_salea);
                    that_product_detail.find('.prd_price .price').addClass('through').text(numberWithCommas(m_price_detail) + "원");
                }
            }

        } else if (that_m_custom.length != 0){
            /* 할인판매가 X & 소비자가 O */
            if (m_custom != m_price){
                /* 소비자가 != 판매가 */
                var sale_cnt = Math.round( ( m_custom - m_price ) / m_custom * 100 ); //소비자가와 판매가

                if(that.parent().hasClass('spec')){
                    /* 상품목록 */
                    that_sale_box.text(sale_cnt + '%').insertBefore(that).css('display','inline-block'); // 상품목록 할인율 출력
                    that.addClass('msale');
                    that_m_custom.addClass('through').css('display','inline-block');
                } else {
                    /* 상세페이지 */
                    that_product_detail.find('.prd_price .sale_box').text(sale_cnt + '%').css('display','inline-block'); // 상세페이지 할인율 출력
                    that_product_detail.find('.prd_price .price').addClass('msale');
                    that_product_detail.find('.prd_price .custom').addClass('through');
                    console.log(m_price)
                }
            } else {
                /* 소비자가 == 판매가 */
                if(that.parent().hasClass('spec')){
                    /* 상품목록 */
                    that.addClass('msale');
                    that_m_custom.hide();
                }else{
                    /* 상세페이지 */
                    that_product_detail.find('.prd_price .sale_box').hide(); // 상세페이지 할인율 삭제
                    that_product_detail.find('.prd_price .price').addClass('msale').text(numberWithCommas(m_price_detail) + "원");
                    that_product_detail.find('.prd_price .custom').hide();
                }
            }
        } else {
            /* 할인판매가 X & 소비자가 X */
            if(that.parent().hasClass('spec')){
                /* 상품목록 */
                that.addClass('msale');
            }else{
                /* 상세페이지 */
                that_product_detail.find('.prd_price .sale_box').hide(); // 상세페이지 할인율 삭제
                that_product_detail.find('.prd_price .price').addClass('msale');
            }
        }

        /* 소비자가 0원일때 삭제 */
        if( that_product_detail.find('.prd_price .custom').text() == '0원'){
            that_product_detail.find('.prd_price .custom').hide();
        }

        var text1 = that_sale_box.text();
        if (isNumberAbsent(text1)) { // 할인율이 숫자가 아니면 숨김
            that_sale_box.addClass('m_off');
        }

        var text2 = that_m_custom.text();
        if (text2 == 0) {
            that.parents('li').find("[rel='소비자가']").addClass('m_off');
        }
    });
};

function isNumberAbsent(text) {
    var regex = /\d/; // 숫자를 포함하는지 확인하는 정규식
    return !regex.test(text);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


/* morenvy.com 쿠키 스크립트 */
function setCookieM(cookie_name, cookie_value, expire_date) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * 24 * expire_date);
    cookies = cookie_name + '=' + cookie_value + '; path=/;';
    if (expire_date != 0) cookies += 'expires=' + expire.toGMTString();
    document.cookie = cookies;
}

function delCookieM(cookie_name) {
    var _today = new Date();
    var value = '';
    _today.setDate(_today.getDate() - 1);
    document.cookie = cookie_name + '=' + value + '; path=/;' + '; expires=' + _today.toGMTString();
}

function getCookieM(name) {
    lims = document.cookie;
    var index = lims.indexOf(name + '=');
    if (index == -1) {
        return null;
    }
    index = lims.indexOf('=', index) + 1;
    var endstr = lims.indexOf(';', index);
    if (endstr == -1) {
        endstr = lims.length;
    }
    return unescape(lims.substring(index, endstr));
}


/* 상단 · 하단 공통 */
jQuery(function ($) {

    var $body = $('body');
    var $header = $('#header.h_type01');
    if (!$header.length) return;

    /* 메인 여부 : 메인(index.html)에만 .main_wrap 이 있다 */
    if ($('#contents .main_wrap').length) $body.addClass('is_main');


    /* ① 스크롤하면 흰 헤더 */
    var megaOpen = false;
    function setWhite() {
        $header.toggleClass('h_white', megaOpen || window.pageYOffset > 10);
    }
    $(window).on('scroll', setWhite);
    setWhite();


    /* ② 분류 데이터 → 메가메뉴 · 모바일 전체메뉴 */
    function cateNo(href) {
        var m = String(href || '').match(/cate_no=(\d+)/) || String(href || '').match(/\/category\/[^/]*\/(\d+)\//) || String(href || '').match(/\/(\d+)\/?(?:\?|$)/);
        return m ? m[1] : '';
    }
    var curCate = cateNo(location.href);

    $.ajax({url: '/exec/front/Product/SubCategory', dataType: 'json'}).done(function (list) {
        var byParent = {}, byNo = {};
        $.each(list || [], function (i, c) {
            (byParent[c.parent_cate_no] = byParent[c.parent_cate_no] || []).push(c);
            byNo[c.cate_no] = c;
        });
        function link(c) {
            return c.link_product_list || ('/product/list.html?cate_no=' + c.cate_no);
        }
        function isUnder(no, top) { // no 가 top 분류 아래에 있는지
            var guard = 0;
            while (no && byNo[no] && guard++ < 10) {
                if (String(no) === String(top)) return true;
                no = byNo[no].parent_cate_no;
            }
            return String(no) === String(top);
        }

        buildMega(byParent, link, isUnder);
        buildSide(byParent, link);
    }).fail(function () {
        buildSide({}, function () { return '#none'; });
    });


    /* PC 메가메뉴 */
    function buildMega(byParent, link, isUnder) {
        var $mega = $header.find('.h_mega');
        $header.find('.h_cate > li').each(function (i) {
            var $li = $(this);
            var no = cateNo($li.children('a').attr('cate')) || cateNo($li.children('a').attr('href'));
            $li.attr('data-cate', no);
            if (curCate && isUnder(curCate, no)) $li.addClass('on');

            var kids = byParent[no];
            if (!kids || !kids.length) return;
            var html = '<div class="panel" data-cate="' + no + '">';
            $.each(kids, function (k, c2) {
                html += '<div class="col"><a href="' + link(c2) + '">' + c2.name + '</a>';
                var gkids = byParent[c2.cate_no];
                if (gkids && gkids.length) {
                    html += '<ul>';
                    $.each(gkids, function (g, c3) { html += '<li><a href="' + link(c3) + '">' + c3.name + '</a></li>'; });
                    html += '</ul>';
                }
                html += '</div>';
            });
            html += '</div>';
            $mega.append(html);
            $li.addClass('has_sub');
        });

        var closeTimer;
        function open(no) {
            clearTimeout(closeTimer);
            var $panel = $mega.children('.panel[data-cate="' + no + '"]');
            $mega.children('.panel').removeClass('on');
            if ($panel.length) {
                $panel.addClass('on');
                $mega.addClass('open');
                megaOpen = true;
            } else {
                $mega.removeClass('open');
                megaOpen = false;
            }
            setWhite();
        }
        function close() {
            closeTimer = setTimeout(function () {
                $mega.removeClass('open').children('.panel').removeClass('on');
                megaOpen = false;
                setWhite();
            }, 120);
        }
        $header.on('mouseenter', '.h_cate > li', function () { open($(this).attr('data-cate')); });
        $header.on('mouseenter', '.h_add > li, .h_logo, .h_util', function () { open(''); });
        $header.on('mouseenter', '.h_mega', function () { clearTimeout(closeTimer); });
        $header.on('mouseleave', function () { close(); });
    }


    /* 모바일 전체메뉴 : 왼쪽 대분류 / 오른쪽 중분류(+소분류 펼침) */
    function buildSide(byParent, link) {
        var $side = $('#aside_menu');
        if (!$side.length) return;
        var $d1 = $side.find('.d1'), $d2 = $side.find('.d2');
        var first = -1;
        var items = [];
        $header.find('.h_cate > li > a, .h_add > li > a').each(function () {
            items.push({name: $.trim($(this).text()), href: $(this).attr('href'), no: cateNo($(this).attr('cate')) || cateNo($(this).attr('href'))});
        });

        $.each(items, function (i, it) {
            var en = /^[A-Z0-9\s&]+$/.test(it.name) ? ' en' : '';
            var kids = it.no ? byParent[it.no] : null;
            if (kids && kids.length) {
                if (first < 0) first = i;
                $d1.append('<li data-idx="' + i + '"><button type="button" class="row' + en + '">' + it.name + '<i></i></button></li>');
                var html = '<ul data-idx="' + i + '">';
                $.each(kids, function (k, c2) {
                    var gkids = byParent[c2.cate_no];
                    if (gkids && gkids.length) {
                        html += '<li><button type="button" class="row">' + c2.name + '<i></i></button><div class="d3">';
                        $.each(gkids, function (g, c3) { html += '<a href="' + link(c3) + '">' + c3.name + '</a>'; });
                        html += '</div></li>';
                    } else {
                        html += '<li><a href="' + link(c2) + '" class="row">' + c2.name + '</a></li>';
                    }
                });
                $d2.append(html + '</ul>');
            } else {
                $d1.append('<li><a href="' + it.href + '" class="row' + en + '">' + it.name + '</a></li>');
            }
        });

        function select(idx) {
            $d1.children('li').removeClass('on').filter('[data-idx="' + idx + '"]').addClass('on');
            $d2.children('ul').removeClass('on').filter('[data-idx="' + idx + '"]').addClass('on');
            $d2.scrollTop(0);
        }
        if (first > -1) select(first);
        $d1.on('click', 'button.row', function () { select($(this).parent().attr('data-idx')); });
        $d2.on('click', 'button.row', function () {
            var $li = $(this).parent();
            $li.toggleClass('open on').siblings().removeClass('open on');
        });
    }

    function sideOpen() { $body.addClass('sideOn'); }
    function sideClose() { $body.removeClass('sideOn'); }
    $header.on('click', '.h_util .menu a', function (e) { e.preventDefault(); sideOpen(); });
    $(document).on('click', '.f_nav .side_open', sideOpen);
    $(document).on('click', '#aside_menu .side_close', sideClose);


    /* ③ 검색 패널 */
    var recentSwiper = null;
    function searchOpen() {
        $('#searchBarForm').addClass('active');
        $body.addClass('searchOn');
        var $recent = $('.sch_recent .swiper');  /* 최근 본 상품 : 마우스로 끌어서 넘김 */
        if (!recentSwiper && $recent.length && window.Swiper) {
            recentSwiper = new Swiper($recent[0], {slidesPerView: 'auto', spaceBetween: 12, freeMode: true, grabCursor: true, observer: true, observeParents: true});
        }
        setTimeout(function () { $('#searchBarForm #keyword').trigger('focus'); }, 400);
    }
    function searchClose() {
        $('#searchBarForm').removeClass('active');
        $body.removeClass('searchOn');
    }
    $header.on('click', '.h_util .search a', function (e) { e.preventDefault(); searchOpen(); });
    $(document).on('click', '.search_box.type01 .sch_close', searchClose);
    $(document).on('click', '.h_dim', function () { searchClose(); sideClose(); });
    $(document).on('keydown', function (e) { if (e.key === 'Escape') { searchClose(); sideClose(); } });


    /* ④ 푸터 : 사업자 정보 접기 */
    $(document).on('click', '#footer .f_biz_btn', function () { $(this).closest('.f_info_wrap').toggleClass('close'); });


    /* ⑤ 퀵 메뉴(PC) : 조금 내리면 표시, 맨 위로 / 모바일 하단바 : 내릴 때 숨김 */
    $(document).on('click', '#quick .upBtn', function (e) { e.preventDefault(); $('html, body').animate({scrollTop: 0}, 600); });
    var lastY = window.pageYOffset;
    $(window).on('scroll', function () {
        var y = window.pageYOffset;
        var atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 4;
        $('.f_nav').toggleClass('down', y > lastY && y > 56 && !atBottom);
        $('#quick').toggleClass('on', y > 200);
        lastY = y;
    });
});
