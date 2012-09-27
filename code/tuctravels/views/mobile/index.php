<?php if (isset($this ->fb_login["user"]) && $this ->fb_login["user"] != 0) : ?>
     
	<div id="main">
		<p id="activateText">Click to activate</p>
	</div>

	<div id="activate">
	<form method="post" id="ajax">
	<input id="up" type="hidden" name="up">
	<input id="down" type="hidden" name="down">
	<input id="left" type="hidden" name="left">
	<input id="right" type="hidden" name="right">
	</form>
	</div>
	
	<div>
		<a id="fb_logout_mobile_view"><h2>Logout</h2></a>
	</div>

	<script type="text/javascript" src="<?php echo URL; ?>public/js/orientation.js">
	</script>
	<script type="text/javascript" src="<?php echo URL; ?>public/js/add2home.js">
	</script>
	 
<?php else: ?>

	<div class="game_choice_frame">
		<a href="<?php echo $this -> fb_login["loginUrl"]; ?>"><h2>Login with Facebook</h2></a>
	</div>

<?php endif ?>




