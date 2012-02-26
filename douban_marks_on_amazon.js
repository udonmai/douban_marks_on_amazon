// ==UserScript==
// @name			douban_marks_on_amazon
// @namespace			douban_marks_on_amazon
// @version			0.1
// @include			http://www.amazon.cn/*
// author			udonmai@gmail.com
// 2012-02-22			inition
// 2012-02-25			Thanks to wong2
// ==/UserScript==

var $ = function(selector){
	return document.querySelectorAll(selector);
}

!function(){
	var nav = $('.navCat a.navCatA')[0].text;
	if(nav !== "图书") {
		return;
	}

	var isbn = "";

	var infos = $("div.content b");
	//遍历目标节点获取isbn
	for (var i = 0; i <= 10; i++) {
		var info = infos[i];
		if (info.textContent == "ISBN:") {
			isbn = info.nextSibling.data;
			isbn = isbn.split(",")[0].substring(1);
			break;
		}
	}

	GM_xmlhttpRequest({
		method:	'GET',
		url:	'http://api.douban.com/book/subject/isbn' + isbn + '?alt=json',
		onload:	function(res) {
			var rejson = JSON.parse(res.responseText);
			
			var numRater = rejson['gd:rating']['@numRaters'];
			var average = rejson['gd:rating']['@average'];
			var link = rejson['link'][1]['@href'];
			var emp = $('.buying')[2];
			
			var pos;
			if(average < 1) pos = -151;
			else if(average >=1 && average < 2) pos = -136;
			else if(average >=2 && average < 3) pos = -121;
			else if(average >=3 && average < 4) pos = -106;
			else if(average >=4 && average < 5) pos = -91;
			else if(average >=5 && average < 6) pos = -76;
			else if(average >=6 && average < 7) pos = -61;
			else if(average >=7 && average < 8) pos = -46;
			else if(average >=8 && average < 9) pos = -31;
			else if(average >=9 && average < 10) pos = -16;
			else if(average = 10) pos = -1;

			var htmlstr = document.createElement("span");
			htmlstr.innerHTML =  "&nbsp|&nbsp<span style='color:#0C7823; font-weight:700;'>豆瓣</span>评分:<span style='background-image:url(http://img3.douban.com/pics/all_bigstars.gif); background-repeat:no-repeat; background-position:0 "+ pos +"; width:75px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>";
			
			if(numRaters < 10) htmlstr.innerHTML += "<span>&nbsp少于10人评价&nbsp<a href='"+ link +"'>链接</a></span>";
			else htmlstr.innerHTML += "<span>"+ average +"&nbsp("+ numRaters +"人评价)&nbsp<a href='"+ link +"'>链接</a></span>";
			
			emp.appendChild(htmlstr);
			}
	});
}();
