<?php

class GameMove extends Controller {

	function __construct() {
		parent::__construct();
		
		$this -> view -> js = array("gameMove");
	}
	
	function index () {
		$this -> view -> render("game/index");
	}
	
	function getDirections () {
		$this -> model -> getDirections();
	}

	function insert () {
		$this -> model -> insert();
	}

}