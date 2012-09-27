<?php

class Chat extends Controller {

	function __construct() {
		parent::__construct();
		$this -> view -> js = array("chat");
	}
	
	function index () {
		$this -> view -> render("chat/index");
	}
	
	function post () {
	
		$this -> model -> post();
	
	}
	
	function loop () {
	
		$this -> model -> loop();
	
	}

}