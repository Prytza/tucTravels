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
		
		$query = 'INSERT INTO user (facebookID, currentLng, currentLat, active) VALUES (:facebookID, :lng, :lat, :active)';
		
		// $query =   "IF EXISTS (SELECT * FROM user WHERE facebookID = :facebookID)
					// BEGIN
						// UPDATE user SET currentLng = :lng, currentLat = :lat, active = :active WHERE facebookID = :facebookID
					// END
					// ELSE
					// BEGIN
						// INSERT INTO user (facebookID, currentLng, currentLat, active) VALUES (:facebookID, :lng, :lat, :active)
					// END";
		
		
		$sth = $this->db->prepare($query);
		
		$statements = array(
				':facebookID' => $facebookID,
				':lat' => $lat,
				':lng' => $lng,
				':active' => $active
		);
		
		$sth->execute($statements);
		
		$result = $this -> db -> lastInsertId();
		
		$result = json_encode($result);
		header('Content-Type: application/json');
		echo $result;
	
	}
	
	function updateUserInfoFromMobile () {
	
		$facebookID = $_POST['facebookID'];
		$lat = $_POST['lat'];
		$lng = $_POST['lng'];
		
		$query = 'UPDATE user SET currentLng = :lng, currentLat = :lat WHERE facebookID = :facebookID';
		
		$sth = $this->db->prepare($query);
		
		$statements = array(
				':facebookID' => $facebookID,
				':lat' => $lat,
				':lng' => $lng
		);
		
		$result=$sth->execute($statements);
	
	}

}