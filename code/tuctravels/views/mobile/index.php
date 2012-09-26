<script type="text/javascript">

	function sendUserInfoFromMobile (id, latitude, longitude) {
	
		$.post('../../sendUserInfoFromMobile', {
			facebookID: id,
			lat: latitude,
			lng: longitude
		}, function(data) {
		  //console.log(data);
		});	
		
	}
	
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
	
	var lat;
	var lng;
	
	navigator.geolocation.getCurrentPosition(GetLocation);
	
	function GetLocation(location) {
			lat = location.coords.latitude;
			lng = location.coords.longitude;
			//alert(location.coords.accuracy);
	}

	$(function () {
		
		var url = document.URL;
		var i = url.indexOf("tuctravels");
		url = url.substring(i);
		
		var params = url.split("/");
		
		alert("WTF!? Varför ska jag behöva köra en alert\nför att det ska fungera? " + lat);
		
		if (params[3]) {
			if (lat && lng) {				
				sendUserInfoFromMobile(params[3], lat, lng);
			}
		}
		else {
			//alert("Du är inte inloggad");
		}
		
		console.log(ua);
		
	});
	
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




