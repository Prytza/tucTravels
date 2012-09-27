$(function () {
	
	getLocation();

	getCoords();
	
	document.onkeydown = function(evt) {
		
		startTimer=true;
		keyStatusDown(evt);		
			
	};
	
	document.onkeyup = function(evt) {

		keyStatusUp(evt);

	};
	//console.log(startTimer);
	//if(startTimer){
		CreateTimer("timer", 30);
//	}
	
		
});

//------ Varibler start ------///

	//pilarnas värde
	var left  = 37;
	var up    = 38;
	var right = 39;
	var down  = 40;
	
	//avståndet som sker per knapptryckning
	var moveDistans = 0.0001;

	//avstånd mellan varje zon
	var zonDistans = 0.001;
	//sätter varje pil knapp till false
	var leftKey, upKey, rightKey, downKey=false;
	
	//helekopterns posistioner
	var mobilLat;
	var mobilLng; 

	var map;
	var image='down';
	
	//systembolaget/ns värde/n
	var foundStores = []; // önskade uppgifter om butiker
	
	//slutmålet för helekoptern
	var latEnd;
	var lngEnd;

	//texten vid helekoptern	
	var text = "hmm...";
	
	//sätts till false vid avklarad uppgift
	var getDirectionStatus=true;
	
	var startTimer=false;
	var Timer;
	var TotalSeconds;
	
	
	
	//------ Varibler slut ------///
	
	//-------------  FUNKTIONER START ---------------------//

	
//----- hämtar koordinater från skärmens plats ------//
//-- med koordinaterna för systembolagen  -- //	
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
				latEnd = parseFloat(foundStores[i].lat);
				lngEnd = parseFloat(foundStores[i].lng);
			}	
				
		}
		
	};
	
	//------ hämta data från mobil/Ipad databasen ------///
		
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
			
			startTimer=true;
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
