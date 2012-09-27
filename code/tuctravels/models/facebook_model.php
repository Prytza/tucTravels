<?php

class Facebook_Model extends Model {

	// public static $fb_login = array();
	//public static $nummer = self::facebook;

	function __construct() {
		parent::__construct();
	}
	
	public static function facebook () {
		
		require 'api/facebook/src/facebook.php';

		// Create our Application instance (replace this with your appId and secret).
		$facebook = new Facebook(array(
		  'appId'  => APP_ID,
		  'secret' => SECRET
		));

		// Get User ID
		$user = $facebook->getUser();
		
		// initierar övriga objekt för att kunna returnera en array.
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
													'next' => URL . 'login/quit/'
												  ));
		} else {
		  $loginUrl = $facebook->getLoginUrl(array(
													'scope' => 'read_stream, friends_likes',
													'redirect_uri' => URL . 'mobile'
												  ));
		}
		
		$fb_login = array("user" => $user,
						  "user_profile" => $user_profile,
						  "loginUrl" => $loginUrl,
						  "logoutUrl" => $logoutUrl
						 );
		
		return $fb_login;
	}
	
	function checkIfUserExist ($user) {
	
		$lng = 1.11;
		$lat = 2.22;
		$active = 1;
	
		$sth = $this -> db -> prepare("SELECT * FROM user WHERE
			facebookID = :facebookID");
		
		$sth -> execute(array(
			':facebookID' => $user
		));
	
		$count = $sth -> rowCount();
		if ($count > 0) {
			$this -> updateExistingUser($user, $lng, $lat, $active);
			echo "<br /><br />träff!";
		}
		else {
			$this -> regNewUser($user, $lng, $lat, $active);
			echo "<br /><br />miss!";
		}
		
	}
	
	public function regNewUser($user, $lng, $lat, $active) {
	
		$query = 'INSERT INTO user (facebookID, currentLng, currentLat, active) VALUES (:fbID, :lng, :lat, :active)';
		
		$sth = $this->db->prepare($query);
		
		$statements = array(
				':fbID' => $user,
				':lng' => $lng,
				':lat' => $lat,
				':active' => $active
		);
		
		$sth->execute($statements);	
	
	}
	
	function updateExistingUser ($user, $lng, $lat, $active) {
	
		$query = 'UPDATE user SET currentLng=:lng, currentLat=:lat, active=:active WHERE facebookID=:fbID';
		
		$sth = $this->db->prepare($query);
		
		$statements = array(
				':lng' => $lng,
				':lat' => $lat,
				':active' => 0, // $active,
				':fbID' => $user
		);
		
		$result=$sth->execute($statements);	
	
	}

}