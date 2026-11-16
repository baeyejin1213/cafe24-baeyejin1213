jQuery(document).ready(function () {
    addTimeSaleBox();
    addMainTimeSaleBox();
});

function addTimeSaleBox() {
    var today = new Date();

    jQuery('.ec-base-product .layerDiscountPeriod .content p + p').each(function (index) {
        var date_data = jQuery(this).text();
        var date_start_end = date_data.split(' ~ ');

        if (date_start_end.length < 2) return;

        var start_time = new Date(date_start_end[0].replace(/-/g, '/'));
        var end_time = new Date(date_start_end[1].replace(/-/g, '/'));
        var $box = jQuery(this).parents('.box');
        var $timerBox = $box.find('.timesale_box');
        var $timerShell = $box.find('.timesale_box_shell');

        if ($timerBox.length === 0 || $timerBox.hasClass('is-countdown')) return;

        if (today < start_time) {
            TimerStart($timerBox, 0, start_time, end_time);
            $timerShell.show();
        } else if (start_time <= today && today < end_time) {
            TimerStart($timerBox, 1, end_time);
            $timerShell.show();
        } else {
            $timerBox.append(' 마감되었습니다.');
            $timerShell.show();
        }
    });

    jQuery('.infoArea .xans-product-detaildesign tr[rel="할인 기간"] .m_item .period').each(function (index) {
        var date_data = jQuery(this).text();
        var date_start_end = date_data.split(' ~ ');

        if (date_start_end.length < 2) return;

        var start_time = new Date(date_start_end[0].replace(/-/g, '/'));
        var end_time = new Date(date_start_end[1].replace(/-/g, '/'));
        var $detailArea = jQuery(this).parents('.detailArea');
        var $timerBox = $detailArea.find('.timesale_box');
        var $timerShell = $detailArea.find('.timesale_box_shell');

        if ($timerBox.length === 0 || $timerBox.hasClass('is-countdown')) return;

        if (today < start_time) {
            TimerStart($timerBox, 0, start_time, end_time);
            $timerShell.show();
        } else if (start_time <= today && today < end_time) {
            TimerStart($timerBox, 1, end_time);
            $timerShell.show();
        } else {
            $timerBox.append(' 마감되었습니다.');
            $timerShell.show();
        }
    });

    jQuery('.ec-base-product .timesale_box').each(function () {
        if (jQuery(this).text().length !== 0) {
            jQuery(this).parents('.timesale_box_shell').show();
        }
    });

    function TimerStart(obj, flag, end_time, end_time2) {
        if (flag == 0) {
            obj.countdown({
                until: end_time,
                serverSync: today,
                compact: true,
                padZeroes: true,
                format: 'DHMS',
                onExpiry: function () {
                    window.location.reload();
                },
                layout:
                    '<div class="untilEnd">' +
                    '<span class="day">{dnn}</span>Day&nbsp;:&nbsp;' +
                    '<span class="hour">{hnn}</span>h&nbsp;:&nbsp;' +
                    '<span>{mnn}</span>m&nbsp;:&nbsp;' +
                    '<span>{snn}s&nbsp;</span>' +
                    '</div>'
            });
        } else {
            obj.countdown({
                until: end_time,
                serverSync: today,
                compact: true,
                padZeroes: true,
                format: 'DHMS',
                onExpiry: function () {
                    obj.html(' 마감되었습니다.');
                },
                layout:
                    '<div class="untilEnd">' +
                    '<span class="day">{dnn}</span>Day&nbsp;:&nbsp;' +
                    '<span class="hour">{hnn}</span>h&nbsp;:&nbsp;' +
                    '<span>{mnn}</span>m&nbsp;:&nbsp;' +
                    '<span>{snn}s&nbsp;</span>' +
                    '</div>'
            });
        }
    }
}


function addMainTimeSaleBox() {
    var today = new Date();
    
    var $timerShell = jQuery('.top_flash_deal_bar .main_timesale_box_shell');
    var $timerBox = jQuery('.top_flash_deal_bar .main_timesale_box');

    // 타이머 렌더링할 타겟 영역이 없으면 종료
    if ($timerShell.length === 0 || $timerBox.length === 0) return;
    if ($timerBox.hasClass('is-countdown')) return;

    $timerBox.empty();

    // 첫 번째 할인 상품의 할인 기간 데이터 추출
    var $firstPeriod = jQuery('.ec-base-product .layerDiscountPeriod .content p + p').first();

    // 1. 할인 기간 요소가 없는 경우 (이미 이벤트/할인이 종료됨)
    if ($firstPeriod.length === 0) {
        $timerBox.html('Coming Soon');
        $timerShell.show();
        return;
    }

    // 2. 할인 기간 데이터가 있는 경우 날짜 파싱
    var date_data = $firstPeriod.text();
    var date_start_end = date_data.split(' ~ ');

    if (date_start_end.length < 2) {
        $timerBox.html('Coming Soon');
        $timerShell.show();
        return;
    }

    var start_time = new Date(date_start_end[0].replace(/-/g, '/'));
    var end_time = new Date(date_start_end[1].replace(/-/g, '/'));

    // 3. 시간 비교 후 처리
    if (today < start_time) {
        mainTimerStart($timerBox, start_time, function () {
            window.location.reload();
        });
        $timerShell.show();
    } else if (start_time <= today && today < end_time) {
        mainTimerStart($timerBox, end_time, function () {
            $timerBox.html('Coming Soon');
        });
        $timerShell.show();
    } else {
        $timerBox.html('Coming Soon');
        $timerShell.show();
    }

    function mainTimerStart(obj, end_time, expiryCallback) {
        obj.countdown({
            until: end_time,
            serverSync: today,
            compact: true,
            padZeroes: true,
            format: 'DHMS',
            onExpiry: expiryCallback,
            layout:
                '<div class="main_untilEnd">' +
                '<span class="time day">{dnn}Day</span>' +
                '<span class="time hour">{hnn}hour</span>' +
                '<span class="time min">{mnn}min</span>' +
                '<span class="time sec">{snn}sec</span>' +
                '</div>'
        });
    }
}