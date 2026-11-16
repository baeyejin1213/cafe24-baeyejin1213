/**
 * desc : 전체카테고리 트리구조 출력 및 배너추가
 * auth : esujin morenvy.com
 * date : 2017-04-17
 * copyright @morenvy.com : 저작권있음
 */


$(document).ready(function(){

	// 전체카테고리 html을 만들어서 리턴한다.
    function makeAllHTML( aData, parent_no, depth, classname ) {
		
		var HTML = "";
		var subHTML = "";
		var imgHTML = "";
		var cate_no = "";
		depth++;

		for (index in aData){
			if( aData[index]["parent_cate_no"] == parent_no ) {
				HTML = HTML + "\n<li cate='"+aData[index]["cate_no"]+"'    value='"+aData[index]["cate_no"]+"'   ><a href='"+aData[index]["link_product_list"]+"' "+classname+" >" + aData[index]["name"] +"</a>"; 
				cate_no = aData[index]["cate_no"];                                                                       
				delete aData[index];
				if (aData.length > 0) subHTML = makeAllHTML( aData, cate_no, depth, classname );

				if ( subHTML != "" ) subHTML = "\n<div class='sub uldepth"+depth+"' ><ul class='depth"+depth+"' >"+subHTML+"\n</ul></div><div class='sub_cate_on_arrow'></div><div class='cate_arrow'></div>"; 
 

				HTML = HTML + subHTML + "</li>";
			}
		}
		return HTML;
	}
 	
	//addBanner : 첫번째 인자의 class에 두번째 인자의 (배너)내용을 넣어준다.
	function addBanner( cateSelector,  bannerSelector  ) {
		var com_HTML = "";
		var banObj = new Object();
		$(bannerSelector + " li").each(function( index ) {
			banObj[$( this ).attr("cateno")] = $( this ).html();

			var findLI = $(cateSelector + " li[cate='"+$( this ).attr("cateno")+"']");
			var findDIV = $(cateSelector + " li[cate='"+$( this ).attr("cateno")+"']").find(">div");

            if (findLI.length > 0) { // 배너가 들어갈(해당하는) li 분류가 있는 경우
                 
                //배너영역 추가 가로폭 계산
                var addedW = 0;
                var addedH = 0;
                addedW = $( this ).find(".banarea").outerWidth();
                addedH = $( this ).find(".banarea").outerHeight();
                
                 if (findDIV.length > 0) { // ul중분류가 존재한다면 끝에 붙여넣기
                    //원래 중분류 가로폭 계산
                    var orginalW = findDIV.outerWidth();
                    var orginalH = findDIV.outerHeight();
                    
                    //console.log( findDIV.css("width"));
                    findDIV.css("width",orginalW + addedW);
                    findDIV.css("height", Math.max(orginalH,  addedH));
                    findDIV.append($( this ).html());
                 } else { // ul 중분류가 없다면 새로 만들어 넣어주기
                    var uldep = findLI.parent("ul").attr("class");
                    uldep = parseInt(uldep.replace("depth", ""));
                    findLI.append("<div class='sub uldepth"+(uldep+1)+"' >"+$( this ).html()+"</ul>");

                    findLI.find(".sub").css("width", addedW);
                    findLI.find(".sub").css("height", addedH);
                  }
			}
 		});

 
 	}
 
     
    //원하는 depth까지만 남겨두고 삭제한다. 함수자체를 사용하지 않으면 전체카테고리로 출력한다.
	function removeUnderDepth( htmlSelector,  depth  ) {
        $(htmlSelector).find(".uldepth"+(depth+1)).remove();
        return $(htmlSelector).html();
    }

      var m_method = {
        get: function()
        {
             $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {
                    if (aData == null || aData == 'undefined') return;

                    // 전체카테고리 html을 만들어서 보관한다.
					var morenvyAllHTML = "<ul class='depth1'>"+makeAllHTML( aData, 1, 1, " " )+"</ul>";
					$(".morenvyAllCategory").html( morenvyAllHTML ); 
                    
                    // ★ 상단메뉴 여기서부터
                    //표현할 class에 html을 넣고
					$(".category_list_box").html( morenvyAllHTML ); 
                    //addBanner : 첫번째 인자의 class에 두번째 인자의 내용을 넣어준다.
					addBanner(".category_list_box", ".openCateBannerArea");
                    //원하는 depth까지만 남겨두고 삭제한다. 함수자체를 사용하지 않으면 전체카테고리로 출력한다.
                    removeUnderDepth( ".category_list_box", 5 );
                    
                    // 마우스 오버 아웃
                    $('.category_list_box ul > li').mouseenter(function(e) {
						$(this).find(">div.sub").css("opacity","1");
                        $(this).find(">div.sub").css("visibility","visible");
						$("> a", this).addClass('sub_mouse_hover');
                    }).mouseleave(function(e) {
						$(this).find(">div.sub")
							.css("opacity","0");
						$(this).find(">div.sub").css("visibility","hidden");
						$("> a", this).removeClass('sub_mouse_hover');
                    });   

                    $('.category_list_box .depth1 > li').mouseenter(function(e) {
						$(this).find(".uldepth2").css("top","82px");
						$(this).find(">div.cate_arrow").css("top","76px");
						$(this).find(">div.cate_arrow").css("opacity","1");
                        $(this).find(">div.cate_arrow").css("visibility","visible");
                    }).mouseleave(function(e) {
						$(this).find(".uldepth2").css("top","102px");
						$(this).find(">div.cate_arrow").css("top","96px");
						$(this).find(">div.cate_arrow").css("opacity","0");
						$(this).find(">div.cate_arrow").css("visibility","hidden");
                    });   

                    $('.morenvyAllCategory .depth2 > li , .morenvyAllCategory .depth3 > li').mouseenter(function(e) {
                        $(this).find(">div.sub").css("display","inline");
						$("> a", this).addClass('sub_mouse_hover');
                    }).mouseleave(function(e) {
                      $(this).find(">div.sub").css("display","none");
					  $("> a", this).removeClass('sub_mouse_hover');
                    });     
                    // 상단메뉴 여기까지 ★
                    
					/* morenvy.com 상단 카테고리 소분류 */
					$('.category_list_box .depth2 > li , .morenvyAllCategory .depth2 > li').mouseenter(function(e) {
						$(this).find('> .sub_cate_on_arrow').addClass('rotateon');
					}).mouseleave(function(e) {
						$(this).find('> .sub_cate_on_arrow').removeClass('rotateon');
					});

					/* morenvy.com 상단 카테고리 하위분류 */
					$('.category_list_box .depth3 > li , .morenvyAllCategory .depth3 > li').mouseenter(function(e) {
						$(this).find('> .sub_cate_on_arrow').addClass('rotateon');
					}).mouseleave(function(e) {
						$(this).find('> .sub_cate_on_arrow').removeClass('rotateon');
					});
                    // morenvyAllHTML을 이용하여 전체카테고리 또는 왼쪽메뉴 카테고리를 추가로 더 만들어 사용할 수 있다.
                }

            });
        } 
    };

    m_method.get();
    

	
});

