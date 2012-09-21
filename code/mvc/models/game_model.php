<?php

class Game_Model extends Model {

	function __construct() {
		parent::__construct();
	}
	
	function insert() 
	{
		//$text = $_POST['text'];
		
		$number = 444455555;
		
		
		
		$sth = $this->db->prepare('INSERT INTO user (facebookID) VALUES (:number)');
		$sth->execute(array(':number' => $number));
		
		//$data = array('text' => $text, 'id' => $this->db->lastInsertId());
		//echo json_encode($data);
	}
	
	public function getDirections () {
	
		$sth = $this->db->prepare('SELECT * FROM mobil');
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$data = $sth->fetchAll();
		echo json_encode($data);
	}

}