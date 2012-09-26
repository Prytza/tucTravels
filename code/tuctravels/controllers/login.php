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
	
	function quit() {
		Session::init();
		Session::destroy();

		header("location: " . URL);
		exit;
	}

}