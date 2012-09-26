<?php

	//Use an autoloader
	require("libs/Bootstrap.php");
	require("libs/Controller.php");
	require("libs/View.php");
	require("libs/Model.php");
	
	// Library
	require("libs/Database.php");
	require("libs/Session.php");
	
	require("config/paths.php");
	require("config/database.php");
	require("config/api.keys.php");
	
	$app = new Bootstrap();