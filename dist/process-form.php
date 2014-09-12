<?php

// Define some constants
define( "RECIPIENT_NAME", "Tyler Shambora" );
define( "RECIPIENT_EMAIL", "tyler@theshamboras.com" );
define( "EMAIL_SUBJECT", "Hey! Someone Just sent you a message!" );

// Read the form values
$success = false;
$senderName = isset( $_POST['sender-name'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['sender-name'] ) : "";
$senderEmail = isset( $_POST['sender-email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['sender-email'] ) : "";
$senderMessage = isset( $_POST['sender-message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['sender-message'] ) : "";

// If all values exist, send the email
if ( $senderName && $senderEmail && $senderMessage ) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . $senderName . " <" . $senderEmail . ">";
  $success = mail( $recipient, EMAIL_SUBJECT, $senderMessage, $headers );
}

// Return an appropriate response to the browser
if ( isset($_GET["ajax"]) ) {
  echo $success ? "success" : "error";
} else {
?>
<html>
  <head>
    <title>Thanks!</title>
  </head>
  <body>
  <?php if ( $success ) echo "<p>Thanks for sending your message! We'll get back to you shortly.</p>" ?>
  <?php if ( !$success ) echo "<p>There was a problem sending your message. Please try again.</p>" ?>
  <p>Click your browser's Back button to return to the page.</p>
  </body>
</html>
<?php
}
?>


