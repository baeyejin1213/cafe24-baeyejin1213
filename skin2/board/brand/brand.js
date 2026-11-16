/* morenvy.com 정환 210405 */
jQuery(document).ready(function() {

	/* morenvy.com 브랜드페이지 배너 슬라이드 */
	var slide_ban = new Swiper('.slide_ban', {
		slidesPerView: '1',
		watchOverflow: 'true',
		spaceBetween: 0,
        //autoplay: {
		//	delay: 7000,
		//	disableOnInteraction: false,
		//},
        navigation: {
			nextEl: '.swiper-button-next-brand',
			prevEl: '.swiper-button-prev-brand',
        },
	});

	/* morenvy.com 브랜드리스트 검색 조건을 전체로 변경 */
	jQuery('#search_date').val('all').trigger('change');

	/* morenvy.com 브랜드리스트 자료 출력 */
	jQuery( "#brand_list .brand_data" ).each(function( index ) {
		var brand_data = jQuery(this).text(); 
		var brand_data_split = brand_data.split(",");

		jQuery(this).parents('li').find('#brand_name_en').append(brand_data_split[0]);
		jQuery(this).parents('li').find('#brand_name_kr').append(brand_data_split[1]);
		jQuery(this).parents('li').find('#brand_cateno').append(brand_data_split[2]);

		if ( jQuery( this ).html().indexOf('http') > -1 ){ // 링크가 http로 시작한다면
			jQuery(this).parents('li').find('a').attr('href',brand_data_split[2]);
		} else {
			jQuery(this).parents('li').find('a').attr('href','/product/list.html?cate_no='+brand_data_split[2]);
		}
		var brand_name_kr = brand_data_split[1].substr(0, 1);
		var brand_name_kr2 = getConstantVowel(brand_name_kr);
		var brand_name_en = brand_data_split[0].substr(0, 1).toLowerCase(); // 영문자 소문자로 변경
		jQuery(this).parents('li').attr("rel",brand_name_kr2);
		jQuery(this).parents('li').attr("rel_en",brand_name_en);
	});

	/* morenvy.com 브랜드리스트 상자 각각 넣기 */
	var pattern_eng = /[a-zA-Z]/;	// 문자 
	var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;	// 한글체크
	jQuery( ".brandlist_tablea ul li" ).each(function() { //상자
		var kr_brand_rel = jQuery(this).attr("rel");
		var en_brand_rel = jQuery(this).attr("rel_en");

		if (pattern_kor.test(kr_brand_rel)) { // 한글
			jQuery(this).clone().appendTo(".brandlist_table_box ul li[data-spel="+kr_brand_rel+"] ul");
		} else { // 기타
			jQuery(".brandlist_table_box ul li[data-spel='etc'] ul").append(this);
		}

		if (pattern_eng.test(en_brand_rel)) { // 영문
			jQuery(".brandlist_table_box ul li[data-spel="+en_brand_rel+"] ul").append(this);
		} else { // 기타
			jQuery(".brandlist_table_box ul li[data-spel='etc'] ul").append(this);
		}
	});

	/* morenvy.com 상자에 브랜드리스트 없으면 숨김 */
	jQuery( ".brandlist_table ul" ).each(function() {
		var brandlist_check = jQuery('li',this).length;

		if ( brandlist_check == 0 ){
			var brand_rel = jQuery(this).parent().data('spel').toUpperCase();
			jQuery(this).parent().hide(); //리스트 숨김
			jQuery('.allbrand_text ul li[data-brand='+brand_rel+']').css('opacity','0.3'); //버튼 none 처리
			jQuery('.allbrand_text ul li[data-brand='+brand_rel+']').css('cursor','default');
			//jQuery('.allbrand_text ul li[data-brand='+brand_rel+']').html(brand_rel);
		};
	});

	/* morenvy.com 모음 선택시 해당 브랜드 리스트만 출력 */
	jQuery(".allbrand_text .search_brand_kr li span").click(function() {
		var search_brand_kr_li = jQuery(this).parent().data('brand');
		jQuery('.allbrand_text ul li').removeClass("on");
		jQuery(this).parent().addClass('on');
		jQuery('.brandlist_table_box > ul > li[data-spel='+search_brand_kr_li+']').fadeIn().siblings().hide();
	});

	/* morenvy.com 스펠링 선택시 해당 브랜드 리스트만 출력 */
	jQuery(".allbrand_text .search_brand_en li span").click(function() {
		var search_brand_en_li = jQuery(this).parent().data('brand').toLowerCase();
		jQuery('.allbrand_text ul li').removeClass("on");
		jQuery(this).parent().addClass('on');
		jQuery('.brandlist_table_box > ul > li[data-spel='+search_brand_en_li+']').fadeIn().siblings().hide();
	});
});

/* 한글 모음 나누기 */
function getConstantVowel(kor) {
	const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ','ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ','ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const ga = 44032;
	let uni = kor.charCodeAt(0);
	uni = uni - ga;
	let fn = parseInt(uni / 588);
	return  f[fn];
}
