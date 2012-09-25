$(function () {

	//getCoords();
	//getMobilMove();
	//http://integration.henryandersson.se/tuctravels/mobile

	getLocation();
	
	var helikopter = $("#helikopter");
	helikopter.css("zIndex", 10);
	

	document.onkeydown = function(evt) {

		playMobil=false;
		
		//stoppa timern för mobilstyrningen
		clearTimeout(mobilTimer);
		
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
/*
	$('#target').keyup(function(event) {
   
   }).keydown(function(event) {
  if (event.which == 13) {
    event.preventDefault();
  
  }  
});
*/


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


//------ Varibler start ------///

	var left = 37;
	var up = 38;
	var right = 39;
	var down = 40;

	var moveDistans = 0.0001;
		//avstånd mellan varje zon
	var zonDistans = 0.001;
	var leftKey, upKey, rightKey, downKey=false;
	
	var latStart; 
	var lngStart;
	var map;
	var image;

	var mobilLat = 58.039818;
	var mobilLng = 14.987047; 

	//	Koordinats Golden Thai
	var latEnd = 58.035609;
	var lngEnd = 14.976296;
	
	var text = "hmm...";
	
	var playMobil=false;
	var mobilTimer;
	var showPosition;
	//om man valt att styta med mobilen

//------ Varibler slut ------///



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
	
//skapar kartan
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(latStart, lngStart),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	playMobil=false;
	
	if(playMobil==true){
		function pageReloader() {
			setTimeout(function(){
				moveMap();
			},500);
		}	
	}

};

function showPosition(position){

	mobilLat = parseFloat(position.coords.latitude);
	mobilLng = parseFloat(position.coords.longitude);

	latStart = mobilLat; 
	lngStart = mobilLng;

	initialize();

};

