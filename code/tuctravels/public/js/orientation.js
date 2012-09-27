
init2();
function init(){
	if(window.DeviceMotionEvent){
		console.log("DeviceMotionEvent supported");
		}else if('listenForDeviceMovement'in window)
		{console.log("DeviceMotionEvent supported [listenForDeviceMovement]");
		}
	}
		
function init2(){
	if((window.DeviceMotionEvent)||('listenForDeviceMovement'in window)){
		window.addEventListener('devicemotion',deviceMotionHandler3,false);
		}else{document.getElementById("dmEvent").innerHTML="Not supported on your device or browser.  Sorry."
		}
	}
		
function deviceMotionHandler3(eventData){
	var acceleration=eventData.accelerationIncludingGravity;
	var rawAcceleration="["+Math.round(acceleration.x)+", "+Math.round(acceleration.y)+", "+Math.round(acceleration.z)+"]";
	var facingUp=-1;
	if(acceleration.z>0){
		facingUp=+1;
		}
		
	var tiltLR=Math.round(((acceleration.x)/9.82)*-90);
	var tiltFB=Math.round(((acceleration.y+9.81)/9.81)*90*facingUp);
	
	var up;
	var down;
	var left;
	var right;
	
	if(tiltFB <= -35){
		up = 1;
		if(tiltFB <= -80){
		up = 2;	
		}
	}else{
		up = 0;	
	}
	if(tiltFB >= 1){
		down = 1;
		
	}else{
		down = 0;
	}	
	if(tiltLR >= 25){
		left = 1;
	}else{
		left = 0;
	}
	if(tiltLR <= -25){
		right = 1;
	}else{
		right = 0;
	}
	
	$('#up').val(up);
	$('#down').val(down);
	$('#left').val(left);
	$('#right').val(right);
}

	var url = document.URL;
	var i = url.indexOf("tuctravels");
	url = url.substring(0, i+11);
	console.log(url);

$("#ajax").submit(function(e) {
	$.ajax({
		type: "POST",
		url: url + "mobile/setCoords",
		data: $(e.target).serialize(),
		dataType: "json",
	});
	return false;
});

var timer;

function autosubmit()
{
    $('#ajax').trigger('submit');
    timer = setTimeout('autosubmit()', 1000); // anpassa frekvens..
}

$(document).ready(function(e) {

	
	var imgUrlPath = url + "public/images/";
	var active = false;
	
	
	$('#activate').click(function(){
		if (!active) {
			autosubmit();
			$(this).css('background', 'url(' + imgUrlPath +'deactivate.png)');
			$("#activateText").text("Activated");
			active = true;
		}
		else {
			clearTimeout(timer);
			$(this).css('background', 'url(' + imgUrlPath +'activate.png)');
			$("#activateText").text("Click to activate");
			active = false;
		}
	});
	
	var uri = document.URL;
	var i = uri.indexOf("tuctravels");
	
	uri = uri.substring(i);
	
	var params = uri.split("/");
	
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
	
	//sätter utloggnings url.
	$("#fb_logout_mobile_view").attr("href", url + "login/quit/" + params[3]);

});

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
