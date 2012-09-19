$(function () {

	getLocation();
	//initialize();
	
	document.onkeydown = function(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
				leftArrowPressed(evt);
				break;
			case 38:
				upArrowPressed(evt);
				break;
			case 39:
				rightArrowPressed(evt);
				break;
			case 40:
				downArrowPressed(evt);
				break;	
		}
	};


});

/*
	var mobilLat;
	var mobilLng; 
	var latStart; 
	var lngStart;
*/
	
	var mobilLat = 58.039818;
	var mobilLng = 14.987047; 
	
	//var latStart; //58.039818;//dessa koordinater ska vara dynamiska, 
	//var lngStart; //14.987047;
	
	var latStart = mobilLat; 
	var lngStart = mobilLng;

	/*	
	Systemet i link�ping
	58.4105226, 15.6271606
	*/
	var latEnd= 58.4105226;
	var lngEnd= 15.6271606;

	var foundStores = []; // �nskade uppgifter om butiker

		
	/*
//	Koordinats Golden Thai
	var latEnd = 58.035609;
	var lngEnd = 14.976296;
	
	sk�ggetorp
	58.4354436, 15.5882945

	var latEnd= 58.4354436;
	var lngEnd= 15.5882945;
*/	
	var texten = "jag har inget att s�ga...";
	//avst�nd mellan varje zon
	
	function getLocation(){

		if (navigator.geolocation){//om det finns ett v�rde i navigator.geolocation

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
		
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		
		/*H�mtar uppgifter fr�n systembevakningsagentens API*/
		
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
			
			/*N�r uppgifterna �r h�mtade -> skriv ut kartan*/
			var myLatlng = new google.maps.LatLng(latitude, longitude);
			//printMap(myLatlng, "map_canvas");
			initialize();
		});
	//}
	
		
	//	initialize();

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
		var the_stores_logo = 'localhost/php/integration/gitTucTravel/tucTravels/code/mvc/public/js/helkoptercopy.png';
		var points_where_you_are = 'lean.gif';
		
		/*Loopa f�r att placera ut alla butiker*/
		for (var i = 0; i < foundStores.length; i++) {
			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			setMarkers(map, theStoresLocation, foundStores[i].address, the_stores_logo, foundStores[i].id);
			
		}
		
		//setMarkers(map, yourPosition, "H�r �r du!", points_where_you_are);
	
	};
/*
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
		
		/*Loopa f�r att placera ut alla butiker*/
		/*for (var i = 0; i < foundStores.length; i++) {
			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			setMarkers(map, theStoresLocation, foundStores[i].address, the_stores_logo, foundStores[i].id);
		}
		setMarkers(map, yourPosition, "H�r �r du!", points_where_you_are);
	}
	*/
	
	
	/*S�tt ut mark�rer enligt koordinaterna*/
	function setMarkers (map, storeCoords, place, img, storeID = null) {	
	
		var marker = new google.maps.Marker({
			position: storeCoords,
			title: place,
			//icon: img
		});
			
				//alert("hej");

		/*L�gg till markering till kartan*/
		marker.setMap(map);
		
		/*Det som ska h�nda n�r du klickar p� en ikon*/
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
		moveMap();
	};		

	function upArrowPressed(event){
	//alert("up");		
		event.preventDefault();	
		mobilLat = mobilLat + 0.0001;
		moveMap();
	};		

	function downArrowPressed(event){
	//alert("down");		
		event.preventDefault();	
		mobilLat = mobilLat - 0.0001;
		moveMap();
	};		
	
	function getText(zon){
		
	//avst�nd mellan varje zon, 0.00068(lat/lng) och 0.000196(lat/lng) �r ca 70 meter
		//var changeTextLat = (latStart - latEnd) / 4;
		//var changeTextLng = (lngStart - lngEnd) / 4;	
	
	//	if(changeTextLng < 0){
	//		alert("mindre �n noll...");
	//	}
	
	//	alert(changeTextLat);
	//	alert(changeTextLng);
	
		var zonCoord1 = latEnd + (0.00196 * zon);
		var zonCoord2 = latEnd - (0.00196 * zon);
		var zonCoord3 = lngEnd + (0.0068 * zon);
		var zonCoord4 = lngEnd - (0.0068 * zon);
		
		if( mobilLat < zonCoord1 && mobilLng < zonCoord3 && mobilLat > zonCoord2 && mobilLng > zonCoord4 ){
			
//					writeText(zon);
	
//					alert("!! "+ zonCoord1);
//				}
		
//			}else{
		
//				if( mobilLat > zonCoord1 && mobilLng > zonCoord3 && mobilLat < zonCoord2 && mobilLng < zonCoord4 ){
	
//					writeText(zon);
	
//					alert("!! "+ zonCoord1);
//				}
	
//		}
	
	
//		function writeText(zon){
	
			if(zon == 4){
			
				texten = "Det �r en bit kvar";
			
			}else if(zon == 3){
				
				texten = "Ungef�r halvv�gs..";
			
			}else if(zon == 2){
				
				texten = "Ganska n�ra nu.";
			
			}else if(zon == 1){
				
				texten = "Det b�rjar br�nnas!";
				
			}else if(zon == 0.167){
										
				texten = "<strong style='color:#ff6633;'><strong>H�rligt, du klarade det!!</strong>";
	
			}else{
			
				texten = "Ooups! Du �r ganska l�ngt ifr�n...";
	
			}
		
	
		}
		return texten;
	};	


	function moveMap(){	
	
	//alert(2);
		texten = getText(4);
		texten = getText(3);
		texten = getText(2);
		texten = getText(1);
		texten = getText(0.167);
	
		document.getElementById('message').innerHTML = texten;
	
		var latLng = new google.maps.LatLng(mobilLat, mobilLng);
		
		map.panTo(latLng);
	
	};