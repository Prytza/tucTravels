//h�mtar dina koordinater
function getLocation(){

	if (navigator.geolocation){//om det finns ett v�rde i navigator.geolocation

		navigator.geolocation.getCurrentPosition(showPosition);

	}else{

		document.getElementById('map_canvas').innerHTML = " Geolocation is not supported by this browser.";
	
	}
};

	var setClearTimeout;

	var startTimer=false;
	var Timer;
	var TotalSeconds;
	
//skapar en timer
function CreateTimer(TimerID, Time) {
        Timer = document.getElementById(TimerID);
        TotalSeconds = Time;
        
        UpdateTimer();
        Tick();
}

//r�knar ner sekundrarna
function Tick() {

	if( TotalSeconds > 0){
        TotalSeconds -= 1;
        UpdateTimer()
        setClearTimeout=setTimeout("Tick()", 1000);
	}else{

		document.getElementById('timer').innerHTML = "<span id='gameover' >GAME OVER</span>";
	}
	
	if(!getDirectionStatus){
	
		//stoppar klockan n�r man n�tt m�let eller tiden g�tt ut
		clearTimeout(setClearTimeout);
		
		
		//spara tiden i databasen...
		// $.post('url', {result: TotalSeconds}, function(o) {
			
			// }, 'json');
			
	}
}

//skriver ut siffran
function UpdateTimer() {
        Timer.innerHTML = TotalSeconds;
}


/*S�tt ut mark�rer enligt koordinaterna*/
function setMarkers (map, storeCoords, place, img, storeID = null) {	

	var marker = new google.maps.Marker({
		position: storeCoords,
		title: place,
		icon: img
	});
		
	/*L�gg till markering till kartan*/
	marker.setMap(map);
	
}
