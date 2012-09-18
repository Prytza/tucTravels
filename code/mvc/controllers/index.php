<?php

class Index extends Controller {

	function __construct() {
		parent::__construct(); //nödvändig för att innehållet ur controller() ska köras
		//echo "We are in the index controller<br />";
	}
	
	function index() {
		$this -> view -> render("index/index");
	}

}