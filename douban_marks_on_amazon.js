// ==UserScript==
// @name		douban_marks_on_amazon
// @namespace	douban_marks_on_amazon v0.1
// @version		0.1
// @include		http://www.amazon.cn/*
// @author		udonmai@gmail.com
// 2012-02-22	inition
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined"){
	var jQuery = unsafeWindow.jQuery;
	var $ = jQuery;
}

$(document).ready(function(){
	if($('.navCat a.navCatA').text() == "图书"){
		//遍历目标节点获取isbn
		for(var i = 0; i <= 10; i ++){
			if($('div.content b')[i].text() == "ISBN:")
			var b = $('div.content li')[i];
			b.find('b').remove();
			var isbn = b.text();
			var re = /\,/;//分割第一个逗号前的第一个isbn号
			isbn = isbn.split(re)[0];
			
			break;
			}

		GM_xmlhttpRequest({
			method:		'GET',
			url:		'http://api.douban.com/book/subject/isbn/'+ json +'?alt=json',
			headers:	{
							'User-agent':'Mozilla/4.0 (compatible) Greasemonkey',
						},
			onload:		function(res){
							rejson = eval('(' + res.responseText + ')');	
							if(rejson){
								var numRator = rejson.gd:rating.@numRator;
								var average = rejson.gd:rating.@average;
								var link = rejson.link[1].@href;

								var pos;
								if(average < 1)
									pos = 0;
								else if(average >=1 && average < 2)
									pos = 1;
								else if(average >=2 && average < 3)
									pos = 2;
								else if(average >=3 && average < 4)
									pos = 3;
								else if(average > 4 && average < 5)
									pos = 4;
								else if(average >=5 && average < 6)
									pos = 5;
								else if(average >=6 && average < 7)
									pos = 6;
								else if(average >=7 && average < 8)
									pos = 7;
								else if(average >=8 && average < 9)
									pos = 8;
								else if(average >=9 && average < 10)
									pos = 9;
								else if(average = 10)
									pos = 10;
							
								htmlstr = "<span>豆瓣评分:<span style='background:url(http://img3.douban.com/pics/all_bigstars.gif) no-repeat 0 0;'>"+ average +"&nbsp"+ numRator +"人评价&nbsp<a href='"+ link +"'>链接</a></span>";
								$('a#productGuarantee').after(htmlstr);
							}
							else	
								return;
						}
			});
		}
	else 
		return;
});
