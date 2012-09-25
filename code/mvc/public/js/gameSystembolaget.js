﻿$(function () {
	
	getLocation();
	//getMobilMove();
	//http://integration.henryandersson.se/tuctravels/mobile

	var helikopter = $("#helikopter");
	helikopter.css("zIndex", 10);
	
	document.onkeydown = function(evt) {
		evt = evt || window.event;

		switch (evt.keyCode) {
			case left:
				leftKey=true;
				arrowPressed(evt,left);
				break;
			case up:
				upKey=true;
				arrowPressed(evt,up);
				break;
			case right:
				rightKey=true;
				arrowPressed(evt,right);
				break;
			case down:
				downKey=true;
				arrowPressed(evt,down);
				break;
		}
		
	};

	document.onkeyup = function(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case left:
				leftKey=false;
				break;
			case up:
				upKey=false;
				break;
			case right:
				rightKey=false;
				break;
			case down:
				downKey=false;
				break;
		}

	};
		
});

	var left  = 37;
	var up    = 38;
	var right = 39;
	var down  = 40;
	
	var moveDistans = 0.0001;

	//avstånd mellan varje zon
	var zonDistans = 0.001;
	var leftKey, upKey, rightKey, downKey=false;

	var mobilLat;
	var mobilLng; 

	var map;
	var image;

	var foundStores = []; // önskade uppgifter om butiker
	
	var latEnd;
	var lngEnd;

	var text = "hmm...";
	
	function getMobilMove(){
		$.getJSON("game/getDirections", function (data) {
			console.log(data);
			$.each(data,function(i, post){
					//för varje inlägg skriver den ut en div
				leftKey  = mobilMove(post.left);
				upKey    = mobilMove(post.up);
				rightKey = mobilMove(post.right);
				downKey  = mobilMove(post.down);
				
			});
			
		});

		setTimeout(getMessage,200);//kör funktionen getMessage varje 

	};

	function mobilMove(status){
					
		if(status==1){
			return true;
		}else{
			return false;
		}
				
	};
					
	
	// function getLocation(){
	
		// if (navigator.geolocation){//om det finns ett värde i navigator.geolocation

			// navigator.geolocation.getCurrentPosition(showPosition);

// //			}else{
	
// //				x.innerHTML="Geolocation is not supported by this browser.";
		
		// }
	// };

	function showPosition(position){

		mobilLat = parseFloat(position.coords.latitude);
		mobilLng = parseFloat(position.coords.longitude);
		
		latStart = mobilLat; 
		lngStart = mobilLng;

		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
	
		/*Hämtar uppgifter från systembevakningsagentens API*/

		$.getJSON("http://agent.nocrew.org/api/json/1.0/searchStore.json?callback=?", {
			"lat": latitude,
			"lng": longitude,
			"dist_km": "7",
			"limit" : "3"
		}, function (data) {
			
			$.each(data.items, function (key, value) {
			
				foundStores[key] = [];
		
				foundStores[key]["id"] = value.id;
				foundStores[key]["sysid"] = value.sysid;
				foundStores[key]["lat"] = value.lat;
				foundStores[key]["lng"] = value.lng;
				foundStores[key]["address"] = value.address;
				foundStores[key]["city"] = value.city;
				foundStores[key]["dist_km"] = value.dist_km;	
				
			});
			
			console.log(foundStores);

			/*När uppgifterna är hämtade -> skriv ut kartan*/
			
			var myLatlng = new google.maps.LatLng(latitude, longitude);
			//printMap(myLatlng, "map_canvas");
		});
		
		initialize();
	
	};
	
	//skapar kartan
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(latStart, lngStart),
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
		/*markeringsikoner*/

	//	var the_stores_logo = 'http://localhost/php/integration/gitTucTravel/tucTravels/code/mvc/public/images/logo_systembolaget.png';
	//	var points_where_you_are = 'lean.gif';
		
		var dist=500;
		
