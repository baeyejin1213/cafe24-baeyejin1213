/* morenvy.com 250829 이동혁 */
jQuery(document).ready(function () {

    /* 0.1초 후 화면 출력 */
    setTimeout(function () {
        jQuery('body').css('opacity', '1');
    }, 100);



    /* ----------------------------------------------------

        상단 : 시작
        
    ---------------------------------------------------- */
    /* 상단 : 텍스트 배너 */
    if (!getCookiefss("notToday_txtBan")) {
        jQuery(".txt_ban").show();
    };

    jQuery(".txt_ban .btn_close").on("click", function () {
        jQuery(this).parents(".txt_ban").slideUp(300);
        setCookieCpa("notToday_txtBan", "yes", 1);
    });


    /* 상단 : 메인 (확장형 키비주얼 kv_full 일 때만 헤더를 키비주얼 위에 투명하게 겹침) */
    if (jQuery("#contents > .main_visual").length) {
        jQuery("#wrap").addClass("is_main");
        if (jQuery("#contents > .main_visual").hasClass("kv_full")) jQuery("#wrap").addClass("kv_over");
    };


    /* 상단 : 고정 (텍스트 배너가 지나가면 메뉴 고정, 투명 헤더가 아니면 헤더 높이만큼 여백 유지) */
    jQuery(window).on("scroll", function () {
        const fixedPoint = jQuery(".txt_ban").is(":visible") ? jQuery(".txt_ban").outerHeight() : 1;

        if (jQuery(this).scrollTop() >= fixedPoint) {
            if (!jQuery("#header").hasClass("fixed") && jQuery("#header").css("position") !== "absolute") {
                jQuery("#wrap").css("padding-top", jQuery("#header").outerHeight());
            };
            jQuery("#header").addClass("fixed");
            jQuery("#wrap").addClass("h_fixed");
        } else {
            jQuery("#header").removeClass("fixed");
            jQuery("#wrap").removeClass("h_fixed").css("padding-top", "");
        };
    });


    /* 상단 : 검색창 */
    jQuery(".search_box #keyword").attr("placeholder", jQuery(".search_box fieldset").attr("title"));

    /* 검색창 형태 (mheader.html 의 #schType 클래스로 선택 : sch_top / sch_right / sch_full) */
    const schType = ["sch_right", "sch_full"].filter(function (type) {
        return jQuery("#schType").hasClass(type);
    })[0] || "sch_top";
    jQuery("#header").addClass(schType);

    /* 검색창 열기/닫기 (상단형은 열린 동안 헤더를 흰 배경으로, 닫을 때는 페이드아웃(0.4초)이 끝난 뒤 되돌림) */
    function searchToggle(open) {
        jQuery("body").toggleClass("searchOn", open);
        if (schType === "sch_top") {
            if (open) {
                jQuery("#header").addClass("h_white");
            } else {
                setTimeout(function () {
                    if (!jQuery("body").hasClass("searchOn")) jQuery("#header").toggleClass("h_white", jQuery("#header").hasClass("gnb_open"));
                }, 400);
            };
        };
        if (open) setTimeout(function () { jQuery("#header .search_box #keyword").trigger("focus"); }, 100);
    };

    jQuery("#header .h_sec03 .h_menu .search").on("click", function (e) {
        e.preventDefault();
        searchToggle(!jQuery("body").hasClass("searchOn"));
    });

    jQuery("#header .search_box .sch_close").on("click", function (e) {
        e.preventDefault();
        searchToggle(false);
    });

    /* 우측형 · 전체형 : 어두운 바깥 영역 클릭, ESC 로 닫기 */
    jQuery("#header #searchBarForm").on("click", function (e) {
        if (e.target === this && schType !== "sch_top") searchToggle(false);
    });

    jQuery(document).on("keydown", function (e) {
        if (e.key === "Escape" && jQuery("body").hasClass("searchOn")) searchToggle(false);
    });

    /* 인기검색어 애니메이션 */
    jQuery("#header .search_box .bottom_inner .hot_keyword li").each(function (index) {
        jQuery(this).css("animation-delay", ((index + 1) / 10) + "s");
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


    /* 썸네일 호버 : 작은목록 이미지가 없으면 호버 이미지 제거 */
    jQuery(".ec-base-product .thumbnail .thumb_hover").each(function () {
        if (!jQuery(this).attr("src")) jQuery(this).remove();
    }).on("error", function () {
        jQuery(this).remove();
    });


    /* 리뷰 */
    jQuery(".description .spec li[rel='리뷰']").each(function () {
        jQuery(this).wrapInner("<div class='review'></div>");
    });
    setReviewRating();
    /* ----------------------------------------------------

        상품 진열 종료
        
    ---------------------------------------------------- */




    /* ----------------------------------------------------

        하단 : 시작
        
    ---------------------------------------------------- */
    /* 하단 : 로고 옆 토글 (이용약관·고객센터 영역 접기/펼치기) */
    jQuery("#footer .btn_info").on("click", function () {
        jQuery(this).toggleClass("closed");
        jQuery("#footer .f_sec02").slideToggle(300);
    });


    /* 하단 : 모바일 고객 서비스 메뉴 접기/펼치기 */
    jQuery("#footer .f_menu_tit").on("click", function () {
        jQuery(this).parent(".f_right").toggleClass("open").children(".f_menu").stop().slideToggle(300);
    });


    /* 하단 : 패밀리 사이트 */
    jQuery("#footer .f_family > button").on("click", function () {
        jQuery(this).parent().toggleClass("open");
    });


    /* 하단 : 고정 */
    if (jQuery(this).scrollTop() + jQuery(this).innerHeight() - 66 >= jQuery("#footer").offset().top - 120) {
        if (jQuery(this).innerWidth() >= 768) {
            jQuery(".f_fixed").css({position: "absolute", bottom: jQuery("#footer").innerHeight() + 120});
            jQuery(".f_fixed").children("#quick").removeClass("on");
        };
    } else {
        jQuery(".f_fixed").css({position: "", bottom: ""});
        jQuery(".f_fixed").children("#quick").addClass("on");
    };

    let startY = 0;
    jQuery(window).on("scroll", function () {
        if (jQuery(this).scrollTop() + jQuery(this).innerHeight() - 66 >= jQuery("#footer").offset().top - 120) {
            if (jQuery(this).innerWidth() >= 768) {
                jQuery(".f_fixed").css({position: "absolute", bottom: jQuery("#footer").innerHeight() + 120});
                jQuery(".f_fixed").children("#quick").removeClass("on");
            };
        } else {
            jQuery(".f_fixed").css({position: "", bottom: ""});
            jQuery(".f_fixed").children("#quick").addClass("on");
        };

        let endY = jQuery(this).scrollTop();
        if (jQuery(this).innerWidth() <= 767) {
            if (endY > startY) {
                jQuery(".f_fixed").addClass("down");
            } else {
                jQuery(".f_fixed").removeClass("down");
            };

            if (endY + jQuery(this).innerHeight() === jQuery(document).innerHeight()) {
                jQuery(".f_fixed").removeClass("down");
            };

            startY = endY <= 0 ? 0 : endY;
        };
    });


    /* 하단 : 고정 메뉴 */
    jQuery(".f_fixed .f_nav .all_cate").on("click", function () {
        jQuery("body").addClass("side");
    });


    /* 하단 : 고정 아이콘 */
    jQuery(".f_fixed #quick > .upBtn").on("click", function () {
        jQuery("html, body").animate({scrollTop: 0}, 600);
    });

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


/* 상품진열 리뷰 : 리뷰 개수 앞에 평점 평균 (상품 상세페이지 리뷰 목록의 평점을 모아 계산)
   ※ 리뷰 모듈은 상세페이지에서만 상품을 인식하므로 detail.html 을 불러와 읽음 */
const reviewRatingCache = {};
function getReviewRating(productNo) {
    if (reviewRatingCache[productNo]) return reviewRatingCache[productNo];
    const url = "/product/detail.html?product_no=" + productNo;
    const parse = function (html) {
        return new DOMParser().parseFromString(html, "text/html"); // 스크립트 실행 · 이미지 로딩 없이 읽기
    };
    const points = function (doc) {
        return Array.prototype.map.call(doc.querySelectorAll("#prdReview .use_point img"), function (img) {
            return parseInt(img.getAttribute("alt"), 10) || 0;
        }).filter(function (p) { return p > 0; }); // 평점 없는 글(답글 등) 제외
    };

    reviewRatingCache[productNo] = jQuery.get(url).then(function (html) {
        const doc = parse(html);
        let all = points(doc);
        const last = doc.querySelector("#prdReview .xans-product-reviewpaging .last");
        const lastHref = last ? last.getAttribute("href") : "";
        const lastMatch = lastHref.match(/(page_\d+)=(\d+)/);
        if (!lastMatch || +lastMatch[2] < 2) return all;

        // 리뷰가 여러 페이지면 나머지 페이지도 불러와 합침
        const reqs = [];
        for (let i = 2; i <= +lastMatch[2]; i++) reqs.push(jQuery.get(url + "&" + lastMatch[1] + "=" + i));
        return jQuery.when.apply(jQuery, reqs).then(function () {
            const res = reqs.length === 1 ? [arguments] : Array.prototype.slice.call(arguments);
            res.forEach(function (r) { all = all.concat(points(parse(r[0]))); });
            return all;
        });
    }).then(function (all) {
        return all.length ? (all.reduce(function (a, b) { return a + b; }, 0) / all.length).toFixed(1) : "0.0";
    });
    return reviewRatingCache[productNo];
}
function setReviewRating() {
    jQuery(".ec-base-product .prdList > li").each(function () {
        const review = jQuery(this).find(".description .spec li:is([rel='사용후기'], [rel='리뷰'])");
        if (!review.length || review.find(".rating").length) return;

        const rating = jQuery("<span class='rating'>0.0</span>");
        review.find(".m_item").first().before(rating);
        if (!(parseInt(review.find(".m_item").text().replace(/[^0-9]/g, ""), 10) > 0)) return; // 리뷰 0개면 요청 안 함

        getReviewRating(this.id.replace("anchorBoxId_", "")).then(function (avg) {
            rating.text(avg);
        });
    });
}


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
            m_sale = that_m_sale.find('.m_item').text().split('(')[0].replace(/[^0-9]/g,''); //상품목록 할인판매가 ("(최대 n원 할인)" 문구 제외)
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