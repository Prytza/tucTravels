<?php

class View {
	
	function __construct() {
	
	}
	
	public function render($name, $noInclude = false, $sidebar = false) {
		if ($noInclude == true) {
			require("views/" . $name . ".php");
		}
		else {
		
			if ($sidebar == true) {
				require("views/header.php");
				require("views/" . $name . ".php");
				require("views/sidebar.php");
				require("views/footer.php");
			}
			else {
				require("views/header.php");
				require("views/" . $name . ".php");
				require("views/footer.php");
			}
		}
	}
	
}