<?php
session_start(); /* Starts the session */

$whitelist = array("southerntrust.hscni.net");

function validateEmailDomain($email, $domains) {
    foreach ($domains as $domain) {
        $pos = strpos($email, $domain, strlen($email) - strlen($domain));

        if ($pos === false)
            continue;

        if ($pos == 0 || $email[(int) $pos - 1] == "@" || $email[(int) $pos - 1] == ".")
            return true;
    }

    return false;
}

/* Check Login form submitted */
if(isset($_POST['Submit'])){

    $email = strtolower(isset($_POST['email']) ? $_POST['email'] : '');
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        if (validateEmailDomain($email, $whitelist))
        {
            /* Success: Set session variables and redirect to Protected page  */
            $_SESSION['UserData']['Email']=$email;
            header("location:contacts.php");
            exit;
        } else {
            $msg="<br><span style='color:red'>Invalid Login Details</span>";
        }
    } else {
        $msg="<br><span style='color:red'>Not a valid email address</span>";
    }

    
}
?>

<!DOCTYPE html>
<html>
<head>
<title>HSC Trust Contacts</title>
<link rel="manifest" crossorigin="use-credentials" href="manifest.webmanifest"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">

<meta name="apple-mobile-web-app-title" content="Add to Home">

<link rel="shortcut icon" sizes="196x196" href="images/hsc-icon-192.png">

<meta name="apple-mobile-web-app-title" content="Add to Home">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link href="css/style.css" rel="stylesheet">

</head>

<body>

<div class="wrapper fadeInDown">
  <div id="formContent">
    <div class="fadeIn first">
      <img src="https://southerntrust.hscni.net/wp-content/uploads/2018/09/ST-1.png" id="icon" alt="User Icon" />
    </div>

    <form action="" method="post" name="Login_Form">
      <input type="text" id="email" class="fadeIn second" name="email" placeholder="Email Address">
      <input name="Submit" type="submit" class="fadeIn fourth" value="Login">
      <?php if(isset($msg)){?>
      <?php echo $msg;?>
    <?php } ?>
    </form>
    

  </div>
</div>
</body>
</html>