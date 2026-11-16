jQuery(document).ready(function() {
	/*
	observer: true, // 스와이프가 display:none이라도 실행되게끔
	observeParents: true, // 스와이프가 display:none이라도 실행되게끔
	watchOverflow: 'true', // 스와이프가 한개일때 버튼 라인 비활성
	touchRatio: 0,// 마우스 드래그 금지
	slidesPerView: 'auto', // 출력할 슬라이드 갯수, auto, 1,2,3,4... / 3.1 소수점 가능
	centeredSlides: true, // 첫 슬라이드를 가운데로 표시할것인가
	spaceBetween: 60, // 슬라이드 사이 여백
	loop: true, // 슬라이드 끝에서 첫페이지로 넘어가기
	effect : 'fade', // 슬라이드 효과, coverflow, flip, cube, cards
	fadeEffect: {
		crossFade: true
	}, // 슬라이드효과가 fade일때 이 옵션을 넣으면 다른슬라이드가 겹치지 않음
	speed:1000, // 슬라이드 넘어가는 속도
	*/

	/* morenvy.com 메인섹션01 - 메인비주얼 */
	var swiper01 = new Swiper('.swiper01', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop:true,
        navigation: {
			nextEl: '.swiper-button-next-main',
			prevEl: '.swiper-button-prev-main',
        },
     autoplay: {
		delay: 7000,
			disableOnInteraction: false,
		},
		speed:600
	});
	
	/* morenvy.com 메인섹션03 - 신상품 */
	jQuery('ul.m_tab01 li').click(function() {
		var activeTab = jQuery(this).attr('data-tab');
		jQuery('ul.m_tab01 li').removeClass('current');
		jQuery('.tabcontent01').removeClass('current');
		jQuery(this).addClass('current');
		jQuery('#' + activeTab).addClass('current');
	});


	/* morenvy.com 메인섹션03 - 메인 탭 상품진열 슬라이드 */
	var swiperRoll = new Swiper('.swiper_roll', {
		roundLengths: true,
		observer: true,
		observeParents: true,
		slidesPerView: '3',
		spaceBetween:16,
		scrollbar: {
			el: '.swiper-scrollbar-tab',
			draggable: 120,
			dragSize: 576
		},
		navigation: {
			nextEl: '.swiper-button-next-tab01',
			prevEl: '.swiper-button-prev-tab01',
        }
	});

	/* morenvy.com 메인섹션04 - 기획전 배너 */
	var swiper02 = new Swiper('.swiper02', {
		slidesPerView: '2.675',
		spaceBetween: 16,
		speed: 800,
		navigation: {
			nextEl: '.swiper-button-next-pro01',
			prevEl: '.swiper-button-prev-pro01',
        },

	});

	/* morenvy.com  메인섹션07 - 랭킹 */
	rank();
	var swiper03 = new Swiper('.swiper03', {
		spaceBetween: 40,
		slidesPerView: 'auto',
		speed: 800,
        navigation: {
			nextEl: '.swiper-button-next-rank03',
			prevEl: '.swiper-button-prev-rank03',
        },
	});
	function rank () {
		jQuery('.mm_rank .ec-base-product .num span').each(function(index){
			jQuery(this).text('0'+(index+1));
		});
	}
	/* morenvy.com  메인섹션09 - 타임세일 */
	var swiper_sec04 = new Swiper('.swiper_sec04', {
		slidesPerView: 4,
		spaceBetween: 16,
		watchOverflow: 'true',
		speed:1000,
        navigation: {
			nextEl: '.swiper-button-next-sale04',
			prevEl: '.swiper-button-prev-sale04',
        },
        scrollbar: {
			el: ".swiper-scrollbar-sec04",
			dragSize: 428
        },
	});

});