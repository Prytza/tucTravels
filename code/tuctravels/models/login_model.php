<?php

class Login_Model extends Model {

	function __construct() {
		parent::__construct();
		//echo "login_model";
	}
	
	function facebook () {
		
		require 'api/facebook/src/facebook.php';

		// Create our Application instance (replace this with your appId and secret).
		$facebook = new Facebook(array(
		  'appId'  => '491121290898123',
		  'secret' => '45061230742df14e8beb4be53b5bedd6',
		));

		// Get User ID
		$user = $facebook->getUser();
		
		$user_profile = array();
		$loginUrl = "";
		$logoutUrl = "";

		// We may or may not have this data based on whether the user is logged in.
		//
		// If we have a $user id here, it means we know the user is logged into
		// Facebook, but we don't know if the access token is valid. An access
		// token is invalid if the user logged out of Facebook.

		if ($user) {
		  try {
			// Proceed knowing you have a logged in user who's authenticated.
			$user_profile = $facebook->api('/me');
		  } catch (FacebookApiException $e) {
			error_log($e);
			$user = null;
		  }
		}

		// Login or logout url will be needed depending on current user state.
		if ($user) {
		  $logoutUrl = $facebook->getLogoutUrl(array(
													'next' => URL . 'login/quit'
												  ));
		} else {
		  $loginUrl = $facebook->getLoginUrl(array(
													'scope' => 'read_stream, friends_likes',
													'redirect_uri' => URL . 'login'
												  ));
		}
		
		$fb_login = array("user" => $user,
						  "user_profile" => $user_profile,
						  "loginUrl" => $loginUrl,
						  "logoutUrl" => $logoutUrl
						 );
		
		return $fb_login;
	}
	
		// public function run () {
		
		// $sth = $this -> db -> prepare("SELECT usersID FROM users WHERE
			// username = :username AND password = :password");
		
		// $sth -> execute(array(
			// ':username' => $_POST["username"],
			// ':password' => $_POST["password"]
		// ));
		
		// //$data = $sth -> fetchAll();
		
		// $count = $sth -> rowCount();
		// if ($count > 0) {
			// Session::init();
			// Session::set("loggedIn", true);
			// header("location: ../dashboard");
		// }
		// else {
			// header("location: ../login");
		// }
		
	// }

}

