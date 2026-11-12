/* -------------------------------
    매장안내 : board/store/list.html
    - 글 제목 "매장명■주소■주소2■영업시간■전화번호"를 나눠 각 칸에 넣는다.
    - 매장을 누르면 그 글 본문의 구글 지도 iframe 주소로 오른쪽(모바일은 위) 지도를 바꾼다.
    - 처음에는 첫 번째 매장 지도를 띄운다.
------------------------------- */
jQuery(document).ready(function ($) {
    var $list = $('.store_list .store_list_li');
    if (!$list.length) return;

    /* 제목 → 칸 나누기 (none 은 빈 칸) */
    var fields = ['#store_area', '#store_address', '#store_address02', '#store_time', '#store_phone'];
    $list.each(function () {
        var $ul = $(this);
        var data = $.trim($ul.find('.store_data').text()).split('■');
        $.each(fields, function (i, sel) {
            var v = $.trim(data[i] || '');
            $ul.find(sel).text(v === 'none' ? '' : v);
        });
    });

    /* 본문에서 지도 주소 꺼내기 : iframe src → 없으면 주소로 검색 지도 */
    function mapSrc($ul) {
        var raw = $ul.find('.store_map_data').text() + ' ' + ($ul.find('.store_map_data iframe').attr('src') || '');
        var m = raw.match(/src\s*=\s*["']([^"']+)["']/i) || raw.match(/(https?:\/\/[^\s"'<>]*google\.[^\s"'<>]*\/maps[^\s"'<>]*)/i);
        if (m) return m[1].replace(/&amp;/g, '&');
        var addr = $.trim($ul.find('#store_address').text()) || $.trim($ul.find('#store_area').text());
        return addr ? 'https://maps.google.com/maps?q=' + encodeURIComponent(addr) + '&output=embed' : '';
    }

    function showMap($ul) {
        var src = mapSrc($ul);
        if (!src) return;
        var $frame = $('<iframe width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>').attr('src', src);
        $('#google_map_address').empty().append($frame);
        $list.removeClass('on');
        $ul.addClass('on');
    }

    showMap($list.first());

    $list.on('click', function (e) {
        e.preventDefault();
        showMap($(this));
    });

    /* 검색 기간은 늘 전체, 검색어 칸 placeholder */
    $('#search_date').val('all').trigger('change');
    var txt = $('.store_search_txt').attr('title');
    $('.store_search_box #search').attr('placeholder', txt);

    /* 검색칸에서 엔터 */
    $('.store_search_box #search').on('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $('.store_search_box .store_search_btn').trigger('click');
        }
    });
});
/* -------------------------------
    매장안내 종료
------------------------------- */
