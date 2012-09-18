<?php

class Help extends Controller {

	function __construct() {
		parent::__construct();
		echo "We are in the help controller<br />";
	}
	
	function index () {
		$this -> view -> render("help/index");
	}
	
	public function other ($arg = false) {
		echo "we are inside function other<br />";
		echo "Optional: " . $arg . "<br />";
		
		require("models/help_model.php");
		$model = new Help_Model();
	}

}