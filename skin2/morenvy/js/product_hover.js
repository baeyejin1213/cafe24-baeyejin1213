$(document).ready(function () { // 시작 코드블럭

/* 추가이미지 */
(function ($) {

	// 마우스 호버가 가능한 기기(PC)에서만 실행
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var MAX_CONCURRENT = 3; // 동시 요청 수 제한
    var queue = [];
    var running = 0;

    // 추가이미지를 미리 다운로드한 뒤 삽입
    function applyImg($a, src) {
        if (!src || $a.find('.img_hover').length) return;
        var img = new Image();
        img.onload = function () {
            $('<img>', { src: src, alt: '', 'class': 'img_hover' }).insertAfter($a.find('.img_main'));
        };
        img.src = src;
    }

    // 응답 HTML에서 추가이미지 주소 추출 (DOMParser는 이미지를 다운로드하지 않음)
    function pickSrc(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var imgs = doc.querySelectorAll('.xans-product-addimage img');
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].getAttribute('ec-data-src') || imgs[i].getAttribute('src') || '';
            if (src.indexOf('/extra/') > -1) return src; // 추가이미지 우선
        }
        // /extra/ 경로가 없으면 두 번째 이미지 사용 (첫 번째는 대표이미지)
        return imgs[1] ? (imgs[1].getAttribute('ec-data-src') || imgs[1].getAttribute('src')) : '';
    }

    function next() {
        if (running >= MAX_CONCURRENT || !queue.length) return;
        var $a = $(queue.shift());
        running++;
        $.get('/product/hover_img.html?product_no=' + $a.data('prd-no'))
            .done(function (html) { applyImg($a, pickSrc(html)); })
            .always(function () { running--; next(); });
    }

    function load($a, priority) {
        var el = $a[0];
        if (!$a.data('prd-no')) return;

        if ($a.data('hoverQueued')) {
            // 대기 중인 상품을 호버하면 맨 앞으로 이동
            var i = queue.indexOf(el);
            if (priority && i > 0) { queue.splice(i, 1); queue.unshift(el); }
            return;
        }
        $a.data('hoverQueued', true);
        priority ? queue.unshift(el) : queue.push(el);
        next();
    }

    // 화면에 보이는 상품부터 미리 로드
    var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (en.isIntersecting) { load($(en.target)); io.unobserve(en.target); }
        });
    }, { rootMargin: '200px' }) : null;

    function observeAll() {
        if (!io) return;
        $('.hover_thumb').each(function () {
            if (!this._hoverObserved) { this._hoverObserved = true; io.observe(this); }
        });
    }

    // 더보기 등으로 상품이 추가된 뒤 호출: window.hoverThumbRefresh();
    window.hoverThumbRefresh = observeAll;

    $(observeAll);
    $(window).on('load', observeAll);

    // 미리 로드되지 않은 상품은 호버 시 우선 로드
    $(document).on('mouseenter', '.hover_thumb', function () { load($(this), true); });
})(jQuery);

}); // 시작 코드블럭 종료