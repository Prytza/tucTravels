<?php

class Mobile_Model extends Model {

	function __construct() {
		parent::__construct();
	}
	
	function setCoords() {
		//$text = $_POST['text'];
		
		$upp =  $_POST['up'];
		$ner =  $_POST['down'];
		$vanster =  $_POST['left'];
		$hoger =  $_POST['right'];
		$userID = 1;
		$id = 5;
		
		$query = 'UPDATE mobile SET nord=:upp, syd=:ner, vast=:vanster, ost=:hoger WHERE mobileID=:id';
		// $query = 'INSERT INTO mobile (nord, syd, vast, ost, user_userID) VALUES (:upp, :ner, :vanster, :hoger, :userID)';
		
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

}