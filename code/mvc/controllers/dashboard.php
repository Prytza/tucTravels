<?php

class Dashboard extends Controller {

	function __construct() {
		parent::__construct(); //nödvändig för att innehållet ur controller() ska köras
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