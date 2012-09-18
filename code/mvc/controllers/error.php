<?php

class Error extends Controller {

	function __construct() {
		parent::__construct();
		echo "We are in the error controller<br />";
	}
	
	function index () {
		$this -> view -> msg = "(Probably the controller or method does not found!)<br />";		
		$this -> view -> render("error/index");
	}

}