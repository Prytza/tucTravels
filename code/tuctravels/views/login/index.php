<H3>This is the Login View...</H3>

<?php if (isset($this ->fb_login["user"]) && $this ->fb_login["user"] != 0) : ?>
      <a href="<?php echo $this -> fb_login["logoutUrl"]; ?>">Logout</a>
    <?php else: ?>
      <div>
        Login using OAuth 2.0 handled by the PHP SDK:
        <a href="<?php echo $this -> fb_login["loginUrl"]; ?>">Login with Facebook</a>
      </div>
    <?php endif ?>

    <h3>PHP Session</h3>
    <pre><?php if (isset($_SESSION)) { print_r($_SESSION);} else {echo "No session exists!";}?></pre>

    <?php if ($this -> fb_login["user"]): ?>
      <h3>You</h3>
      <img src="https://graph.facebook.com/<?php echo $this -> fb_login["user"]; ?>/picture">

      <h3>Your User Object (/me)</h3>
      <pre><?php print_r($this -> fb_login["user_profile"]); ?></pre>
    <?php else: ?>
      <strong><em>You are not Connected.</em></strong>
    <?php endif ?>
	<pre>
	 <?php print_r($this -> fb_login); ?>
	 </pre>