<?php

class Game_Model extends Model {

	function __construct() {
		parent::__construct();
	}
	
	public function getDirections () {
	
		$sth = $this->db->prepare('SELECT * FROM mobile WHERE mobileID = 5');
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$data = $sth->fetchAll();
		echo json_encode($data);
	}
	
	public function getInloggedUsers () {
	
		$sth = $this->db->prepare('SELECT * FROM user WHERE active = 1');
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$data = $sth->fetchAll();
		echo json_encode($data);

	}

}