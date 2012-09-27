<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>TUC Travels</title>
	<link rel="stylesheet" href="<?php echo URL; ?>public/css/default.css" />
	<script src="<?php echo URL; ?>public/js/prototype.js" type="text/javascript"></script>
	<script src="<?php echo URL; ?>public/js/jquery.js" type="text/javascript"></script>
	<script src="<?php echo URL; ?>public/js/script.js" type="text/javascript"></script>
	
	<!--Här är julius data-->
	<?php 
	if (isset($this -> tags)) {
	
		foreach ($this -> tags as $tag) {
			echo $tag . "\n	";
		}
	}
	?>
	<!--Julius data slut!-->
	
	<!--Här är sofias data-->
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
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
<div id="header">
Header<br />

<a href="<?php echo URL; ?>index">Home</a>
<a href="<?php echo URL; ?>game/<?php echo (isset($this ->fb_login["user"]) && $this ->fb_login["user"] != 0) ? "user/" . $this -> fb_login["user"] : ""; ?>">Let's Play</a>
<a href="<?php echo URL; ?>faq">FAQ</a>
<a href="<?php echo URL; ?>chat">Chat</a>
<?php if (isset($this ->fb_login["user"]) && $this ->fb_login["user"] != 0) : ?>
<a href="<?php echo URL; ?>myprofile">My Profile</a>
<?php endif; ?>

</div>

	<div id="content">