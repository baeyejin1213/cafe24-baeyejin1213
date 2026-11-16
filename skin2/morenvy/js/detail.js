/* morenvy.com 220628 주영광 */
jQuery(document).ready(function(){


	function setCommas(number) {return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}




	/* morenvy.com 브랜드명 출력 */
	var brand_name = jQuery("[rel='브랜드']").find('.m_item span').text()
	jQuery('<div class="brand_name">' + brand_name + '</div>').prependTo('.headingArea')

	/* morenvy.com 브랜드 유무 출력 */
	jQuery('.xans-product-detail .infoArea .prd_info').each(function(){
		if( jQuery(this).find(".brand_name").text().length != 0 ){
			jQuery(this).find('.brand_name').addClass('exist_b');	
		}
	});	
	
	/* 밸류값 출력 여부 */
	jQuery('.xans-product-detail .infoArea .xans-product-option tr:first-child td').each(function(){
		if( jQuery(this).find("p.value").text().length != 0 ){
			jQuery(this).find('p.value').addClass('exist_b');	
		}
	});	

	/* morenvy.com 판매가와 소비자가 같을 때 소비자가 X */	
	if( jQuery('.price_box .price').text() == jQuery('.price_box .custom').text() ){
		jQuery('.price_box .custom').hide();
	};

	/* morenvy.com 추가이미지 스와이퍼 */
	var swiper_listImg = new Swiper('.swiper_listImg', {
		slidesPerView: 'auto',
		spaceBetween: 8,
        direction: "vertical",	
		scrollbar: {
			el: '.swiper-scrollbar_listImg',
			draggable: true,
			dragSize: 120,
		},
		mousewheel: {
			enabled: true,
			sensitivity: 1,
		},
	}); 
	/* morenvy.com 추가이미지 스크롤 */
	jQuery('.listImg li').click(function(){
		var list_i = jQuery('.listImg li').index(this);
		var list_thumb = jQuery(this).children('img').attr('src');
		jQuery('.keyImg .thumbnail > div img').each(function(){
			var now_thumb = jQuery(this).attr('src');
			if( list_thumb == now_thumb ){
				var thumb_top = jQuery(this).offset().top;
				if(list_i != 0){
					jQuery('html, body').animate({
						'scrollTop' : (thumb_top - 110)
					},300);
				} else {
					jQuery('html, body').animate({
						'scrollTop' : (thumb_top - 110)
					},300);
				}
			};
		});
	});
	jQuery(window).scroll(function(){
		jQuery('.keyImg .thumbnail > div').each(function(){
			var nowTop = jQuery(window).scrollTop(); // 스크롤 값

			if(jQuery(this).offset().top - 120 <= nowTop){ //스크롤 내릴 때
				jQuery(this).addClass('on');
			} else if (jQuery('.keyImg .thumbnail > div').eq(0).hasClass('on') && jQuery('.keyImg .thumbnail > div.on').last().offset().top - 120 > nowTop ){ //스크롤 올릴 때
				jQuery('.keyImg .thumbnail > div.on').last().removeClass('on');
			};
		});

		var thisIndex = jQuery('.keyImg .thumbnail > div.on').length;
		jQuery('.listImg .swiper-slide').eq(thisIndex-1).addClass('on').siblings().removeClass('on'); //해당 중분류 강조

		if(thisIndex == 0){ //맨 위로 올라왔을 때
			jQuery('.listImg .swiper-slide:first-child').addClass('on').siblings().removeClass('on');
		};

		var ondex = jQuery('.listImg .swiper-slide.on').index()
		if (jQuery('.listImg .swiper-slide').hasClass('on')) {
			swiper_listImg.slideTo(ondex,1000,false)
		}
	})
	
	/* morenvy.com 쿠폰 팝업 */
	jQuery('.coupon_btn > a').bind('click', function(e) {
		e.preventDefault();
		jQuery('.couponskin_popup').bPopup({
			follow: [true, true],
			position: ['auto', 'auto'],
			modalClose: true,
			opacity: 0.5,
			positionStyle: 'fixed'
		});
	});

	/* morenvy.com 공유하기 팝업레이어 */
	jQuery('a.detail_sns').bind('click', function(e) {
		e.preventDefault();
		jQuery('#sns_popup').bPopup({
			follow: [true, true],
			position: ['auto', 'auto'],
			modalClose: true,
			opacity: 0.5,
			positionStyle: 'fixed'
		});
	});

	/* morenvy.com 공유하기 URL넣기 */
	jQuery("#url_text").val(window.location.href);
	jQuery('.copytoclipboard').click(function() {
		jQuery("#url_text").select();
		document.execCommand("Copy");
		alert('URL이 클립보드에 복사되었습니다 :)');
	});
	
	/* morenvy.com 상세 구매하기/장바구니 버튼 호버 액션 */
	jQuery(function() {
		jQuery('.xans-product-action .ec-base-button a').on('mouseenter', function(e) {
			x = e.pageX - jQuery(this).offset().left;
			y = e.pageY - jQuery(this).offset().top;
			jQuery(this).find('span.circle').css({
				top: y,
				left: x
			});
		});
		jQuery('.xans-product-action .ec-base-button a').on('mouseout', function(e) {
			x = e.pageX - jQuery(this).offset().left;
			y = e.pageY - jQuery(this).offset().top;
			jQuery(this).find('span.circle').css({
				top: y,
				left: x
			});
		});
	});
	/* morenvy.com 링크 클릭시 부드럽게 이동 */
	jQuery('.detail_tab li a , .detail_nav li:nth-child(1) a , .detail_nav li:nth-child(2) a , .detail_nav li:nth-child(3) a , .detail_nav li:nth-child(4) a').click(function(event){            
		event.preventDefault();
		jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top}, 500);
    });

	/* morenvy.com 상세페이지 좌측 네비게이션 */
	jQuery(window).scroll(function(){
		var nav_y = jQuery(this).scrollTop();
		var nav_top = jQuery('.xans-product-additional').offset().top;
		if (nav_y >= nav_top){
			jQuery('.detail_nav').addClass('fixed') // 네비게이션 픽스드 시키기
		}
		else {jQuery('.detail_nav').removeClass('fixed')}
		if (nav_y >= jQuery('#detail').offset().top - 10){
			jQuery('.detail_nav li:nth-child(1)').addClass('on').siblings().removeClass('on')
		}
		if (nav_y >= jQuery('#review').offset().top - 10){
			jQuery('.detail_nav li:nth-child(2)').addClass('on').siblings().removeClass('on')
		}
		if (nav_y >= jQuery('#qna').offset().top - 10){
			jQuery('.detail_nav li:nth-child(3)').addClass('on').siblings().removeClass('on')
		}
		if (nav_y >= jQuery('#guide').offset().top - 10){
			jQuery('.detail_nav li:nth-child(4)').addClass('on').siblings().removeClass('on')
		}
	});

	/* morenvy.com 상세페이지 세트상품 */
	var swiper_set = new Swiper('.swiper_set', {
		slidesPerView: '4',
		slidesPerColumn: 3,
		slidesPerColumnFill: 'row',
		slidesPerGroup :2,
		watchOverflow: 'true',
		spaceBetween: 16,
        //autoplay: {
		//	delay: 7000,
		//	disableOnInteraction: false,
		//},
        navigation: {
			nextEl: '.swiper-button-next-set',
			prevEl: '.swiper-button-prev-set',
        },
		scrollbar: {
			el: '.swiper-scrollbar-set',
			dragSize: 298
		},
	});


	/* morenvy.com 상세페이지 추가구성상품 */
	var swiper_add = new Swiper('.swiper_add', {
		slidesPerView: '4',
		slidesPerColumn: 3,
		slidesPerColumnFill: 'row',
		slidesPerGroup :2,
		watchOverflow: 'true',
		spaceBetween: 16,
        //autoplay: {
		//	delay: 7000,
		//	disableOnInteraction: false,
		//},
        navigation: {
			nextEl: '.swiper-button-next-add',
			prevEl: '.swiper-button-prev-add',
        },
		scrollbar: {
			el: '.swiper-scrollbar-add',
			dragSize: 298
		},
	});

	/* morenvy.com 상세페이지 관련상품 */
	var swiper_rel = new Swiper('.swiper_rel', {
		slidesPerView: '4',
		watchOverflow: 'true',
		spaceBetween: 16,
        //autoplay: {
		//	delay: 7000,
		//	disableOnInteraction: false,
		//},
        navigation: {
			nextEl: '.swiper-button-next-rel',
			prevEl: '.swiper-button-prev-rel',
        },
		scrollbar: {
			el: '.swiper-scrollbar-rel',
			dragSize: 298
		},
	});
});


