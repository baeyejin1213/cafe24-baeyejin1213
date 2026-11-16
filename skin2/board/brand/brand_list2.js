/* morenvy.com 브랜드 페이지 210405 정환 */
jQuery(document).ready(function() {
	
	/* morenvy.com 브랜드 자료 출력 */
	jQuery( "#brand_list .brand_data" ).each(function( index ) {
		var brand_data = jQuery(this).text(); 
		var brand_data_split = brand_data.split(",");

		jQuery(this).parents('tr').find('#brand_en').append(brand_data_split[0]);
		jQuery(this).parents('tr').find('#brand_kr').append(brand_data_split[1]);
		jQuery(this).parents('tr').find('#brand_category_no').append(brand_data_split[2]);
	});
});

