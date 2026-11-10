jQuery(document).ready(function() {
	/* 최근검색어 */
	var isVal = jQuery('.xans-product-searchdata .searchInput .keyword').attr('value'); // 현재 검색 키워드
	let recent = [];  // 검색 키워드 배열 생성

	if ( localStorage.getItem('recent_list') != undefined) {  //검색 내역이 있을경우 내역 가져옴
		recent.push.apply(recent,localStorage.getItem('recent_list').split(',')) // 배열에 최근 검색어 쿠키를 저장
	};

	if ( typeof isVal != "undefined" && isVal != "" && isVal != null ){ // 현재 검색 키워드가 있을 경우(= 검색페이지일 경우)
		isVal = isVal.trim();
		
		if ( localStorage.getItem('recent_list') == undefined) { // 검색 내역이 없을 경우
			// 배열에 현재 키워드를 추가 후, 쿠키에 저장
			recent.push(isVal)
			localStorage.setItem("recent_list", isVal, 1);
		} else { // 검색 내역이 있을 경우
			if( !localStorage.getItem('recent_list').includes(isVal) ){ // 최근 검색어에 현재 키워드가 없을 경우
				if( recent.length == 10 ){ // 최근검색어가 10개 이상이면 가장 오래된 1개 제거
					recent = recent.slice(1)
				}

				// 배열에 현재 키워드를 추가 후, 쿠키에 저장
				recent.push(isVal)
				localStorage.setItem("recent_list", recent, 1);
			}
		}
	};

	if( recent.length != 0 ){
		for( let r = 0; r < recent.length; r++  ){ // 배열 갯수만큼 최근 검색어 출력
			jQuery('.search_box .recent_keyword > ul').append(`
				<li><a href="/product/search.html?keyword=${recent[r]}">${recent[r]}</a><span class="del" onclick="del_recent(this);"><img src='/morenvyimg/cs_sch_del.svg' alt='삭제' /></span></li>
			`);
		};
	} else {
		jQuery('.search_box .recent_keyword > ul').html('<p class="blank">최근 검색어가 없습니다.</p>');
	}
	
	jQuery('.search_box .recent_keyword h3 span').click(function(){
		localStorage.removeItem('recent_list');
		jQuery('.search_box .recent_keyword > ul').html('<p class="blank">최근 검색어가 없습니다.</p>');
	});
});

// 최근검색어 삭제
function del_recent(recent_item) {
    var recent_list = [];

    var cookieValue = localStorage.getItem('recent_list');
    if (cookieValue) {
        recent_list = cookieValue.split(',');
    }

    // 삭제할 키워드 추출
    var keyword = jQuery(recent_item).prev('a').text();

    // 해당 li 제거
    jQuery(recent_item).parent('li').remove();

    // 쿠키 배열에서 해당 키워드 제거
    recent_list = recent_list.filter(function (element) {
        return element !== keyword;
    });

    // 쿠키와 화면 업데이트
    if (recent_list.length === 0) {
        localStorage.removeItem('recent_list');
        jQuery('.search_box .recent_keyword ul').html('<p class="blank">최근 검색어가 없습니다.</p>');
    } else {
        localStorage.setItem("recent_list", recent_list, 1);

        // 기존 ul 비우고 다시 채움 (iOS 대응 위해)
        var $ul = jQuery('.search_box .recent_keyword ul');
        $ul.empty();

        recent_list.forEach(function (word) {
            var $li = jQuery('<li></li>');
            var $a = jQuery('<a></a>')
                .attr('href', '/product/search.html?keyword=' + encodeURIComponent(word))
                .text(word);
            var $del = jQuery('<span class="del"><img src="/morenvyimg/cs_sch_del.svg" alt="삭제"></span>');
            $del.on('click', function () {
                del_recent(this);
            });

            $li.append($a).append($del);
            $ul.append($li);
        });
    }
}




/* 쿠키 스크립트 */
function setCookieCpa(cookie_name, cookie_value, expire_date) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * 24 * expire_date);
    cookies = cookie_name + '=' + cookie_value + '; path=/;';
    if (expire_date != 0) cookies += 'expires=' + expire.toGMTString();
    document.cookie = cookies;
}

function smdelCookieCpa(cookie_name) {
	var _today = new Date();
	var value = '';
	_today.setDate(_today.getDate() - 1);
	document.cookie = cookie_name + "=" + value + '; path=/;' + "; expires=" + _today.toGMTString();
}

function getCookiefss(name) {
    lims = document.cookie;
    var index = lims.indexOf(name + "=");
    if (index == -1) {
        return null;
    }
    index = lims.indexOf("=", index) + 1; // first character
    var endstr = lims.indexOf(';', index);
    if (endstr == -1) {
        endstr = lims.length; // last character
    }
    return unescape(lims.substring(index, endstr));
}