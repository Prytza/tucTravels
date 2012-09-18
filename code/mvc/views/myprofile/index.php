<h2>My Profile</h2>

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