$(function(){
    $('[id^="replyArea_"]').each(function(e) {
        $(this).hide();
    });

    if($('.xans-board-readpackage .ec-base-button.gBottom > span.gLeft > a:not(.displaynone)').length > 0) {
        $('.xans-board-readpackage .ec-base-button.gBottom > span.gLeft').addClass('on');
    }
});