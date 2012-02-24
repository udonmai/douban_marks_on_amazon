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
			var length = isbn.length;
			isbn = isbn.substr(1, length-2);
			break;
			}

			GM_xmlhttpRequest({
				method:		'GET',
				url:		'http://book.douban.com/subject_search?search_text='+isbn,
				headers:	{
							'User-agent':'Mozilla/4.0 (compatible) Greasemonkey',
						},
				onload:		function(res){
								
				}
			});
		}
	else 
		return;
	}
});
