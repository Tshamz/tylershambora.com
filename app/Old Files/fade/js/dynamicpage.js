$(document).ready(function(){

	var messageDelay = 2000;  // HOW LONG TO DISPLAY STATUS MESSAGES (IN MILLISECONDS)

// CONTROLS APPLE-ISH FADE IN EFFECT
	$('#fadeIn').delay(500).fadeIn(1000);
	$('#overlay').delay(2500).fadeOut(1000);

//THIS IS ALL THE AJAX CRAP

	//THIS HANDLES THE FORM SUBMIT
		function submitForm() {
			var contactForm = $(this);
			// ARE ALL THE FIELDS FILLED IN?
				if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val() ) {
					// NO; DISPLAY A WARNING MESSAGE AND RETURN TO THE FORM
						$('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
						contactForm.fadeOut().delay(messageDelay).fadeIn();
				} 
				else {
					// YES; SUBMIT THE FORM TO THE PHP SCRIPT VIA AJAX
						$('#sendingMessage').fadeIn();
						$.ajax( {
							url: contactForm.attr( 'action' ) + "?ajax=true",
							type: contactForm.attr( 'method' ),
							data: contactForm.serialize(),
							success: submitFinished
						});
				}
			// PREVENT THE DEFAULT FORM SUBMISSION OCCURRING
				return false;
		}

	// THIS HANDLES THE AJAX RESPONSE
		function submitFinished( response ) {
			response = $.trim( response );
			$('#sendingMessage').fadeOut();
			if ( response == "success" ) {
			// FORM SUBMITTED SUCCESSFULLY:
			// 1. DISPLAY THE SUCCESS MESSAGE
			// 2. CLEAR THE FORM FIELDS
			// 3. FADE THE CONTENT BACK IN
				$('#successMessage').fadeIn().delay(messageDelay).fadeOut();
				$('#senderName').val( "" );
				$('#senderEmail').val( "" );
				$('#message').val( "" );
				$('#content').delay(messageDelay+500).fadeTo( 'slow', 1 );
			} 
			else {
			// FORM SUBMISSION FAILED: DISPLAY THE FAILURE MESSAGE,
			// THEN REDISPLAY THE FORM
				$('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
				$('#contactForm').delay(messageDelay+500).fadeIn();
			}
		}

	// CHECK FOR HASH VALUE IN URL
		var hash = window.location.hash.substr(1);
		var href = $('#nav li a').each(function(){
			var href = $(this).attr('href');
			if(hash==href.substr(0,href.length-5)){
				if(hash != 'index'){
					var toLoad = hash+'.html #content';
					$('#content').css('display', 'none');
					$('#content').load(toLoad)
					$('#content').delay(2500).fadeIn(1000);
				}
			}
		});

	//DO THIS WHEN SOMEONE CLICKS ON A NAV LINK
		$('#nav li a').on("click", function() {
			var isContact = $(this).attr('href').substr(0,$(this).attr('href').length-5);
			var toLoad = $(this).attr('href')+' #content';
			window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
			$('#content').fadeOut(500,function(){
				$('#content').load(toLoad,'',function(){
					$('#content').fadeIn(500);
					if (isContact == 'contact') {
						$('#contactForm').submit(submitForm);
					}
				});
			});
			return false;
		});
});

