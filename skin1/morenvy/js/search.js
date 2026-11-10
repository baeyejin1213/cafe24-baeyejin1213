$(document).ready(function () {
    /* 정렬 옵션의 value 값 받기 */
    jQuery('#selArray option').each(function () { // 셀렉 박스에 모든 옵션을 확인 
        var sortValue = jQuery(this).val(); // 해당 옵션의 벨류 값
        var sortText = jQuery(this).text(); // 해당 옵션의 텍스트 값


        // console.log(sortIndex); // 값 확인
        // console.log(sortValue); // 값 확인

        /* 카테고리 만큼 자동 추가 */
        jQuery('.custom_sort').append('<li><a href="' + sortValue + '">' + sortText + '</a></li>');
    });

    /* 지금 링크의 값이랑 똑같은 a 태그는 클래스 추가 */
    var sort_method = new URLSearchParams(location.search).get('sort_method');
    jQuery('[href*="sort_method=' + sort_method + '"]').addClass('selected');


    jQuery('#order_by option').each(function () { // 셀렉 박스에 모든 옵션을 확인 
        var sortIndex = jQuery(this).index(); // 해당 옵션의 인덱스 값
        var sortValue = jQuery(this).val(); // 해당 옵션의 벨류 값
        var sortText = jQuery(this).text(); // 해당 옵션의 텍스트 값


        // console.log(sortIndex); // 값 확인
        // console.log(sortValue); // 값 확인

        /* 카테고리 만큼 자동 추가 */
        jQuery('.custom_sort').append('<li><button value="' + sortValue + '">' + sortText + '</button></li>');

        if (jQuery(this).attr('selected') == 'selected') {
            jQuery('.custom_sort li').eq(sortIndex).addClass('selected');
        }
    });

    jQuery('.custom_sort button').click(function () { // 커스텀한 버튼을 클릭하면
        var changeValue = jQuery(this).attr('value'); // 커스텀 버튼의 벨류값
        jQuery('#order_by').val(changeValue).trigger('change'); // 셀렉 박스에 벨류 값 집어넣고 강제 실행
    });


    /* 인기 검색어 */
    var swiper_search_key = new Swiper(".swiper_search_key", {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        slidesPerView: "auto",
        spaceBetween: 10,
    });
});