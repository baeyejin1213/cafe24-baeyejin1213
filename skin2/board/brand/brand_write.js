/* morenvy.com 정환 210405 */
jQuery(document).ready(function() {
	/* morenvy.com 브랜드 등록 버튼 클릭하면 실행 */
	jQuery("#action_go").click(function() {
		var brand_en = jQuery("#brand_en").val();
		var brand_kr = jQuery("#brand_kr").val();
		var brand_cate_no = jQuery("#brand_cate_no").val();

		var brand_en_check = jQuery("#brand_en").val().length;
		var brand_kr_check = jQuery("#brand_kr").val().length;
		var brand_cate_no_check = jQuery("#brand_cate_no").val().length;

		if ((brand_en_check == 0) || (brand_kr_check == 0) || (brand_cate_no_check == 0)){
			 alert("빈칸없이 입력해 주세요.");
		} else {
			jQuery("#subject").attr('value',brand_en+','+brand_kr+','+brand_cate_no);
			jQuery('#action_go2').trigger('click');
		}
	});

	/* morenvy.com 브랜드 수정페이지 */
	jQuery( ".brandlist_write #subject" ).each(function( index ) {
		var brand_data = jQuery(this).val(); 
		var brand_data_split = brand_data.split(",");
		jQuery(this).parents('tbody').find('#brand_en').val(brand_data_split[0]);
		jQuery(this).parents('tbody').find('#brand_kr').val(brand_data_split[1]);
		jQuery(this).parents('tbody').find('#brand_cate_no').val(brand_data_split[2]);
	});
});