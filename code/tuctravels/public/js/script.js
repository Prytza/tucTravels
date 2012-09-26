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
});