/* 상단 카테고리 */
/* morenvy.com 190610 정환 수정 */

var aCategory = [];
$(document).ready(function(){
    $('#header').after('<div id="dimmedSlider" class="m_only"></div>');

    /* 상단 : 카테고리 펼침 스타일 (mheader.html 의 #gnbType 클래스로 선택 : gnb_basic / gnb_all) */
    var sGnbType = $('#gnbType').hasClass('gnb_all') ? 'gnb_all' : 'gnb_basic';
    $('#header').addClass(sGnbType);
    var methods = {
        aCategory    : [],
        aSubCategory : {},
        get: function()
        {
             $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {
                    if (aData == null || aData == 'undefined') {
                        methods.checkSub();
                        return;
                    }
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;
                        var sCateNo = aData[i].cate_no;
                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }
                        if (!aCategory[sCateNo]) {
                            aCategory[sCateNo] = [];
                        }
                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                        aCategory[sCateNo] = aData[i];
                    }
                    methods.checkSub();

					jQuery('#header .h_category li > a.cate').each(function(){
						var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
						if (!iCateNo) return;
						methods.show(this.parentNode, iCateNo);
					})

                    if (sGnbType == 'gnb_all') gnbAll.build();
                }
            });
        },
        getParam: function(sUrl, sKey) {
            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};
            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },

        show: function(overNode, iCateNo) {
			var oParentNode = overNode;
            var aHtml = [];
            var sMyCateList = localStorage.getItem("myCateList");
            if (methods.aSubCategory[iCateNo] != undefined) {
                aHtml.push('<div class="slideSubMenu depth2"><ul>');
                $(methods.aSubCategory[iCateNo]).each(function() {
                    var sNextParentNo = this.cate_no;
                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                    if (methods.aSubCategory[sNextParentNo] == undefined) {
                        aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                        var sHref = ''
                    } else {
                        aHtml.push('<li id="cate'+this.cate_no+'">');
                        var sHref = '#none';
                    }
                    aHtml.push('<a href="'+this.link_product_list+'" class="cate" cate="'+this.param+'" ">'+this.name+'</a> <span class="open_arr"></span>'); // 중분류

                    if (methods.aSubCategory[sNextParentNo] != undefined) {
                        aHtml.push('<div class="depth3"><ul>');
                        $(methods.aSubCategory[sNextParentNo]).each(function() {
                            var sNextParentNo2 = this.cate_no;
                            var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                            if (methods.aSubCategory[sNextParentNo2] == undefined) {
                                aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                var sHref = ''
                            } else {
                                aHtml.push('<li id="cate'+this.cate_no+'">');
                                var sHref = '#none';
                            }
                            aHtml.push('<a href="'+this.link_product_list+'" class="cate" cate="'+this.param+'" ">'+this.name+'</a> <span class="open_arr"></span>'); // 소분류


                            if (methods.aSubCategory[sNextParentNo2] != undefined) {
                                aHtml.push('<div class="depth4"><ul>');

                                $(methods.aSubCategory[sNextParentNo2]).each(function() {
                                    aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                                    aHtml.push('<a href="'+this.link_product_list+'" class="cate" cate="'+this.param+'" ">'+this.name+'</a> <span class="open_arr"></span>'); // 하위분류
                                    aHtml.push('</li>');
                                });
                                aHtml.push('</ul></div>');
                            }
                            aHtml.push('</li>');
                        });
                        aHtml.push('</ul></div>');
                    }
                    aHtml.push('</li>');
                });
                aHtml.push('</ul></div>');
            }
            $(oParentNode).append(aHtml.join(''));
        },
        close: function() {
            $('#header .h_category .slideSubMenu').remove();
        },
        checkSub: function() {
            $('.cate').each(function(){
                var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
                var result = methods.aSubCategory[iCateNo];
                if (result == undefined) {
                    var sHref = '/product/list.html'+$(this).attr('cate'); // 중분류 없는 대분류
                    $(this).attr('href', sHref);
                    $(this).parent().attr('class', 'noChild');
                }
            });
        },
    };

    methods.get();

    $('#header .h_category li > a.cate').each(function(e) {
        var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
        if (!iCateNo) return;
        methods.show(this.parentNode, iCateNo);
    });

	jQuery('#header .h_category li').mouseenter(function(e){
		$(this).addClass('selected');
		if (!$(this).hasClass('noChild')){
            e.preventDefault();
		};
	}).mouseleave(function (e) {
        $(this).removeClass("selected").find("li").removeClass("selected");
        if (!$(this).hasClass('noChild')){
            e.preventDefault();
		};
    });

    jQuery(document).on("mouseenter", '#header .h_category li', function(e){
		$(this).addClass('selected');
		if (!$(this).hasClass('noChild')){
            e.preventDefault();
		};
	}).on("mouseleave", '#header .h_category li', function (e) {
        $(this).removeClass("selected").find("li").removeClass("selected");
        if (!$(this).hasClass('noChild')){
            e.preventDefault();
		};
    });
});

/* 상단 : 전체메뉴 중분류(gnb_all) - 대분류별 중분류·소분류·상세분류를 한 번에 펼침 */
var gnbAll = {
    list: function(oUl) {
        var aHtml = ['<ul>'];
        oUl.children('li').each(function() {
            var oSub = $(this).children('div').children('ul');
            aHtml.push('<li><a href="'+$(this).children('a.cate').attr('href')+'">'+$(this).children('a.cate').html()+'</a>');
            if (oSub.length) aHtml.push(gnbAll.list(oSub));
            aHtml.push('</li>');
        });
        aHtml.push('</ul>');
        return aHtml.join('');
    },
    build: function() {
        var aHtml = [];
        $('#header .h_category > li:not(.h_event)').each(function() {
            var oCate = $(this).children('a.cate');
            var oSub = $(this).children('.depth2').children('ul');
            if (!oCate.length) return;
            aHtml.push('<div class="col"><a href="'+oCate.attr('href')+'">'+oCate.html()+'</a>');
            if (oSub.length) aHtml.push(gnbAll.list(oSub));
            aHtml.push('</div>');
        });
        $('#header').append('<div class="gnb_all_box"><div class="inner">'+aHtml.join('')+'</div></div>');
        $('#header').after('<div id="gnbDim"></div>');

        // 대분류(이벤트 제외)에 올리면 열고, 로고·아이콘 영역에 올리거나 헤더를 벗어나면 닫음
        $('#header .h_category > li:not(.h_event)').on('mouseenter', function() { gnbAll.toggle(true); });
        $('#header .h_category > li.h_event, #header .h_sec01, #header .h_sec03').on('mouseenter', function() { gnbAll.toggle(false); });
        $('#header').on('mouseleave', function() { gnbAll.toggle(false); });
    },
    toggle: function(bOpen) {
        $('#header').toggleClass('gnb_open', bOpen).toggleClass('h_white', bOpen || ($('#header').hasClass('sch_top') && $('body').hasClass('searchOn')));
        $('body').toggleClass('gnb_open', bOpen);
    }
};

function subMenuon(obj) {
    $(obj).parent().find('li').removeClass('selected');
	$(obj).parent().addClass('selected');
	$(obj).parent().siblings().removeClass("selected");
}

function checkInArray(sBookmarkList, iCateNo) {
    return false;
}
