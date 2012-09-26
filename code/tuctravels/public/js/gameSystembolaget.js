$(function () {
	
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
		//alert('key>>' + key);
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
			alert('här i showpos rfunction data ' + foundStores.length);//3
		});
		alert('här i showpos ' + foundStores.length);//0
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

		var the_stores_logo = 'http://localhost/php/integration/gitTucTravel/tucTravels/code/mvc/public/images/logo_systembolaget.png';
	//	var points_where_you_are = 'lean.gif';
		
		var dist=500;
		
//både zonerna och markeringen fungerar inte utan alerten!!??		
//alert('lycka till på spelet');
alert('här i init' + foundStores.length); //3

		/*Loopa för att placera ut alla butiker*/
		for (var i = 0; i <= foundStores.length; i++) {
alert('här i init i forloopen ' + foundStores.length);//3
			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			//setMarkers(map, theStoresLocation, foundStores[i].address, the_stores_logo, foundStores[i].id);
			setMarkers(map, theStoresLocation, foundStores[i].address, foundStores[i].id);

			
			if(dist > foundStores[i].dist_km){
alert('här inne' +foundStores[i].dist_km);//3,69
			dist = foundStores[i].dist_km;
				latEnd = parseFloat(foundStores[i].lat);
				lngEnd = parseFloat(foundStores[i].lng);
			}	
				
		}
		
	};
	
	
	//-------------  FUNKTIONER  ---------------------//

	//------ Henrys kod start ------///
		
	function getCoords() {
	
		$.getJSON("game/getDirections", function (data) {
		 console.log(data[0].mobileID);
	
		$("#nord").text(data[0].nord);
		$("#syd").text(data[0].syd);
		$("#vast").text(data[0].vast);
		$("#ost").text(data[0].ost);
		
		leftKey	= mobilMove(data[0].nord);
		upKey	= mobilMove(data[0].syd);
		rightKey= mobilMove(data[0].vast);
		downKey = mobilMove(data[0].ost);
		
//alert(leftKey + ' ' + upKey + ' ' + rightKey + ' ' + downKey);
		
		});
		pageReloader();
	}

	function pageReloader() {
		var mobilTimer=	setTimeout(	function(){
										getCoords();
									},200);
	}

//------ Henrys kod slut ------///
