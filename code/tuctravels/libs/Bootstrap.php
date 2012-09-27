<?php

class Bootstrap {

	function __construct() {

		$url = isset($_GET['url']) ? $_GET['url'] : null;
		$url = rtrim($url, '/');
		$url = explode('/', $url);

		//print_r($url);
		
		if (empty($url[0])) {
			require 'controllers/index.php';
			$controller = new Index();
			$controller->index();
			return false;
		}

		$file = 'controllers/' . $url[0] . '.php';
		if (file_exists($file)) {
			require $file;
		} else {
			$this->error();
		}
		
		$controller = new $url[0];
		$controller -> loadModel($url[0]);

		// calling methods
		if (isset($url[3])) {
			if (method_exists($controller, $url[1])) {
				$controller->{$url[1]}($url[2], $url[3]);
			} else {
				$this->error();
			}
		}
		if (isset($url[2])) {
			if (method_exists($controller, $url[1])) {
				$controller->{$url[1]}($url[2]);
			} else {
				$this->error();
			}
		} else {
			if (isset($url[1])) {
				if (method_exists($controller, $url[1])) {
					$controller->{$url[1]}();
				} else {
					$this->error();
				}
			} else {
				$controller->index();
			}
		}
		
		
	}
	
	function error() {
		require 'controllers/error.php';
		$controller = new Error();
		$controller->index();
		return false;
	}

}

// Koden fungerade inte genom tutorialen..

// class Bootstrap {

	// function __construct() {
	
		// $url = isset($_GET["url"]) ? $_GET["url"] : null;
		// $url = rtrim($url, "/"); // borde inte behövas men säkerställer att det inte följer med några tomma uttryck
		// //print_r($url);
		// $url = explode("/", $url);

		// //print_r($url);
		// //echo "<br />";
		
		// if (empty($url[0])) {
			// require("controllers/index.php");
			// $controller = new Index();
			// $controller -> index();
			// return false;
		// }
		
		// $file = "controllers/" . $url[0] . ".php";
		// if (file_exists($file)) {
			// require($file);
		// }
		// else {
			// require("controllers/error.php");
			// $controller = new Error();
			// return false;
			// //throw new Exeption("The file: " . $file . "does not exists!");
		// }
		

		// $controller = new $url[0];
		
		// if (isset($url[2])) {
			// $controller -> {$url[1]}($url[2]);
		// }
		// else {
			// if (isset($url[1])) {
				// $controller -> {$url[1]}(); // Samma som $controller -> function()
			// }
		// }
	
	// }

// }