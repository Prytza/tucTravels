	var url = document.URL;
	var i = url.indexOf("tuctravels");
	
	url = url.substring(0, i+11);

$(document).ready( function () {
	
	/* Meny */
	$('#header').css('top', -60);
	
	var top = 0;
	
	$('#header').click(function(){	
		if($('#header').css('top') == "0px"){
			top = -60;
		}else{
			top = 0;	
		}
		$(this).animate({top: top});	
	});
	$('#drag_icon').click(function(){	
		if($('#header').css('top') == "0px"){
			top = -60;
		}else{
			top = 0;	
		}
		$(this).animate({top: top});	
	});
	
	$('#sidebar').css('right', -300);
	
	$('#sidebar').click(function(){	
		if($(this).css('right') == "0px"){
			right = -300;
		}else{
			right = 0;	
		}
		$(this).animate({right: right});	
	});
});