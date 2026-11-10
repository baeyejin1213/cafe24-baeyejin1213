/* 사이드바 카테고리 */
/* morenvy.com 190610 정환 수정 */

var aCategory = [];
$(document).ready(function(){
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

					jQuery('#aside .side_cate li > a.cate').each(function(){
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
                    aHtml.push('<a href="'+this.link_product_list+'" class="cate" cate="'+this.param+'" ">'+this.name+'<span class="open"></span></a>'); // 중분류

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
                            aHtml.push('<a href="'+this.link_product_list+'" class="cate" cate="'+this.param+'" ">'+this.name+'<span class="open"></span></a>'); // 소분류


                            if (methods.aSubCategory[sNextParentNo2] != undefined) {
                                aHtml.push('<div class="depth4"><ul>');

                                $(methods.aSubCategory[sNextParentNo2]).each(function() {
                                    aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                                    aHtml.push('<a href="'+this.link_product_list+'" class="cate" cate="'+this.param+'" ">'+this.name+'<span class="open"></span></a>'); // 하위분류
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

    /* 사이드바 카테고리 */
    $('#aside .side_cate li > a.cate').each(function(e) {
        var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
        if (!iCateNo) return;
        methods.show(this.parentNode, iCateNo);
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
