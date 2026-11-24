/* 사이드 메뉴 */
jQuery(function ($) {

    var $body = $('body');
    var $header = $('#header.h_type01');

    /* 사이드 메뉴 카테고리 */
    var $side = $('#aside');
    function sideSelect($li) {
        $li.addClass('on').siblings().removeClass('on');
        $side.find('.d1 > ul > li').not($li).removeClass('on');
    }
    $side.on('click', '.d1 > ul > li > a.cate', function (e) {
        var $li = $(this).parent();
        if (!$li.children('.depth2').length || $li.hasClass('on')) return;
        e.preventDefault();
        sideSelect($li);
    });
    $side.on('click', '.depth2 > ul > li > a.cate', function (e) {
        var $li = $(this).parent();
        if (!$li.children('.depth3').length || $li.hasClass('active')) return;
        e.preventDefault();
        $li.toggleClass('active').children('.depth3').stop().slideToggle(300);
        $li.siblings('.active').removeClass('active').children('.depth3').stop().slideUp(300);
    });

    $side.on('click', '.depth3 > ul > li > a.cate', function (e) {
        var $li = $(this).parent();
        if (!$li.children('.depth4').length || $li.hasClass('active')) return;
        e.preventDefault();
        $li.toggleClass('active').children('.depth4').stop().slideToggle(300);
        $li.siblings('.active').removeClass('active').children('.depth4').stop().slideUp(300);
    });

    /* 다국어 선택 */
    $side.find('.side_lang .code').text(function (i, t) { return $.trim(t).split(/[_-]/).pop().toUpperCase(); });
    $side.on('click', '.side_lang .toggle', function () { $(this).parent().toggleClass('open'); });
    $(document).on('click', function (e) { if (!$(e.target).closest('.side_lang').length) $('.side_lang').removeClass('open'); });

    function sideOpen() {
        $body.addClass('sideOn');
        if (!$side.find('.d1 li.on').length) sideSelect($side.find('.d1 > ul > li').has('.depth2').first());
    }
    function sideClose() { $body.removeClass('sideOn'); }
    $header.on('click', '.h_util .menu a', function (e) { e.preventDefault(); sideOpen(); });
    $(document).on('click', '.f_nav .side_open', sideOpen);
    $(document).on('click', '#aside .side_close', sideClose);
    $(document).on('click', '.h_dim', sideClose);
    $(document).on('keydown', function (e) { if (e.key === 'Escape') sideClose(); });
});
