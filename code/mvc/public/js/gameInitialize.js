			

function getLocation(){

	if (navigator.geolocation){//om det finns ett v�rde i navigator.geolocation

		navigator.geolocation.getCurrentPosition(showPosition);

//			}else{

//				x.innerHTML="Geolocation is not supported by this browser.";
	
	}
};


function printMap (yourPosition, mapContainer) {
		
	var mapOptions = {
		zoom: 10,
		center: yourPosition,
		mapTypeId: google.maps.MapTypeId.ROADMAP, 
	}
	
	map = new google.maps.Map(document.getElementById(mapContainer), mapOptions);
	
};
	
/*S�tt ut mark�rer enligt koordinaterna*/
function setMarkers (map, storeCoords, place, img, storeID = null) {	

	var marker = new google.maps.Marker({
		position: storeCoords,
		title: place,
		//icon: img
	});
		
	/*L�gg till markering till kartan*/
	marker.setMap(map);
	
}
