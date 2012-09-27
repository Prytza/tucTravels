<?php

class Login_Model extends Model {

	function __construct() {
		parent::__construct();
	}
	
	public function quit ($facebookID) {
	
		$query = 'UPDATE user SET active=:active WHERE facebookID=:id';
			
			$sth = $this->db->prepare($query);
			
			$statements = array(':active' => 0,
								':id' => $facebookID
			);
			
			$result=$sth->execute($statements);
	
	}

}