//både zonerna och markeringen fungerar inte utan alerten!!??		
alert('lycka till på spelet');

		/*Loopa för att placera ut alla butiker*/
		for (var i = 0; i < foundStores.length; i++) {
			
			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			//setMarkers(map, theStoresLocation, foundStores[i].address, the_stores_logo, foundStores[i].id);
			setMarkers(map, theStoresLocation, foundStores[i].address, foundStores[i].id);

			if(dist > foundStores[i].dist_km){
				dist = foundStores[i].dist_km;
				latEnd = parseFloat(foundStores[i].lat);
				lngEnd = parseFloat(foundStores[i].lng);
			}	
				
		}
		
	};
	
	/*Sätt ut markörer enligt koordinaterna*/
	//function setMarkers (map, storeCoords, place, img, storeID = null) {	
	
	// function setMarkers (map, storeCoords, place, storeID = null) {	
	
		// var marker = new google.maps.Marker({
			// position: storeCoords,
			// title: place,
			// //icon: img
		// });
			
		// /*Lägg till markering till kartan*/
		// marker.setMap(map);
	
	// }

	// function arrowPressed(event,keyNumber){
	
		// event.preventDefault();	
	
		// if(leftKey){//left
			// mobilLng = mobilLng - moveDistans;
		// }
	
		// if(downKey){//down
			// mobilLat = mobilLat - moveDistans;
		// }
		// if(upKey){//up
			// mobilLat = mobilLat + moveDistans;
		// }
		// if(rightKey){//right
			// mobilLng = mobilLng + moveDistans;	
		// }
		
		// getImage();
		// moveMap();

	// }
	
	
	// function getImage(){
		
		// if(leftKey && upKey){
			// image="leftup";
		// }else if(leftKey && downKey){
			// image="leftdown";
		// }else if(rightKey && upKey){
			// image="rightup";
		// }else if(rightKey && downKey){
			// image="rightdown";
		// }else if(leftKey){
			// image="left";
		// }else if(rightKey){
			// image="right";
		// }else if(upKey){
			// image="up";
		// }else if(downKey){
			// image="down";
		// }
		
		// //sätta rätt namn på bilden i urlen 
		// //document.getElementById("helikopter").src="<?php echo URL; ?>public/images/"+ image + "Arrow.gif";
		// document.getElementById("helikopter").src="http://localhost/php/integration/gitTucTravel/tucTravels/code/mvc/public/images/" + image + ".gif";

	// }
	
	
	// function getText(zon){		

		// var zonCoordOne   = parseFloat(latEnd + ( zonDistans * zon));//öster om
		// var zonCoordTwo   = parseFloat(latEnd - ( zonDistans * zon));//väster om
		// var zonCoordThree = parseFloat(lngEnd + ( zonDistans * zon));//norr om
		// var zonCoordFour  = parseFloat(lngEnd - ( zonDistans * zon));//söder om
		
		// if( mobilLat < zonCoordOne &&  mobilLat > zonCoordTwo && mobilLng < zonCoordThree && mobilLng > zonCoordFour ){
	
			// if(zon == 4){
				// text = "Zon 4 en bit kvar";
			
			// }else if(zon == 3){
				
				// text = "Zon 3";
			
			// }else if(zon == 2){
				
				// text = " Zon 2 ";
			
			// }else if(zon == 1){
				
				// text = "Zon 1 ";
				
			// }else if(zon == 0.167){
										
				// text = "<strong style='color:#ff6633;'><strong>Nice, du klarade det!!</strong>";
	
			// }	
	
		// }		
		
		// return text;
	// };	


	// function moveMap(){	
	
		// text = getText(4);
		// text = getText(3);
		// text = getText(2);
		// text = getText(1);
		// text = getText(0.167);
	
		// document.getElementById('message').innerHTML = text;
	
		// var latLng = new google.maps.LatLng(mobilLat, mobilLng);
		
		// map.panTo(latLng);
	
	// };