<?php

class Login extends Controller {

	function __construct() {
		parent::__construct(); //nödvändig för att innehållet ur controller() ska köras
		//echo "We are in the login controller<br />";
	}
	
	function index () {
		
		//$this -> view -> fb_login = $this -> model -> facebook();
		
		$this -> view -> render("login/index");
	}
	
	// function run() {
		// $this -> model -> run();
	// }
	
	// function facebook () {

		// $this -> model -> facebook();
	// }
	
	function quit($facebookID = false, $backpage = false) {
	
		if ($backpage) {

			if ($facebookID) {
			
				$this -> model -> quit($facebookID);
			
			}

			Session::init();
			Session::destroy();

			header("location: " . URL . $backpage);
			exit;
		}
		else {
		
			if ($facebookID) {
			
				$this -> model -> quit($facebookID);
			
			}

			Session::init();
			Session::destroy();

			header("location: " . URL);
			exit;
		
		}

	}

}