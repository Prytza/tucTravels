<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>TUC Travels</title>
	<link rel="stylesheet" href="<?php echo URL; ?>public/css/default.css" />
	<script src="<?php echo URL; ?>public/js/jquery.js" type="text/javascript"></script>
	<script src="<?php echo URL; ?>public/js/script.js" type="text/javascript"></script>
	

	<!--Här är sofias data-->
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	
	<style type="text/css">
		html { height: 100% }
		body { height: 100%; margin: 0; padding: 0 }
		#map_canvas { height: 80% }
	</style>

	<script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>  		
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHRJ7aPSIG_eI9Iu27PhBuiQX6wVv9ilU&sensor=true">
	</script>
	<!--Sofias data slut!-->
	
	<?php if (isset($this -> js)) {
		
		foreach ($this -> js as $js) {
			echo "<script src='" . URL . "public/js/" . $js . ".js' type='text/javascript'></script>";
		}
	
	}?>
	
	
</head>
<body>
<?php Session::init(); ?>
<div id="header">
Header<br />
<a href="<?php echo URL; ?>index">Home</a>
<a href="<?php echo URL; ?>game">Let's Play</a>
<a href="<?php echo URL; ?>faq">FAQ</a>
<?php if (Session::get("loggedIn") == true): ?>
<a href="<?php echo URL; ?>myprofile">My Profile</a>
<?php endif; ?>

<div id="fb_login">
	<?php if (isset($this ->fb_login["user"]) && $this ->fb_login["user"] != 0) : ?>
      <a href="<?php echo $this -> fb_login["logoutUrl"]; ?>">Logout</a>
    <?php else: ?>
      <div>
        Login using OAuth 2.0 handled by the PHP SDK:
        <a href="<?php echo $this -> fb_login["loginUrl"]; ?>">Login with Facebook</a>
      </div>
    <?php endif ?>
</div>
</div>
<div id="content">