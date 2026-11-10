
/* 250418 하지인 게시판 카테고리 버튼 커스텀 제작 */
$(document).ready(function () { // 시작 코드블럭
    /* 정렬 옵션의 value 값 받기 */
    jQuery('.boardSort #board_category option').each(function () { // 셀렉 박스에 모든 옵션을 확인 
        var sortIndex = jQuery(this).index(); // 해당 옵션의 인덱스 값
        var sortValue = jQuery(this).val(); // 해당 옵션의 벨류 값
        var sortText = jQuery(this).text(); // 해당 옵션의 텍스트 값


        // console.log(sortIndex); // 값 확인
        // console.log(sortValue); // 값 확인

        /* 카테고리 만큼 자동 추가 */
        jQuery('.board_cate_wrap').append('<li class="swiper-slide"><button value="' + sortValue + '">' + sortText + '</button></li>');

        if (jQuery(this).attr('selected') == 'selected') {
            jQuery('.board_cate_wrap li').eq(sortIndex).addClass('selected');
        }
    });


    jQuery('.board_cate_wrap button').click(function () { // 커스텀한 버튼을 클릭하면
        var changeValue = jQuery(this).attr('value'); // 커스텀 버튼의 벨류값
        jQuery('#board_category').val(changeValue).trigger('change'); // 셀렉 박스에 벨류 값 집어넣고 강제 실행
    });


    /* 게시판 구분 */
    var boardNo = new URLSearchParams(location.search).get('board_no');
    if (boardNo == 3) {
        // jQuery('.xans-board-listpackage').addClass('board_qna');
    }

    jQuery('.xans-board-listpackage-3 tr').on('click', function (e) {
        if (!jQuery(e.target).hasClass("boardChk")) {
            jQuery(this).toggleClass('active').siblings().removeClass('active');
            jQuery(this).find('.con').stop().slideToggle(400);
            jQuery(this).siblings().find('.con').stop().slideUp(400);
        };
    });



    /* 커스텀 카테고리 스와이퍼 */
	var swiper_board_cate = new Swiper('.swiper_board_cate', {
		observer: true,
		observeParents: true,
		watchOverflow: true, // 슬라이드가 부족할 때 스와이프 기능을 끄는 옵션
		slidesPerView: 'auto',
		spaceBetween: 8,
		loop: false,
		on: {
			init: function () {
				// 슬라이드 개수가 0개이면 컨테이너 숨김
				if (this.slides.length === 0) {
					this.el.style.display = 'none';
				} else {
					this.el.style.display = 'block';
				}
			},
		},
	});

    jQuery(".swiper_board_cate .swiper-slide").each(function (index) {
        if (jQuery(this).hasClass("selected")) {
            swiper_board_cate.slideTo(index);
        };
    });

}); // 시작 코드블럭 종료


