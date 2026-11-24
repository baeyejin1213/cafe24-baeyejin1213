/*
* 상세페이지 무료배송 진행표시줄 ver1.0
* morenvy.com 서정환 수정 24.03.15
*/
jQuery(document).ready(function() {

	jQuery(".free_shipping .delv_price_B").each(function() {
		/* morenvy.com 배송비 가져와서 출력 */
		jQuery('strong', this).remove();
		var shipping_txt0 = jQuery(this).text().replace(/[()]/g, '');
		var shipping_txt1 = Number(shipping_txt0.replace(/[^0-9]/g,'')); //배송비 가져오기
		jQuery(".free_shipping .delivery_price").html('<span class="total_amount"></span><span class="fee_delivery"></span>');
		jQuery(".free_shipping .delivery_price .fee_delivery").text(shipping_txt0); //배송비 문구


		/* morenvy.com 총상품가격 변경되면 감지 */
		var targetNode = document.querySelector('#totalPrice .total');
		var observerCallback = function(mutationsList, observer) {
			for(var mutation of mutationsList) {
				if (mutation.type === 'childList' || mutation.type === 'characterData') { // 변화가 감지되면
					var total_price_won = $(mutation.target).text().trim().split(" ");
					var total_price = Number(total_price_won[0].replace(/[^0-9]/g,''));
					jQuery(".free_shipping .delivery_price .total_amount").text(total_price_won[0]); // 총상품금액 출력
					jQuery(".free_shipping").show();

					var shipping_percentage = Math.round( total_price / shipping_txt1 * 100 );
					if( shipping_percentage >= 100 ) { // 퍼센트가 100% 넘으면
						var shipping_percentage = 100;
					};

					jQuery('#shipping_bar').LineProgressbar({ // 프로그레스바 실행
						percentage: shipping_percentage,
						height: '4px',
						ShowProgressCount: false,
						backgroundColor: '#eee',
						fillBackgroundColor: '#1a1a1a',
					});

					if( shipping_txt1 >= total_price ) { // 총상품금액이 배송비보다 작으면
						jQuery(".free_shipping .free_shipping_txt01").show();
						jQuery(".free_shipping .free_shipping_txt02").hide();
					} else {
						jQuery(".free_shipping .free_shipping_txt02").show();
						jQuery(".free_shipping .free_shipping_txt01").hide();
					}
				}
			}
		};

		var observer = new MutationObserver(observerCallback);
		var observerConfig = {
			childList: true, // 자식 노드의 추가 또는 제거를 감지
			characterData: true, // 텍스트 노드의 내용 변경을 감지
			subtree: true // 대상 노드의 모든 하위 요소에 대한 변경도 감지
		};
		observer.observe(targetNode, observerConfig); // 변경감지 실행
	});

});

/* 옵션 상품은 고른 옵션이 하나도 없으면 숨김 */
jQuery(function ($) {
    var $freeShip = $('.xans-product-detail .free_shipping');
    function checkFreeShip() {
        var hasRow = $('#totalProducts tr.option_product, #totalProducts tr.add_product').length > 0
            || $('#totalProducts > table > tbody:not(.displaynone, .option_products, .add_products) > tr:first-child').length > 0;
        $freeShip.toggleClass('off', !hasRow);
    }
    if ($freeShip.length && $('#totalProducts').length) {
        checkFreeShip();
        if (window.MutationObserver) new MutationObserver(checkFreeShip).observe($('#totalProducts')[0], {childList: true, subtree: true});
    }
});
