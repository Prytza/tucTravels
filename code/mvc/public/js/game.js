$(function () {
	
	getLocation();
	
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
	var leftKey, upKey, rightKey, downKey=false;
	
//	var mobilLat;
//	var mobilLng; 
	var latStart; 
	var lngStart;
	var map;

	var mobilLat = 58.039818;
	var mobilLng = 14.987047; 
/*	
	//var latStart; //58.039818;//dessa koordinater ska vara dynamiska, 
	//var lngStart; //14.987047;
	
	var latStart = mobilLat; 
	var lngStart = mobilLng;
*/
	/*	
	Systemet i linköping
	58.4105226, 15.6271606
	*/
/*	var latEnd= 58.4105226;
	var lngEnd= 15.6271606;
*/
//	var foundStores = []; // önskade uppgifter om butiker
		
	
//	Koordinats Golden Thai
	var latEnd = 58.035609;
	var lngEnd = 14.976296;
	/*
	skäggetorp
	58.4354436, 15.5882945

	var latEnd= 58.4354436;
	var lngEnd= 15.5882945;
*/	
	var texten = "hmm...";
	//avstånd mellan varje zon
	
	function getLocation(){

		if (navigator.geolocation){//om det finns ett värde i navigator.geolocation

			navigator.geolocation.getCurrentPosition(showPosition);

//			}else{
	
//				x.innerHTML="Geolocation is not supported by this browser.";
		
		}
	}

	function showPosition(position){

		mobilLat = position.coords.latitude;
		mobilLng = position.coords.longitude;
	
		latStart = mobilLat; 
		lngStart = mobilLng;
/*
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
	*/	
		/*Hämtar uppgifter från systembevakningsagentens API*/
		/*
		$.getJSON("http://agent.nocrew.org/api/json/1.0/searchStore.json?callback=?", {
			"lat": latitude,
			"lng": longitude,
			"dist_km": "5",
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
			*/
			/*När uppgifterna är hämtade -> skriv ut kartan*/
			/*
			var myLatlng = new google.maps.LatLng(latitude, longitude);
			//printMap(myLatlng, "map_canvas");
		});
*/
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
/*
		var the_stores_logo = 'localhost/php/integration/gitTucTravel/tucTravels/code/mvc/public/js/helkoptercopy.png';
		var points_where_you_are = 'lean.gif';
		
		var dist=500;
	*/	
		/*Loopa för att placera ut alla butiker*/
/*		for (var i = 0; i < foundStores.length; i++) {
			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			setMarkers(map, theStoresLocation, foundStores[i].address, the_stores_logo, foundStores[i].id);

			if(dist > foundStores[i].dist_km){
				//alert(foundStores[i].dist_km);
				dist = foundStores[i].dist_km;
				latEnd = foundStores[i].lat;
				lngEnd = foundStores[i].lng;
				alert(foundStores[i].lat + " --> latEnd var latEnd= 58.4105226;");
				alert(foundStores[i].lng + " --> lngEnd var lngEnd= 15.6271606;");

			}	
				
		}
		
		//setMarkers(map, yourPosition, "Här är du!", points_where_you_are);
	*/
	};

	function printMap (yourPosition, mapContainer) {
			
		var mapOptions = {
			zoom: 10,
			center: yourPosition,
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
		}
		
		var map = new google.maps.Map(document.getElementById(mapContainer), mapOptions);
		
		/*markeringsikoner*/
		/*
		var the_stores_logo = 'helkoptercopy.png'
		var points_where_you_are = 'helkoptercopy.png'
		
		/*Loopa för att placera ut alla butiker*/
		/*for (var i = 0; i < foundStores.length; i++) {
			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			setMarkers(map, theStoresLocation, foundStores[i].address, the_stores_logo, foundStores[i].id);
		}
		setMarkers(map, yourPosition, "Här är du!", points_where_you_are);
	*/
	};	
	
	
	/*Sätt ut markörer enligt koordinaterna*/
	function setMarkers (map, storeCoords, place, img, storeID = null) {	
	
		var marker = new google.maps.Marker({
			position: storeCoords,
			title: place,
			//icon: img
		});
			
		/*Lägg till markering till kartan*/
		marker.setMap(map);
	
	}
	
	function arrowPressed(event,keyNumber){
	
		event.preventDefault();	
	
		if(leftKey){//left
			mobilLng = mobilLng - moveDistans;
		}
	
		if(downKey){//down
			mobilLat = mobilLat - moveDistans;
		}
		if(upKey){//up
			mobilLat = mobilLat + moveDistans;
		}
		if(rightKey){//right
			mobilLng = mobilLng + moveDistans;	
		}
		
		moveMap();	
		
	};
	
	function getText(zon){
		
		//var floor = Math.floor; floor(latEnd)

		var zonCoordOne   = latEnd + ( 0.001 * zon);//öster om
		var zonCoordTwo   = latEnd - ( 0.001 * zon);//väster om
		var zonCoordThree = lngEnd + ( 0.001 * zon);//norr om
		var zonCoordFour  = lngEnd - ( 0.001 * zon);//söder om
	

		if( mobilLat < zonCoordOne &&  mobilLat > zonCoordTwo && mobilLng < zonCoordThree && mobilLng > zonCoordFour ){
			
	
			if(zon == 4){
			
				texten = "Det är en bit kvar";
			
			}else if(zon == 3){
				
				texten = "Ungefär halvvägs..";
			
			}else if(zon == 2){
				
				texten = "Ganska nära nu.";
			
			}else if(zon == 1){
				
				texten = "Det börjar brännas!";
				
			}else if(zon == 0.167){
										
				texten = "<strong style='color:#ff6633;'><strong>Härligt, du klarade det!!</strong>";
	
			}else{
			
				texten = "Ooups! Du är ganska långt ifrån...";
	
			}		
	
		}
		return texten;
	};	


	function moveMap(){	
	
		texten = getText(4);
		texten = getText(3);
		texten = getText(2);
		texten = getText(1);
		texten = getText(0.167);
	
		document.getElementById('message').innerHTML = texten;
	
		var latLng = new google.maps.LatLng(mobilLat, mobilLng);
		
		map.panTo(latLng);
	
	};