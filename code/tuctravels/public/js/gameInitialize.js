var setClearTimeout;
function getLocation(){

	if (navigator.geolocation){//om det finns ett värde i navigator.geolocation

		navigator.geolocation.getCurrentPosition(showPosition);

//			}else{

//				x.innerHTML="Geolocation is not supported by this browser.";
	
	}
};

function CreateTimer(TimerID, Time) {
        Timer = document.getElementById(TimerID);
        TotalSeconds = Time;
        
        UpdateTimer();
        Tick();
}

function Tick() {

	console.log(getDirectionStatus);
	if( TotalSeconds > 0){
        TotalSeconds -= 1;
        UpdateTimer()
        setClearTimeout=setTimeout("Tick()", 1000);
	}else{
		document.getElementById('timer').innerHTML  = "<strong style='color:#ff6633;'><strong>GAME OVER</strong>";
	}
	
	if(!getDirectionStatus){
	
		clearTimeout(setClearTimeout);
		
		
		//spara tiden i databasen...
	}
}

function UpdateTimer() {
        Timer.innerHTML = TotalSeconds;
}


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
