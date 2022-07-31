//获得某个范围内的随机数
function random(min,max){
	return Math.random()*(max-min)+min;
}

//获得当前时间
function nowTime(){
	date=new Date();
	Y=date.getFullYear();
	M=date.getMonth();
	D=date.getDate();
	h=date.getHours();
	m=date.getMinutes();
	if(m<=9){
		m="0"+m;
	}
	s=date.getSeconds();
	if(s<=9){
		s="0"+s;
	}
	now=h+":"+m+":"+s;
	return now;
}

//过滤HTML标签
/*
	text：待处理的文本
	mode：模式，0或default为过滤任何html标签，1为过滤可能有危险的html标签
	*/
	function filterHtmlTag(text,mode){
		var filterResult;
		switch(mode){
			case 0:filterResult=text.replace(/<\/?.+?>/gi, "");break;//js正则过滤所有html标签
			case 1:filterResult=text.replace(/<\/?script[\S\s]*?\1>|<\/?(html|body|meta|style|title|link|base|head|i?frame|frameset|object|applet|embed|input|button|form)[^>]*>/gi, "");break;//js正则过滤存在安全隐患的html标签,|s表示匹配空格、空行等空白符
			default:filterResult=text.replace(/<\/?.+?>/gi, "");break;
		}
		return filterResult;
	}