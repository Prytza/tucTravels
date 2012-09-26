<?php

class GameSystembolaget extends Controller {

	function __construct() {
		parent::__construct();
		
		$this -> view -> js = array("gameSystembolaget");
	}
	
	function index () {
		$this -> view -> render("gameSystembolaget/index");
	}
	
	function getDirections () {
		$this -> model -> getDirections();
	}
	
	function insert () {
		$this -> model -> insert();
	}

}