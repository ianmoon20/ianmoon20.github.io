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


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">

		<title>Ian Moon - Contact Me</title>

		<link rel="stylesheet" href="bootstrap/css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="css/stylesheet.css" type="text/css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>

		<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
	</head>
	<body>
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbad-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav">
						<li><a href="index.html">Home</a></li>
						<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">Projects<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="proj1.html">Once a Rogue</a></li>
								<li><a href="proj2.html">Asteroids Remake</a></li>
								<li><a href="proj3.html">Rock, Paper, Scissors!</a></li>
							</ul>
						</li>
						<li><a href="experience.html">Programming</a></li>
						<li><a href="graphics.html">Art</a></li>
						<li><a href="media/resume.pdf" target="_blank">Resume</a></li>
						<li><a href="notes.html">Notes</a></li>
						<li class="active"><a href="contact.php">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="jumbotron">
			<div class="container text-center">
				<h1>Contact Me</h1>
			</div>
		</div>

		<section id="contact">
			<div class="container">
				<div class="row">
					<div class="col-sm-2 centered"></div>
				<div class="col-sm-8 centered">
					<p class="desc-info">
						Send a message to my email by filling out the form below:
					</p>
					
					<?php
					echo $result; 
					?>

					<form method="post" role="form">
						
						<div class="form-group">
							<input type="text" name="name" class="form-control" placeholder="Your name" value=<?php echo $_POST['name'];?>>
						</div>
						<div class="form-group">
							<input type="email" name="email" class="form-control" placeholder="Your email" value=<?php echo $_POST['email'];?>>
						</div>
						<div class="form-group">
							<textarea name="message" rows="5" class="form-control" placeholder="Message..." maxlength="3600"><?php echo $_POST['message'];?></textarea>
						</div>
						<div class="checkbox">
							<label>
								<input type="checkbox" name="check">I am not a robot
							</label>
						</div>

						<div align="center">
							<input type="submit" name="submit" class="btn btn-secondary" value="Send Message">
						</div>
					</form>
				<div class="col-sm-2 centered"></div>
				</div>
			</div>
		</section>
	</body>
</html>