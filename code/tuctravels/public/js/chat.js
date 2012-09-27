// JavaScript Document

$(function () {

	update();
	
	$("#ajax").submit(

	function(e) {
		$.ajax({
			type: "POST",
			url: url + "chat/post",
			data: $(e.target).serialize(),
			dataType: "json",
		});
		
		$('#ruta').val('');
		return false;
	});
		
});

function update()
{
	$.post(url + "chat/loop", {}, function(data){	
		$('#chattruta').html(data);	
	});
	setTimeout('update()', 1000);
}
