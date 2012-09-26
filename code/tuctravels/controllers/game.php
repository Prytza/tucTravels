<?php

class Game extends Controller {

	function __construct() {
		parent::__construct();
	}
	
	function index () {
		$this -> view -> render("game/intro", false, true);
	}
	
	function getDirections () {
		$this -> model -> getDirections();
	}
	
	function user ($user = false) {
	
		// if ($user) {
			// $FM = new Facebook_Model();
			// // $this -> view -> user = $FM -> checkIfUserExist($user);
			// $FM -> checkIfUserExist($user);
		// }
	
		$this -> view -> js = array("game");
	
		$this -> view -> render("game/index", false, true);
	
	}
	
	function getInloggedUsers () {
	
		$this -> model -> getInloggedUsers();
		
	}

}