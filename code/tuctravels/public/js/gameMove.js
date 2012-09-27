
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
	
	
	
	//sätta rätt namn på bilden i urlen 
	//document.getElementById("helikopter").src="<?php echo URL; ?>public/images/" + image + ".gif";
			
	document.getElementById("helikopter").src= url + "public/images/" + image + ".gif";
}


	function moveMap(){	

		text = getText(4);
		text = getText(3);
		text = getText(2);
		text = getText(1);
		text = getText(0.167);
	
		document.getElementById('message').innerHTML = text;
	
		var latLng = new google.maps.LatLng(mobilLat, mobilLng);
	//	map = new google.maps.LatLng(mobilLat, mobilLng);
		
		map.panTo(latLng);
		//map.panTo(map);
	
	};
	
		function getText(zon){
		
		parseFloat(latEnd);
		parseFloat(lngEnd);
		parseFloat(zonDistans);
		
		
		var zonCoordOne   = parseFloat(latEnd + ( zonDistans * zon));//öster om
		var zonCoordTwo   = parseFloat(latEnd - ( zonDistans * zon));//väster om
		var zonCoordThree = parseFloat(lngEnd + ( zonDistans * zon));//norr om
		var zonCoordFour  = parseFloat(lngEnd - ( zonDistans * zon));//söder om
		
	
		parseFloat(mobilLat);
		parseFloat(mobilLng);
	
		if( mobilLat < zonCoordOne && mobilLat > zonCoordTwo && mobilLng < zonCoordThree && mobilLng > zonCoordFour ){

	
			if(zon == 4){

				text = "Zon 4 en bit kvar";

			}else if(zon == 3){

				text = "Zon 3";

			}else if(zon == 2){

				text = " Zon 2 ";

			}else if(zon == 1){

				text = "Zon 1 ";

			}else if(zon == 0.167){

				text = "<strong style='color:#ff6633;'><strong>Nice, du klarade det!!</strong>";
				getDirectionStatus=false;
			}	

		}	

		return text;
	};	
	
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
			mobilMoved();
		}

		
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
	
		
	//när kordinater från mobilen ändras
function mobilMoved(){
				
	
	
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
