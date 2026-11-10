jQuery(document).ready(function () {
    addTimeSaleBox(); // 타임세일 박스 업데이트


    // /* morenvy.com 타임세일. 정환 */
    // var today = new Date(); // 컴퓨터시간

    // jQuery('.ec-base-product .layerDiscountPeriod .content p + p').each(function (index) {
    //     var date_data = jQuery(this).text();        
    //     var date_start_end = date_data.split(' ~ '); // 시작시간 끝시간으로 자름
    //     var start_time = new Date(date_start_end[0].replace(/-/g, '/'));
    //     var end_time = new Date(date_start_end[1].replace(/-/g, '/'));

    //     if (today < start_time) {
    //         // 세일 시작 전
    //         TimerStart(jQuery(this).parents('.box').find('.timesale_box'), 0, start_time, end_time);
    //         jQuery(this).parents('.box').find('.timesale_box_shell').css('display', 'flex');
    //     } else if (start_time <= today && today < end_time) {
    //         // 타임세일 중
    //         TimerStart(jQuery(this).parents('.box').find('.timesale_box'), 1, end_time);
    //         jQuery(this).parents('.box').find('.timesale_box_shell').css('display', 'flex');
    //     } else {
    //         jQuery(this).parents('.box').find('.timesale_box').append(' 마감되었습니다.');
    //         jQuery(this).parents('.box').find('.timesale_box_shell').css('display', 'flex');
    //     }
    // });

    // jQuery('.ec-base-product .timesale_box_shell').prepend('<span class="clock"></span>');

    // // 타임세일 내용없을때 숨기기
    // jQuery('.ec-base-product .timesale_box').each(function(){
    //     if($(this).text().length == 0){
    //         $(this).addClass('test').parents('.timesale_box_shell').hide();
    //     }
    // })

    // //flag = 0 시작전,  flag = 1 마감전
    // function TimerStart(obj, flag, end_time, end_time2) {
    //     if (flag == 0) {
    //         obj.countdown({
    //             until: end_time,
    //             serverSync: today,
    //             compact: true,
    //             padZeroes: true,
    //             format: 'DHMS',
    //             onExpiry: function () {
    //                 window.location.reload();
    //             },
    //             layout: `<div class='untilEnd'><span class='day'>{dnn}d</span> <span class="text">:</span> <span class='hour'>{hnn}</span> <span class="text">:</span> <span>{mnn}</span> <span class="text">:</span> <span>{snn}</span></div>`,
    //         });
    //     } else {
    //         obj.countdown({
    //             until: end_time,
    //             serverSync: today,
    //             compact: true,
    //             padZeroes: true,
    //             format: 'DHMS',
    //             onExpiry: function () {
    //                 obj.html(' 마감되었습니다.');
    //             },
    //             layout: `<div class='untilEnd'><span class='day'>{dnn}d</span> <span class="text">:</span> <span class='hour'>{hnn}</span> <span class="text">:</span> <span>{mnn}</span> <span class="text">:</span> <span>{snn}</span></div>`,
    //         });
    //     }
    // }

    // /* 타임세일 종료후 */
    // jQuery('div.ec-base-product .prdList .thumbnail .timesale_box_shell .timesale_box').each(function (index) {
    //     // is-countdown 클래스를 가지고 있지 않은 요소에 대해서만 처리
    //     if (!jQuery(this).hasClass('is-countdown')) {
    //         var layout = "<div class='untilStart'><span class='timeSale_icon'></span>할인종료<span class='dn'>00</span> 일<span class='hour'>00</span> : <span>00</span> : <span>00</span></div>";
    //         jQuery(this).append(layout);
    //         jQuery(this).closest('.timesale_box_shell').addClass('end_timesale').css('display', 'flex');
    //     }
    // });
});


function addTimeSaleBox() {
    var today = new Date(); // 컴퓨터시간

    /* 메인, 목록 */
    jQuery('.ec-base-product .layerDiscountPeriod .content p + p').each(function (index) {
        var date_data = jQuery(this).text();
        var date_start_end = date_data.split(' ~ '); // 시작시간 끝시간으로 자름
        var start_time = new Date(date_start_end[0].replace(/-/g, '/'));
        var end_time = new Date(date_start_end[1].replace(/-/g, '/'));

        if (today < start_time) {
            // 세일 시작 전
            TimerStart(jQuery(this).parents('.box').find('.timesale_box'), 0, start_time, end_time);
            jQuery(this).parents('.box').find('.timesale_box_shell').show();
        } else if (start_time <= today && today < end_time) {
            // 타임세일 중
            TimerStart(jQuery(this).parents('.box').find('.timesale_box'), 1, end_time);
            jQuery(this).parents('.box').find('.timesale_box_shell').show();
        } else {
            jQuery(this).parents('.box').find('.timesale_box').append(' 마감되었습니다.');
            jQuery(this).parents('.box').find('.timesale_box_shell').show();
        }
    });

    /* 상세 */
    jQuery('.infoArea .xans-product-detaildesign tr[rel="할인 기간"] .m_item .period').each(function (index) {
        var date_data = jQuery(this).text();
        var date_start_end = date_data.split(' ~ '); // 시작시간 끝시간으로 자름
        var start_time = new Date(date_start_end[0].replace(/-/g, '/'));
        var end_time = new Date(date_start_end[1].replace(/-/g, '/'));

        if (today < start_time) {
            // 세일 시작 전
            TimerStart(jQuery(this).parents('.detailArea').find('.timesale_box'), 0, start_time, end_time);
            jQuery(this).parents('.detailArea').find('.timesale_box_shell').show();
        } else if (start_time <= today && today < end_time) {
            // 타임세일 중
            TimerStart(jQuery(this).parents('.detailArea').find('.timesale_box'), 1, end_time);
            jQuery(this).parents('.detailArea').find('.timesale_box_shell').show();
        } else {
            jQuery(this).parents('.detailArea').find('.timesale_box').append(' 마감되었습니다.');
            jQuery(this).parents('.detailArea').find('.timesale_box_shell').show();
        }
    });
    

    // 타임세일 적용된 상품만 보이기
    jQuery('.ec-base-product .timesale_box').each(function () {
        if (jQuery(this).text().length != 0) {
            jQuery(this).parents('.timesale_box_shell').show();
        };
    });

    //flag = 0 시작전,  flag = 1 마감전
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
                layout: `<div class='untilEnd'><span class='day'>{dnn}</span>일&nbsp;:&nbsp;<span class='hour'>{hnn}</span>&nbsp;:&nbsp;<span>{mnn}</span>&nbsp;:&nbsp;<span>{snn}&nbsp;</span>남음</div>`,
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
                layout: `<div class='untilEnd'><span class='day'>{dnn}</span>일&nbsp;:&nbsp;<span class='hour'>{hnn}</span>&nbsp;:&nbsp;<span>{mnn}</span>&nbsp;:&nbsp;<span>{snn}&nbsp;</span>남음</div>`,
            });
        }
    }
}