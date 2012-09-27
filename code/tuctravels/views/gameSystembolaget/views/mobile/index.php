<script type="text/javascript">

	function sendUserInfoFromMobile (id, latitude, longitude) {	
		
		$.post(url + 'mobile/sendUserInfoFromMobile', {
			facebookID: id,
			lat: latitude,
			lng: longitude
		}, function (data) {
			// någon nytta av senaste id?
			console.log("lastIsnertId =" + data);
		});
		
	}
	
	function updateUserInfoFromMobile (id, latitude, longitude) {
	
		$.post(url + 'mobile/updateUserInfoFromMobile', {
			facebookID: id,
			lat: latitude,
			lng: longitude
		});
	
	}
	
	$(function () {
		
		var url = document.URL;
		var i = url.indexOf("tuctravels");
		
		url = url.substring(i);
		
		var params = url.split("/");
		
		if (params[3]) {
		
			// koordinater till TUC som default
			latitude = 58.039818;
			longitude = 14.987047;
		
			// defaultvärden skickas till databasen
			sendUserInfoFromMobile(params[3], latitude, longitude);
			
			// om geolocation körs (om användaren tillåter att ange position)
			// defaultvärdena uppdateras med de korrekta koordinaterna.
			navigator.geolocation.getCurrentPosition(GetLocation);
				
		}
		
		
		function GetLocation(location) {
		
			var lat = location.coords.latitude;
			var lng = location.coords.longitude;
			
			updateUserInfoFromMobile(params[3], latitude, longitude);
				
		}
		
		console.log(ua);
		
	});
	
	/*Lägre prio - hämta uppgifter om användarens enhet/operativ och lägg in i databasen*/
	
	var ua = navigator.userAgent;
	var checker = {
	iphone: ua.match(/(iPhone|iPod|iPad)/),
	blackberry: ua.match(/BlackBerry/),
	android: ua.match(/Android/)
	};
	if (checker.android) {
	//code for Android
	}
	else if (checker.iphone) {
	//code for iOS device
	}
	else if (checker. blackberry) {
	//code for BlackBerry
	}
	else{
		//console.log(ua);

		
	}
	
</script>

<?php if (isset($this ->fb_login["user"]) && $this ->fb_login["user"] != 0) : ?>
     
	<div id="main">
	<p>
	Click to activate:
	</p>
	</div>

	<div id="activate">
	<form method="post" id="ajax">
	<input id="up" type="hidden" name="up">
	<input id="down" type="hidden" name="down">
	<input id="left" type="hidden" name="left">
	<input id="right" type="hidden" name="right">
	</form>
	</div>
	
	<div>
		<a href="<?php echo $this -> fb_login["logoutUrl"]; ?>"><h2>Logout</h2></a>
	</div>

	<script type="text/javascript" src="<?php echo URL; ?>public/js/orientation.js">
	</script>
	<script type="text/javascript" src="<?php echo URL; ?>public/js/add2home.js">
	</script>
	 
<?php else: ?>

	<div class="game_choice_frame">
		<a href="<?php echo $this -> fb_login["loginUrl"]; ?>"><h2>Login with Facebook</h2></a>
	</div>

<?php endif ?>




