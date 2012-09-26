<?php

class Myprofile extends Controller {

	function __construct() {
		parent::__construct();
	}
	
	function index () {
		$this -> view -> render("myprofile/index");
	}

}