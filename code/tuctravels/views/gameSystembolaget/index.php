

<div id="map_wrapper">

	<!--timer visar tiden som är kvar på spelet-->
	<div id='timer' ></div>

	<!-- i map_canvas  skrivs googlemaps ut -->
	<div id="map_canvas"></div>

	<img id="helikopter" src="<?php echo URL; ?>public/images/down.gif" alt="flygande helekopter" />

	<p id="message">Start systembolaget...</p>

</div>

<script type="text/javascript" src="<?php echo URL; ?>public/js/gameInitialize.js">
</script>
<script type="text/javascript" src="<?php echo URL; ?>public/js/gameMove.js">
</script>