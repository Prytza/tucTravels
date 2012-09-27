function arrowPressed(event,keyNumber){
	
  parseFloat(mobilLat);
  parseFloat(mobilLng);
  parseFloat(moveDistans);
	
	event.preventDefault();	
	
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
			
	document.getElementById("helikopter").src="http://localhost/php/integration/gitTucTravel/tucTravels/code/tuctravels/public/images/" + image + ".gif";
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
		
		
		var zonCoordOne   = parseFloat(latEnd + ( zonDistans * zon));//�ster om
		var zonCoordTwo   = parseFloat(latEnd - ( zonDistans * zon));//v�ster om
		var zonCoordThree = parseFloat(lngEnd + ( zonDistans * zon));//norr om
		var zonCoordFour  = parseFloat(lngEnd - ( zonDistans * zon));//s�der om
		
	
		parseFloat(mobilLat);
		parseFloat(mobilLng);

		// alert(	'lat -->' + mobilLat + 
		// ' One -->' + zonCoordOne +
		// ' lng -->' + mobilLng +
		// ' Three -->' + zonCoordThree)
		
		//if( mobilLat < zonCoordOne ){alert('inne 1');}
		//if( mobilLat > zonCoordTwo ){alert('inne 2');}
		//if( mobilLng < zonCoordThree ){alert('inne 3');} 
		//if( mobilLng > zonCoordFour ){alert('inne 4');}
		
		if( mobilLat < zonCoordOne && mobilLat > zonCoordTwo && mobilLng < zonCoordThree && mobilLng > zonCoordFour ){

		//alert(mobilLat + ' <-inne i if OVANLIGT-> ' + mobilLng);

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

			}	

		}	

		return text;
	};	
