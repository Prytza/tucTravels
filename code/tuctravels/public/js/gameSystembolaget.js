$(function () {
	
	$.post(url + 'mobile/setCoords', {
			left: 0,
			up: 0,
			right: 0,
			down:0
		}, function(data) {
		  console.log(data);
		});	
	
	

	//hämtar din nuvarande posistion och skriver ut kartan med markeringarna	
	getLocation();
	
	//hämtar rörelserna från telefonen eller Ipaden
	getCoords();
	
	//Nedräkningen på 40 sekunder
	CreateTimer("timer", 40);	
	
	document.onkeydown = function(evt) {
		//när användaren trycker på knappen, ändra status på färdriktning
		keyStatusDown(evt);		
	};
	
	document.onkeyup = function(evt) {
		//ändrar status på knapparna
		keyStatusUp(evt);

	};
		
});
		
//----- hämtar koordinater från skärmens plats ------//
//-- med koordinaterna för systembolagen  -- //

	//helekopterns posistioner
	var mobilLat;
	var mobilLng; 
	
	//systembolaget/ns värde/n
	var foundStores = []; // önskade uppgifter om butiker

	
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
			
			/*När uppgifterna är hämtade -> skriv ut kartan*/
			
			var myLatlng = new google.maps.LatLng(latitude, longitude);
			
			initialize();
			
		});
	
	};
	
	
	//---- skapar kartan ---//
	
	var map;

	//slutmålet för helekoptern
	var latEnd;
	var lngEnd;

	
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(latStart, lngStart),
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		};
		
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
		/*markeringsikoner*/

		var the_stores_logo = 'http://localhost/php/integration/gitTucTravel/tucTravels/code/mvc/public/images/logo_systembolaget.png';
	//	var points_where_you_are = 'lean.gif';
		
		var dist=500;
		
		/*Loopa för att placera ut alla butiker*/
		for (var i = 0; i < foundStores.length; i++) {

			var theStoresLocation = new google.maps.LatLng(foundStores[i].lat, foundStores[i].lng);
			setMarkers(map, theStoresLocation, foundStores[i].address, foundStores[i].id);
			
			if(dist > foundStores[i].dist_km){
				dist = foundStores[i].dist_km;
				//sätter slutmålet på spelet
				latEnd = parseFloat(foundStores[i].lat);
				lngEnd = parseFloat(foundStores[i].lng);
			}	
				
		}
		
	};
	
	//------ hämta data från mobil/Ipad databasen ------///
	
	//sätter varje pil knapp till false
	var leftKey, upKey, rightKey, downKey=false;
	
		
	function getCoords() {
	
		$.getJSON("game/getDirections", function (data) {
					
			leftKey	= mobilMoveStatus(data[0].vast);
			upKey	= mobilMoveStatus(data[0].nord);
			rightKey= mobilMoveStatus(data[0].ost);
			downKey = mobilMoveStatus(data[0].syd);
	
			//stoppar helekoptern vid målet
			if(getDirectionStatus){
				mobilMoved();
			}	
			
		});

		pageReloader();
	}
	
	//ger status på rörelsen på eller av true or false
	function mobilMoveStatus(status){					

		if(status==1){
			return true;
		}else{
			return false;
		}
	
	}
		
	function pageReloader() {
	
		var mobilTimer=	setTimeout(	function(){
			getCoords();
		},200);
	}

//------ hämtar data från mobil/Ipad slut ------///


//-------------  FUNKTIONER SLUT ---------------------//
