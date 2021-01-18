<?php
session_start(); /* Starts the session */
if(!isset($_SESSION['UserData']['Email'])){
	header("location:index.php");
	exit;
}
?>

<!DOCTYPE html>
<html>
<head>
<title>HSC Trust Contacts</title>
<!-- <link rel="stylesheet" type="text/css" href="css/addtohomescreen.css">
<script src="js/addtohomescreen.js"></script> -->

<link rel="manifest" crossorigin="use-credentials" href="manifest.webmanifest"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">

<meta name="apple-mobile-web-app-title" content="Add to Home">

<link rel="shortcut icon" sizes="196x196" href="images/hsc-icon-192.png">

<meta name="apple-mobile-web-app-title" content="Add to Home">

<link rel="stylesheet" href="css/font-awesome.min.css">
<link href="css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.min.js"></script>
<link href="css/style.css" rel="stylesheet">

</head>

<body>

<div class="container-fluid">
    <div class="card-body mx-auto">
        <img src="images/shsc-logo.png" id="icon" alt="Southern Trust Logo" />
    </div>
            
    <div class="row">
        <div class="card mb-3 w-75 mx-auto">
            <div class="card-body">
                <h5 class="card-title">A &amp; E</h5>
                <p class="card-text">028 3833 4444</p>
                <a href="tel:02890368933" class="btn btn-success btn-block text-center">
                    <span class="fa fa-phone"></span>  Call A &amp; E</a>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="card mb-3 w-75 mx-auto">
            <div class="card-body">
                <h5 class="card-title">Breast Screening</h5>
                <p class="card-text">028 3833 4445</p>
                <a href="tel:02890368933" class="btn btn-success btn-block text-center">
                    <span class="fa fa-phone"></span>  Call Breast Screening</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="card mb-3 w-75 mx-auto">
            <div class="card-body">
                <h5 class="card-title">Cardiology</h5>
                <p class="card-text">028 3833 4446</p>
                <a href="tel:02890368933" class="btn btn-success btn-block text-center">
                    <span class="fa fa-phone"></span>  Call Cardiology</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="card mb-3 w-75 mx-auto">
            <div class="card-body">
                <h5 class="card-title">Radiology</h5>
                <p class="card-text">028 3833 4447</p>
                <a href="tel:02890368933" class="btn btn-success btn-block text-center">
                    <span class="fa fa-phone"></span>  Call Radiology</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="card mb-3 w-75 mx-auto">
            <div class="card-body">
                <h5 class="card-title">COVID Ward</h5>
                <p class="card-text">028 3833 4448</p>
                <a href="tel:02890368933" class="btn btn-success btn-block text-center">
                    <span class="fa fa-phone"></span>  Call COVID Ward</a>
            </div>
        </div>
    </div>
</div>

<footer class="footer">
  <div class="container">
    <div class="row mx-auto">
      <p>Add To Homescreen</p>
    </div>
  </div>
</footer>
</body>

<script>
 if ('serviceWorker' in navigator) {
	  window.addEventListener('load', function() {
	    navigator.serviceWorker.register('service-worker.js', {scope: '/HSC/index.php'}).then(function(registration) {
	      // Registration was successful
	      console.log('ServiceWorker registration successful with scope: ', registration.scope);
	    }, function(err) {
	      // registration failed :(
	      console.log('ServiceWorker registration failed: ', err);
	    });
	  });
	}

	let deferredPrompt;
	var div = document.querySelector('.footer');
	var button = document.querySelector('.footer');
	div.style.display = 'none';

	window.addEventListener('beforeinstallprompt', (e) => {
	  // Prevent Chrome 67 and earlier from automatically showing the prompt
	  e.preventDefault();
	  // Stash the event so it can be triggered later.
	  deferredPrompt = e;
	  div.style.display = 'block';

	  button.addEventListener('click', (e) => {
	  // hide our user interface that shows our A2HS button
	  div.style.display = 'none';
	  // Show the prompt
	  deferredPrompt.prompt();
	  // Wait for the user to respond to the prompt
	  deferredPrompt.userChoice
	    .then((choiceResult) => {
	      if (choiceResult.outcome === 'accepted') {
	        console.log('User accepted the A2HS prompt');
	      } else {
	        console.log('User dismissed the A2HS prompt');
	      }
	      deferredPrompt = null;
	    });
	});
	});
</script>
</html>