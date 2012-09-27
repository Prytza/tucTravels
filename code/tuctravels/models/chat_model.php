<?php
//session_start();


class Chat_Model extends Model {

	function __construct() {
		parent::__construct();
	}
	
	function post () {
	
		if($_SESSION['user'] != $_POST['user']){ //Ser till så att session-user är samma som user-name från POST. Om det inte är det så sätts POST's värde som session-user.
			//session_destroy();
			unset($_SESSION['user']);
			//session_start();
			$_SESSION['user'] = $_POST['user'];
		}
	
		$lines = file('chat.xml');  // Öppnar xml-filen, tar bort sista raden och lägger till data som sedan avslutas med taggen som togs bort.
		$last = sizeof($lines) - 1 ;
		unset($lines[$last]);
		$fp = fopen('chat.xml', 'w');
		fwrite($fp, implode('', $lines));
		$file_handle = fopen('chat.xml','a');
		$content=('
		<message>
			<timestamp>'.date('h:i:s').'</timestamp>
			<user>'. $_POST['user'] .'</user>
			<text>'.$_POST['input'] .'</text>
		</message>
		</chat>');

		fwrite($file_handle,$content);
		fclose($fp);
	
	}
	
	function loop () {
	
		//session_start();

		$xml = simplexml_load_file(URL . 'chat.xml'); // Laddar in XML-filen
		$i = 0;

		foreach($xml->message as $message)  // Här sparar jag filens data i arrayer för att sedan kunna vända ordningen på datan.
		{
			$i++;
			$time[$i] = $message->timestamp;
			$user_name[$i] = $message->user;
			$user_text[$i] = $message->text;
		}

		$count = count($user_name);

		while($count > 0){	// Här vänder jag ordningen så att det nyaste meddelandet ligger överst.

			echo '<div class="message"><p><span class="small_text">' . $time[$count] . "</span> ";
			if($user_name[$count]  == $_SESSION['user']){
				echo "<span class='me'>" . $user_name[$count] . ": </span>";
			}else{
				echo "<span class='notme'>". $user_name[$count] . ": </span>";
			}
			echo $user_text[$count]. '</p></div>';
			$count = $count - 1;
		}
	
	}

}