/* 무료배송 프로그레스바 : 총 상품금액 · 수량 변경 감지, 수량 0이면 숨김 */
jQuery(document).ready(function () {
    const box = jQuery(".free_shipping");
    const limitMatch = box.find(".delivery_price").text().match(/([\d,]+)원\s*이상/);
    if (!box.length || !limitMatch) return; // 조건부 무료배송이 아니면 표시 안 함

    const limit = Number(limitMatch[1].replace(/,/g, ""));
    box.find(".ship_info .limit").html("<b>" + limitMatch[1] + "원</b> 이상 구매 시 무료");

    const target = document.querySelector("#totalPrice .total");
    if (!target) return;

    function update() {
        const text = jQuery(target).text();
        const qty = Number((text.match(/\((\d+)\s*개\)/) || [])[1] || 0);
        const price = Number(text.split("(")[0].replace(/[^0-9]/g, ""));
        if (!qty) return box.removeClass("on");

        const isFree = price >= limit;
        box.addClass("on").toggleClass("is_free", isFree);
        box.find(".ship_bar span").css("width", Math.min(price / limit * 100, 100) + "%");
        box.find(".ship_info .cur").text(price.toLocaleString() + "원");
    }

    new MutationObserver(update).observe(target, {childList: true, characterData: true, subtree: true});
    update();
});
