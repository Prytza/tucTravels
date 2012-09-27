<script>

	var oldData;

	function updateInloggedUsers () {
		
		$.getJSON(url + 'game/getInloggedUsers', function(data) {
			  
			var nothingNewHasHappend = Object.toJSON(oldData) == Object.toJSON(data);
			  
			if (!nothingNewHasHappend) {
			  
				$("div").remove(".inloggedUser");
				  
				$.each(data, function(key, val) {
					
					$.getJSON('http://graph.facebook.com/' + val.facebookID, function(data) {
						
						var img = $("<img />").attr("src", "https://graph.facebook.com/" + val.facebookID + "/picture");
						var linkToMap = $("<a />").attr("href", url + "game/user/" + val.facebookID);
						var name = $("<span />").text(data.name).appendTo(linkToMap);
						var linkToLogout = $("<a />").attr({href: url + "login/quit/" + val.facebookID, alt: "Logga ut", "class": "logoutLink"});
						var X = $("<span />").text("X").appendTo(linkToLogout);
						
						var inloggedUserTextBox = $("<div />").attr("class", "inloggedUserText")
															  .append(linkToMap, linkToLogout);
						
						$("<div />").attr("class", "inloggedUser")
									.append(img, inloggedUserTextBox)
									.appendTo("#sidebarContent");
						
						
						
					});
					
				});
			}
			oldData = data;	
		});
		
		reloader();
		//setTimeout('updateInloggedUsers()', 10000);
	}
	
	function reloader() {
		setTimeout(function(){
			updateInloggedUsers();
		},5000);
	}

	$(function() {
	
		updateInloggedUsers();
		
	});
</script>

  </div> <!--end content-->
  <div id="sidebar">
	<div id="special">
		<div id="sliderButton"></div>
	</div>
	<div id="sidebarContent">
		  <p>Inloggade användare:</p>
	</div>
	
	<!--<img src="https://graph.facebook.com/<?php //echo $this -> fb_login["user"]; ?>/picture">-->