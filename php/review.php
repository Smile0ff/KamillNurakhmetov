<?php
	sleep(1);

	if(isset($_POST["review"]["message"]) && !empty($_POST["review"]["message"]) && strlen($_POST["review"]["message"]) > 5){
		$respones["message"] = "Thank you for your comment";
		echo json_encode($respones);
	} else{
		header("HTTP/2.0 503 Service Unavailable");
		$error = "Something goes wrong, please try again later";
		echo $error;
	}

	
?>