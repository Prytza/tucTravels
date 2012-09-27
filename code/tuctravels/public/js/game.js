$(function () {

	getLocation();
	
	getCoords();
		
	document.onkeydown = function(evt) {
	
		 keyStatusDown(evt);

	};

	document.onkeyup = function(evt) {
	
		keyStatusUp(evt);
	
	};

});


//------ Varibler start ------///

	var left = 37;
	var up = 38;
	var right = 39;
	var down = 40;

	var moveDistans = 0.0001;
		//avstånd mellan varje zon
	var zonDistans = 0.001;
	var leftKey=false;
	var	upKey=false;
	var rightKey=false;
	var downKey=false;
	
	var latStart; 
	var lngStart;
	var map;
	var image='down';

	var mobilLat = 58.039818;
	var mobilLng = 14.987047; 

	//	Koordinats Golden Thai
	var latEnd = 58.035609;
	var lngEnd = 14.976296;
	
	var text = "hmm...";
	var getDirektionStatus=true;
	
	//om man valt att styta med mobilen

//------ Varibler slut ------///

//-------------  FUNKTIONER  ---------------------//

	//------ hämta data från mobil/Ipad databasen ------///
		
	function getCoords() {
	
		$.getJSON(url + "game/getDirections", function (data) {
	
			leftKey	= mobilMoveStatus(data[0].vast);
			upKey	= mobilMoveStatus(data[0].nord);
			rightKey= mobilMoveStatus(data[0].ost);
			downKey = mobilMoveStatus(data[0].syd);
	
			//stoppar helekoptern vid målet
			if(getDirektionStatus){
				
				
				mobilMoved();
			}	
			
		});
		pageReloader();
	}
	
	function mobilMoveStatus(status){					
		if(status==1){
			return true;
		}else{
			return false;
		}
	}
	
			
	function pageReloader() {
		setTimeout(	function(){
			getCoords();
		},200);
	}

//------ hämtar data från mobil/Ipad slut ------///
	
//------ skapar kartan --------//

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(latStart, lngStart),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	function pageReloader() {
		setTimeout(function(){
			moveMap();
		},200);
	}	


};

//----- hämtar koordinater från skärmens plats ------//

function showPosition(position){

	mobilLat = parseFloat(position.coords.latitude);
	mobilLng = parseFloat(position.coords.longitude);

	latStart = mobilLat; 
	lngStart = mobilLng;

	initialize();

};

