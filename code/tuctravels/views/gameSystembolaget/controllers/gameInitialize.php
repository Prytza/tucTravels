<?php

class GameInitialize extends Controller {

	function __construct() {
		parent::__construct();
		
		$this -> view -> js = array("gameInitialize");
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