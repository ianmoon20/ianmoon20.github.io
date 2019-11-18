<?php

if ($_POST['submit'])
{
	if(!$_POST['name'])
	{
		$error.= "<br/>- Please enter a <strong>name</strong>";
	}
	if(!$_POST['email'])
	{
		$error.= "<br/>- Please enter a <strong>valid email</strong>";
	}
	if(!$_POST['message'])
	{
		$error.= "<br/>- Please enter a <strong>message</strong>";
	}
	if(!$_POST['check'])
	{
		$error.= "<br/>- Please <strong>confirm you are human</strong>";
	}

	if($error)
	{
		$result = '<div class="alert alert-danger" role="alert"><strong>Whoops, invalid data</strong>. Please correct the following: '.$error.'</div>';
	}

	else
	{
		mail("imm3350@rit.edu", "Contact Message", "
Name: ".$_POST['name']."
Email: ".$_POST['email']."
Message: "."

".$_POST['message']);

		{
			$result = '<div class="alert alert-success" role="alert">Message succesfully sent. I\'ll get right back to you.</div>';
			$_POST['message'] = "";
		}
	}
}


?>


