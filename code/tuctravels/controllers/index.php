<?php

class Index extends Controller {

	function __construct() {
		parent::__construct(); //n�dv�ndig f�r att inneh�llet ur controller() ska k�ras
		//echo "We are in the index controller<br />";
	}
	
	function index() {
		$this -> view -> render("index/index");
	}

}