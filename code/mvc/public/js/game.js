$(function () {
	initialize();
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
	
	var latStart=mobilLat; 
	var lngStart=mobilLng;

	/*	
	Systemet i link�ping
	58.4105226, 15.6271606
	*/	
//	Koordinats Golden Thai
	var latEnd=58.035609;
	var lngEnd= 14.976296;
	/*
	sk�ggetorp
	58.4354436, 15.5882945
	
			
	
	var latEnd= 58.4354436;
	var lngEnd= 15.5882945;
*/
	var texten="jag har inget att s�ga...";
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
	
		latStart=mobilLat; 
		lngStart=mobilLng;
		
		initialize();

	}

	
	//skapar kartan
	function initialize() {
	
		var mapOptions = {
			center: new google.maps.LatLng(latStart, lngStart),
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);	

	//	getLocation();

	//	latStart=mobilLat; //58.039818;//dessa koordinater ska vara dynamiska, 
		//positionen vi utg�r ifr�n (tuc)
	//	lngStart=mobilLng; //14.987047;

	};

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
				leftArrowPressed();
				break;
			case 38:
				upArrowPressed();
				break;
			case 39:
				rightArrowPressed();
				break;
			case 40:
				downArrowPressed();
				break;	
		}
	};

	function leftArrowPressed(){
		//		alert("left");		
		event.preventDefault();	
		mobilLng=mobilLng-0.0001;
		moveMap();
	};		

	function rightArrowPressed(){

		//alert("right");		
		event.preventDefault();	
		mobilLng=mobilLng+0.0001;
		moveMap();
	};		

	function upArrowPressed(){
	//alert("up");		
		event.preventDefault();	
		mobilLat=mobilLat+0.0001;
		moveMap();
	};		

	function downArrowPressed(){
	//alert("down");		
		event.preventDefault();	
		mobilLat=mobilLat-0.0001;
		moveMap();
	};		
	
	function getText(zon){
		
	//avst�nd mellan varje zon
		var changeTextLat= (latStart- latEnd) / 4;
		var changeTextLng= (lngStart - lngEnd) / 4;
		if(changeTextLng<0){
		alert("mindre �n noll...");
		}
	//	alert(changeTextLat);
	//	alert(changeTextLng);
	
	//var zon=4;					
		var zonCoord1=latEnd + (changeTextLat*zon);
		var zonCoord2=latEnd - (changeTextLat*zon);
		var zonCoord3=lngEnd + (changeTextLng*zon);
		var zonCoord4=lngEnd - (changeTextLng*zon);
		
//			if(changeTextLng>0){
	
		if( mobilLat < zonCoord1 && mobilLng < zonCoord3 && mobilLat > zonCoord2 && mobilLng > zonCoord4 ){
			
//					writeText(zon);
	
//					alert("!! "+ zonCoord1);
//				}
		
//			}else{
		
//				if( mobilLat > zonCoord1 && mobilLng > zonCoord3 && mobilLat < zonCoord2 && mobilLng < zonCoord4 ){
	
//					writeText(zon);
	
//					alert("!! "+ zonCoord1);
//				}
	
//			}
	
	
//		function writeText(zon){
	
			if(zon==4){
			
				texten= "Det �r en bit kvar";
			
			}else if(zon==3){
				
				texten= "Ungef�r halvv�gs..";
			
			}else if(zon==2){
				
				texten= "Ganska n�ra nu.";
			
			}else if(zon==1){
				
				texten= "Det b�rjar br�nnas!";
				
			}else if(zon==0.167){
										
				texten= "<strong style='color:#ff6633;'><strong>H�rligt, du klarade det!!</strong>";
	
			}else{
			
				texten="Ooups! Du �r ganska l�ngt ifr�n...";
	
			}
		}
	
//		}
		return texten;
	};	


	function moveMap(){	
	
		texten = getText(4);
		texten = getText(3);
		texten = getText(2);
		texten = getText(1);
		texten = getText(0.167);
	
		document.getElementById('message').innerHTML=texten;
	
		var latLng= new google.maps.LatLng(mobilLat, mobilLng);
		
		map.panTo(latLng);
	
	}