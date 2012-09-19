<?php

class Mobile extends Controller {

	function __construct() {
		parent::__construct();
		
		$this -> view -> tags =
		array(
			"1" => '<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />',
			"2" => '<meta name="apple-mobile-web-app-capable" content="yes" />',
			"3" => '<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
			"4" => '<link rel="apple-touch-icon" href="' . URL . 'public/images/logo.png"/>',
			"5" => '<link rel="stylesheet" href="' . URL . 'public/css/style.css">',
			"6" => '<link rel="stylesheet" href="' . URL . 'public/css/add2home.css">'
		);
		
		
	// De taggar från julius som blir dubletter
	// <meta charset="UTF-8">
	// <title>TUC Travels</title>
	// <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript">
	// </script>
		
		$this -> view -> js = array("mobile");
	}
	
	function index () {
		$this -> view -> render("mobile/index");
	}

}