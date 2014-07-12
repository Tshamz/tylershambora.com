$(document).ready(function(){
	
	var fadeTimer = 1000;  //Set how long the fade ins and fade outs take for slideShow
	var pause = 3000;  //Set how long each list item pauses for slideShow
	var messageDelay = 2000;  //Set how long to display status messages
	
	var myPhrases = new Array();
	myPhrases[0] = "A flute without holes, is not a flute. A donut without a hole, is a Danish.";
	myPhrases[1] = "The arsonist has oddly shaped feet.";
	myPhrases[2] = "The human torch was denied a bank loan.";
	myPhrases[3] = "This is a new phrase for the bottom of the page";

/*** DON'T CHANGE ANYTHING BELOW HERE ***/
/*** XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ***/
/*** XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ***/
/*** XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ***/
	
/*** THIS CONTROLS THE RANDOM PHRASE GENERATOR ***/
	var numberPhrases = myPhrases.length;
	var randomPhrase = Math.floor(Math.random()*numberPhrases)
	$('#thePhrase').replaceWith(myPhrases[randomPhrase]);


//DO THIS WHEN SOMEONE CLICKS ON A NAV LINK
	var newHash  = "",
	$el;
	
	$("header, #siteMapFooter").on("click", "a", function() {
		if (newHash == "" && $(this).attr("href") == "index.html") {
			return false;
		}
		else if ($(this).attr("href") == "blog.html") {
			window.location.assign("http://lauramcclure.posterous.com/");
			return false;
		}
		else {
			window.location.hash = $(this).attr("href");
			return false;
		}
	});

	$(window).on('hashchange', function(){
		newHash = window.location.hash.substring(1);
		$("header a").removeClass("current");
		$("header a[href$=\""+newHash+"\"]").addClass("current");	
		$('#mainContent').slideUp(500,function(){
			$('#mainContent').load(newHash + " #mainContent", function(){
				$('#mainContent').slideDown(500);
				if (newHash == 'contact.html') {
					$('#contactForm').submit(submitForm);
				}					
			});
		});
		return false;	
	});

//THIS IS ALL THE FORM BEHAVIOR
	
	//THIS HANDLES THE FORM SUBMIT
		function submitForm() {
			var contactForm = $(this);
			// ARE ALL THE FIELDS FILLED IN?
				if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val() ) {
					// NO; DISPLAY A WARNING MESSAGE AND RETURN TO THE FORM
						$('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
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
				$('#successMessage').fadeIn().delay(messageDelay).fadeOut();
				$('#senderName').val( "" );
				$('#senderEmail').val( "" );
				$('#message').val( "" );
			} 
			else {
			// FORM SUBMISSION FAILED: DISPLAY THE FAILURE MESSAGE,
			// THEN REDISPLAY THE FORM
				$('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
			}
		}
	$(window).trigger('hashchange');
});