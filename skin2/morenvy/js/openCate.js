/* 상단 카테고리 */
/* morenvy.com 190610 정환 수정 */

var aCategory = [];
$(document).ready(function(){
    $('#header').after('<div id="dimmedSlider" class="m_only"></div>');
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
                    // 중분류 없는 대분류 : 주소는 모듈이 준 {$link_product_list} 그대로 둠
                    // (예전엔 /product/list.html 로 덮어써서 화면 경로 설정·분류 디자인 페이지가 링크에 반영되지 않았음)
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

function subMenuon(obj) {
    $(obj).parent().find('li').removeClass('selected');
	$(obj).parent().addClass('selected');
	$(obj).parent().siblings().removeClass("selected");
}

function checkInArray(sBookmarkList, iCateNo) {
    return false;
}
