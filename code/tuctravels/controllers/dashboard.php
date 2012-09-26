<?php

class Dashboard extends Controller {

	function __construct() {
		parent::__construct(); //n�dv�ndig f�r att inneh�llet ur controller() ska k�ras
		//echo "We are in the dashboard controller<br />";
		Session::init();
		$logged = Session::get("loggedIn");
		if ($logged == false) {
			Session::destroy();
			header("location: login");
			exit;
		}
		
		$this -> view -> js = array("dashboard");
		
	}
	
	function index () {
		$this -> view -> render("dashboard/index");
	}
	
	function logout() {
		Session::destroy();
		header("location: ../login");
	}
	
		function xhrInsert()
	{
		$this->model->xhrInsert();
	}
	
	function xhrGetListings()
	{
		$this->model->xhrGetListings();
	}
	
	function xhrDeleteListing()
	{
		$this->model->xhrDeleteListing();
	}

}