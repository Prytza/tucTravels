$(function () {

	$.getJSON("game/getDirections", function (data) {
		console.log(data);
	});

	getLocation();
	//initialize();
	
	var helikopter = $("#helikopter");
	helikopter.css("zIndex", 10);
	
	document.onkeydown = function(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
				//arrowPressed(evt,37);
				leftArrowPressed(evt);
				break;
			case 38:
				//arrowPressed(evt,38);
				upArrowPressed(evt);
				break;
			case 39:
				//arrowPressed(evt,39);
				rightArrowPressed(evt);
				break;
			case 40:
				//arrowPressed(evt,40);
				downArrowPressed(evt);
				break;
		/*	case 37 && 38:
				arrowPressed(evt,3738);
				break;
			case 38 && 39:
				arrowPressed(evt,3839);
				break;
			case 39 && 40:
				arrowPressed(evt,3940);
				break;
			case 40 && 37:
				arrowPressed(evt,4037);
				break;		
		*/
		}
	};

});

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

		//alert(22222);

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
			
				//alert("hej");

		/*Lägg till markering till kartan*/
		marker.setMap(map);
		
		/*Det som ska hända när du klickar på en ikon*/
	/*	google.maps.event.addListener(marker, "click", function() {
			if (storeID) {
				alert(storeID);
				b = new Beer();
				var listOfBeers = b.getBeers(storeID);
				console.log(listOfBeers);
			}
		});
		*/
	}
	/*
	function arrowPressed(evt,keyNumber){
		event.preventDefault();	
		//alert("all");		
		if(keyNumber==37){
			mobilLng = mobilLng - 0.0001;
		}else if(keyNumber==40){
			mobilLat = mobilLat - 0.0001;
		}else if(keyNumber==38){
			mobilLat = mobilLat + 0.0001;
		}else if(keyNumber==39){
			mobilLng = mobilLng + 0.0001;
		}else if(keyNumber==3738){
			mobilLng = mobilLng - 0.00005;
			mobilLat = mobilLat + 0.00005;
		}else if(keyNumber==3839){
			mobilLat = mobilLat + 0.00005;
			mobilLng = mobilLng	+ 0.00005;
		}else if(keyNumber==3940){
			mobilLat = mobilLat - 0.00005;
			mobilLng = mobilLng + 0.00005;
		}else if(keyNumber==4037){
			mobilLat = mobilLat - 0.00005;
			mobilLng = mobilLng + 0.00005;
		}
		
		moveMap();	
		
	}
	*/
	function leftArrowPressed(event){
		event.preventDefault();	
		//alert("left");		
		
		mobilLng = mobilLng - 0.0001;
		moveMap();
	};		

	function rightArrowPressed(event){

		//alert("right");		
		event.preventDefault();	
		mobilLng = mobilLng + 0.0001;
	//	alert(mobilLng);
		moveMap();
	};		

	function upArrowPressed(event){
	//alert("up");		
		event.preventDefault();	
		mobilLat = mobilLat + 0.0001;
	//	alert(mobilLat);
		moveMap();
	};		

	function downArrowPressed(event){
	//alert("down");		
		event.preventDefault();	
		mobilLat = mobilLat - 0.0001;
		moveMap();
	};		
	
	function getText(zon){
		
		var floor = Math.floor;

		var zonCoordOne = floor(latEnd)+ (0.0196 * zon);//öster om
		var zonCoordTwo = latEnd - (0.0196 * zon);//väster om
		var zonCoordThree = floor(lngEnd)+ (0.0068 * zon);//norr om
		var zonCoordFour = lngEnd - (0.0068 * zon);//söder om
	
	/*	alert("mobilLat " + mobilLat +
			 " mobilLng " + mobilLng + 
			 " zonCoordOne " + zonCoordOne + 
			 " zonCoordTwo " + zonCoordTwo 	+ 
			 " zonCoordThree "+ zonCoordThree +  
			 " zonCoordFour" + zonCoordFour 
		);
	*/
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