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
		
		/*Kontrollera om användaren redan finns i databasen*/
		$sth = $this->db->prepare('SELECT * FROM user WHERE facebookID = :facebookID');
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute(array(":facebookID" => $facebookID));
		$data = $sth->fetchAll();
		
		$count = $sth->rowCount();
		
		/*Om användaren redan finns - gör en UPDATE, annars en INSERT*/
		if ($count > 0) {
		
			$query = 'UPDATE user SET currentLng = :lng, currentLat = :lat, active = :active WHERE facebookID = :facebookID';
		
			$sth = $this->db->prepare($query);
			
			$statements = array(
					':lat' => $lat,
					':lng' => $lng,
					':active' => $active,
					':facebookID' => $facebookID
			);
			
			$sth->execute($statements);
		
		}
		else {
		
			$query = 'INSERT INTO user (facebookID, currentLng, currentLat, active) VALUES (:facebookID, :lng, :lat, :active)';
		
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