/* morenvy.com 상세페이지 상품정보 따라다니기 정환 */
var displaystatus = "none"; // 바로선택 오픈상태
jQuery(document).ready(function() {
    jQuery(".detail_nav .fixed_buy").click(function() {
        if (displaystatus == "none") {
            jQuery(".onfixed .wrap_infoArea").fadeIn(500);
			jQuery(".tab_cate").addClass("on");
			jQuery("#tab_cate_title").addClass("up");
            displaystatus = "display";
        } else {
            jQuery(".onfixed .wrap_infoArea").fadeOut(500);
			jQuery(".tab_cate").removeClass("on");
			jQuery("#tab_cate_title").removeClass("up");
            displaystatus = "none";
        }
    });
	jQuery('.detail_tab_close').click(function(){
            jQuery(".onfixed .wrap_infoArea").fadeOut(500);
			jQuery(".tab_cate").removeClass("on");
			jQuery("#tab_cate_title").removeClass("up");
            displaystatus = "none";
	})
});

/* morenvy.com 상세페이지 상품정보 따라다니기 정환 */
jQuery(window).scroll(function() {

	var buttonstart_height = $('.xans-product-additional').offset();
    if (jQuery(this).scrollTop() >= buttonstart_height.top) {
        jQuery(".tab_cate").addClass("onfixed");
        if (displaystatus == "none") {
            jQuery(".wrap_infoArea").css("display", "none");
        }
    } else {
        jQuery(".tab_cate").removeClass("onfixed");
        if (displaystatus == "none") {
            jQuery(".wrap_infoArea").css("display", "block");
        }
		jQuery('.detail_tab_close').trigger('click')
    }
});

/* morenvy.com 카카오톡 공유 링크 */
Kakao.init('');
function sendLink() {
	var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var sharetitle = jQuery(".xans-product-detail .headingArea h2").text();
	var summary = jQuery(".xans-product-detail .headingArea .summary_desc").text();
	var shareimg = jQuery("div.xans-product-detail .detail-image img.BigImage").attr('src');
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