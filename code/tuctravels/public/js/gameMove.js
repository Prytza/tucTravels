//s�tter r�tt bild beroende p� vilken f�rdriktning man �ker i
var image='down';

function getImage(){
		
	if(leftKey && upKey){
		image="leftup";
	}else if(leftKey && downKey){
		image="leftdown";
	}else if(rightKey && upKey){
		image="rightup";
	}else if(rightKey && downKey){
		image="rightdown";
	}else if(leftKey){
		image="left";
	}else if(rightKey){
		image="right";
	}else if(upKey){
		image="up";
	}else if(downKey){
		image="down";
	}
	
	
	
	//s�tta r�tt namn p� bilden i urlen 
	//document.getElementById("helikopter").src="<?php echo URL; ?>public/images/" + image + ".gif";
			
	document.getElementById("helikopter").src= url + "public/images/" + image + ".gif";
}

//flyttar p� kartan 
	function moveMap(){	

		text = getText(4);
		text = getText(3);
		text = getText(2);
		text = getText(1);
		text = getText(0.167);
	
		document.getElementById('message').innerHTML = text;
	
		var latLng = new google.maps.LatLng(mobilLat, mobilLng);
		
		//googles f�rdiga funktion f�r att f�rflytta sig till de koordinater man vill till
		map.panTo(latLng);

	
	};
		

	//avst�nd mellan varje zon
	var zonDistans = 0.001;

	//texten vid helekoptern	
	var text = "hmm...";
	
	//s�tts till false vid avklarad uppgift
	var getDirectionStatus=true;

//h�mtar texten, beroende p� avst�nd ifr�n m�let
	function getText(zon){
		
		parseFloat(latEnd);
		parseFloat(lngEnd);
		parseFloat(zonDistans);
		
		
		var zonCoordOne   = parseFloat(latEnd + ( zonDistans * zon));//�ster om
		var zonCoordTwo   = parseFloat(latEnd - ( zonDistans * zon));//v�ster om
		var zonCoordThree = parseFloat(lngEnd + ( zonDistans * zon));//norr om
		var zonCoordFour  = parseFloat(lngEnd - ( zonDistans * zon));//s�der om
		
	
		parseFloat(mobilLat);
		parseFloat(mobilLng);
	
		if( mobilLat < zonCoordOne && mobilLat > zonCoordTwo && mobilLng < zonCoordThree && mobilLng > zonCoordFour ){

	
			if(zon == 4){

				text = "Zon 4";

			}else if(zon == 3){

				text = "Zon 3";

			}else if(zon == 2){

				text = " Zon 2 ";

			}else if(zon == 1){

				text = "Zon 1 ";

			}else if(zon == 0.167){

				text = "<span id='gameFinished'>Nice, du klarade det!!</span>";
				getDirectionStatus=false;
			}	

		}	

		return text;
	};	
	
	//pilarnas v�rde
	var left  = 37;
	var up    = 38;
	var right = 39;
	var down  = 40;
	
	//�ndrar p� v�rdet p� respektive knapp n�r man trycker ner knappen
		function keyStatusDown(evt){
		
			evt = evt || window.event;
			
			switch (evt.keyCode) {
				case left:
					leftKey=true;
					evt.preventDefault();	
					break;
				case up:
					upKey=true;
					evt.preventDefault();	
					break;
				case right:
					rightKey=true;
					evt.preventDefault();	
					break;
				case down:
					downKey=true;
					evt.preventDefault();	
					break;
			}
			//flyttar p� kartan
			mobilMoved();
		}

	//�ndrar p� v�rdet p� respektive knapp n�r man sl�pper knappen	
		function keyStatusUp(evt){

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
		}
	
		
	//n�r kordinater fr�n mobilen �ndras eller man tryckt p� en pil
function mobilMoved(){
				
	//avst�ndet som sker per knapptryckning
	var moveDistans = 0.0001;
	
	
	if(leftKey){//left
		mobilLng = mobilLng - moveDistans;	
	}

	if(downKey){//down
		mobilLat = mobilLat - moveDistans;
	}

	if(upKey){//up
		mobilLat = mobilLat + moveDistans;
	}

	if(rightKey){//right
		mobilLng = mobilLng + moveDistans;	
	}

	getImage();
	moveMap();
	
	
}
