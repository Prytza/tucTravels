<?php

class Mobile_Model extends Model {

	function __construct() {
		parent::__construct();
	}
	
	function setCoords() {
		
		$upp =  $_POST['up'];
		$ner =  $_POST['down'];
		$vanster =  $_POST['left'];
		$hoger =  $_POST['right'];
		$userID = 1;
		$id = 5;
		
		$query = 'UPDATE mobile SET nord=:upp, syd=:ner, vast=:vanster, ost=:hoger WHERE mobileID=:id';
		
		$sth = $this->db->prepare($query);
		
		$statements = array(
				':upp' => $upp,
				':ner' => $ner,
				':vanster' => $vanster,
				':hoger' => $hoger,
				':id' => $id
		);
		
		$result=$sth->execute($statements);
			
	}
	
	function sendUserInfoFromMobile () {
	
		$facebookID = $_POST['facebookID'];
		$lat = $_POST['lat'];
		$lng = $_POST['lng'];
		$active = 1;
		
		/*Skulle kunna dra nytta av checkIfUserExist i Facebook_Model
		 *för att slippa att det blir för många rader i databasen.
		 *lägre prio...
		 */
		
		
		$query = 'INSERT INTO user (facebookID, currentLng, currentLat, active) VALUES (:facebookID, :lng, :lat, :active)';
		
		$sth = $this->db->prepare($query);
		
		$statements = array(
				':facebookID' => $facebookID,
				':lat' => $lat,
				':lng' => $lng,
				':active' => $active
		);
		
		$result=$sth->execute($statements);
	
	}

}