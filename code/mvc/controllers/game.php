<?php

class Game extends Controller {

	function __construct() {
		parent::__construct();
		
		$this -> view -> js = array("game");
	}
	
	function index () {
		$this -> view -> render("game/index");
	}

}