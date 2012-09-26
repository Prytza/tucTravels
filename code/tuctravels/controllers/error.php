<?php

class Error extends Controller {

	function __construct() {
		//parent::__construct();
		
		// för att undvika redeclare class Facebook_Model
		$this -> view = new View();
	}
	
	function index () {
		$this -> view -> msg = "(Probably the controller or method does not found!)<br />";		
		$this -> view -> render("error/index", true, false);
	}

}