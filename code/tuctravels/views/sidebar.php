<script>
	$(function() {
	
		$.getJSON(url + 'game/getInloggedUsers', function(data) {

		  $.each(data, function(key, val) {

			$.getJSON('http://graph.facebook.com/' + val.facebookID, function(data) {
				
				var img = $("<img />").attr("src", "https://graph.facebook.com/" + val.facebookID + "/picture");
				var link = $("<a />").attr("href", url + "game/user/" + val.facebookID);
				var name = $("<p />").text(data.name).appendTo(link);

				
				
				$("<div />").append(img, link)
							.appendTo("#sidebarContent");
				
			});
			
		  });

		});
		
	});
</script>

  </div> <!--end content-->
  <div id="sidebar">
	<div id="sidebarContent">
		  sidebar
	</div>
	
	<!--<img src="https://graph.facebook.com/<?php //echo $this -> fb_login["user"]; ?>/picture">-->