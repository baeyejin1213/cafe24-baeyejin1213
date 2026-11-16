jQuery(document).ready(function() {
	/* morenvy.com 회원가입 약관동의 텍스트 변경 */
	jQuery('.xans-member-join .agreeArea .check').each(function(index){
		var orderform_name = jQuery("input[type=checkbox]",this).attr('fw-label');
		jQuery("input[type=checkbox]",this).next().html(orderform_name)
	});
	jQuery('.xans-member-join .agreeArea .check label[for="is_sms0"]').append('<label for="is_sms0">[선택] SMS 수신 동의</label>');
	jQuery('.xans-member-join .agreeArea .check label[for="is_news_mail0"]').append('<label for="is_news_mail0">[선택] 이메일 수신 동의</label>');
	jQuery('.xans-member-join .agreeArea .check label[for="agree_service_check0"]').html('[필수] 이용약관 동의');
	jQuery('.xans-member-join .agreeArea .check label[for="agree_privacy_check0"]').html('[필수] 개인정보 수집 및 이용 동의');
	jQuery('.xans-member-join .agreeArea .check label[for="agree_information_check0"]').html('[선택] 개인정보 제3자 제공 동의');
	jQuery('.xans-member-join .agreeArea .check label[for="agree_consignment_check0"]').html('[선택] 개인정보 처리 위탁 동의');

	/* morenvy.com 회원가입 약관동의 탭 */
	jQuery(".xans-member-join .agreeArea .content").hide();
	jQuery(".xans-member-join .agreeArea .showhide").click(function(){
		jQuery(this).parents(".agreeArea").find(".content").slideToggle("fast");
	});
});
