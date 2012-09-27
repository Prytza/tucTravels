<?php

class Controller {

	function __construct() {

		$this -> view = new View();
		
		//Oavs�tt vilken sida man �r p� h�mtas uppgifter om man �r inloggad eller ej
		require("models/facebook_model.php");
		
		$this -> view -> fb_login = Facebook_Model::facebook();

	}
	
	public function loadModel($name) {
		
		$path = "models/" . $name . "_model.php";
		
		if (file_exists($path)) {
			require("models/" . $name . "_model.php");
		
			$modelName = $name . "_Model";
			$this -> model = new $modelName();
		}
		
	}

}