$(document).ready(function() {

/*==========================================================================
  Modernizr Feature Test
==========================================================================*/

  yepnope({
    load: 'js/feature-test.min.js'
  });

/*==========================================================================
  VARIABLES
==========================================================================*/

  var $subPagesDocument;
  var messageDelay = 2000;
  var fadeTransitionLength = 250;
  var slideTransitionLength = 800;
  var $guts = $('#guts');
  var $landing = $('#landing');
  var subGalleries = ["papn", "csh", "fb", "sns", "petershambora", "wtfdrink", "laura", "resizely"];

/*==========================================================================
  LOADING PAGE CONTENT AND GALLERY SETUP
==========================================================================*/

  // Load the new content into the page, and build up a gallery if necessary
  var loadPageContent = function(pageName, callback) {
    $guts.children().not('#guts-footer').remove();  // Empty out the content (except for the footer)
    $guts.prepend($subPagesDocument.closest('#' + pageName));  // Then .prepend() the new content
    var newPage = pageName;
    switch (newPage) {
      case "resume":
      case "papn":
      case "csh":
      case "fb":
      case "sns":
      case "petershambora":
      case "wtfdrink":
      case "laura":
      case "resizely":
        buildUpGallery();
        break;
      case "contact":
        repopulateForm();
        break;
    }
    if (callback) {
      callback();
    }
  };

  // Build and setup whatever gallery's been loaded
  var buildUpGallery = function() {
    $('.content-presenter li').each(function(index) {
      $(this).css('left', index + '00%');
    });
    $('.content-presenter li:first-child').addClass('first');
    $('.content-presenter li:last-child').addClass('last');
    $('.previous').addClass('is-disabled');
  };

/*==========================================================================
  GALLERY ANIMATION
==========================================================================*/

  // Global isAnimating variable
  var isAnimating = false;

  // Move backwards through gallery
  $guts.on('click', '.previous', function() {
    if ($('.first').css('left') === "0px") {
      return false;
    }
    if (isAnimating === true) {
      return false;
    }
    isAnimating = true;
    $('.content-presenter li').animate({left: "+=100%"}, 750, function() {
      isAnimating = false;
      if ($('.first').css('left') === "0px") {
        $('.previous').addClass('is-disabled');
      }
    });
    if ($('.next').hasClass('is-disabled')) {
      $('.next').removeClass('is-disabled');
    }
  });

  // Move forwards through gallery
  $guts.on('click', '.next', function() {
    if ($('.last').css('left') === "0px") {
      return false;
    }
    if (isAnimating === true) {
      return false;
    }
    isAnimating = true;
    $('.content-presenter li').animate({left: "-=100%"}, 750, function() {
      isAnimating = false;
      if ($('.last').css('left') === "0px") {
        $('.next').addClass('is-disabled');
      }
    });
    if ($('.previous').hasClass('is-disabled')) {
      $('.previous').removeClass('is-disabled');
    }
  });

/*==========================================================================
  ON INITIAL PAGE LOAD
==========================================================================*/

  var initialLoad = function() {
    var hash = window.location.hash.substring(1);
    $('#main-header .' + hash).addClass('is-active');
    $('#main-header .' + hash + ' a').attr('disabled', 'disabled');  // Prevents further clicks on active link in IE
    $.get("subPagesDocument.html", function(data) {
      $subPagesDocument = $(data);
      // Wait until the HTML document with all the sub-pages has been loaded and assigned to a variable
      loadPageContent(hash, function() {
        $guts.toggleClass('slideUp slideDown');
        setTimeout(function(){$('.content').toggleClass('fadeOut fadeIn');}, slideTransitionLength);  // $guts slide transition takes 600ms
      });
    });
  };

  // If the initial URL contains a hash, load that page and go to it
  if (window.location.hash) {
    initialLoad();
  }
  // Or else just make 'entrance' the hash, and load n' go there
  else {
    window.location.hash = "entrance";
    initialLoad();
  }

  // Clicking on the nav-toggle button reveals the nav menu
  $('.nav-toggle').click(function() {
    $('#main-header .nav-item:not(.logo)').toggle();
  });

  // After navigating to a new location, the nav menu hides
  $('#main-header a').click(function() {
    if ($('.nav-toggle').is(':visible')) {
      $('#main-header .nav-item:not(.logo)').hide();
    }
  });

  // Update the is active class on site navigation
  $('#main-header .nav-item').click(function() {
    $('#main-header .nav-item').removeClass('is-active');
    $('#main-header a').removeAttr('disabled');
    if ($(this).is("#main-header .nav-item")) {
      $(this).addClass('is-active');
      $(this).find('a').attr('disabled', 'disabled');  // Prevents further clicks on active link in IE
    }
  });

/*==========================================================================
  STATES
==========================================================================*/

  $(window).on('hashchange', function() {
    // Collect information about current states
    var newHash = window.location.hash.substring(1);  // Where we are headed...
    // Are we going into a sub gallery?
    if ($.inArray(newHash, subGalleries) >= 0) {
      $('#main-header .nav-item').removeClass('is-active');
      $('#portfolio').toggleClass('fadeIn fadeOut');
      setTimeout(function() {
        loadPageContent(newHash, function() {
          $('.content').toggleClass('fadeIn fadeOut');
        });
      }, fadeTransitionLength);
    }
    // Are we leaving a sub gallery and going back to Portfolio?
    else if ($(".content").hasClass('sub') && newHash === "portfolio") {
      $('.content').toggleClass('fadeIn fadeOut');
      setTimeout(function(){
        loadPageContent(newHash, function() {
          $('.content').toggleClass('fadeIn fadeOut');
        });
      }, fadeTransitionLength);
    // Just moving from one content section to another
    } else {
      $('.content').toggleClass('fadeIn fadeOut');
      setTimeout(function(){$guts.toggleClass('slideDown slideUp');}, fadeTransitionLength);  // $('.content') fade transition takes 200ms
      setTimeout(function() {
        loadPageContent(newHash, function() {
          $guts.toggleClass('slideUp slideDown');
          setTimeout(function(){$('.content').toggleClass('fadeOut fadeIn');}, slideTransitionLength);  // $guts slide transition takes 600ms
        });
      }, fadeTransitionLength + slideTransitionLength);  // 200ms for the fade + 600ms for the slide
    }
  });

/*==========================================================================
  CONTACT FORM
==========================================================================*/

  // This captures and stores the value of each input when you write something
  $guts.on('keyup', '.stored', function() {
    var fieldName = this.id;
    sessionStorage.setItem(fieldName, this.value);
  });

  // This function repopulates the inputs if there is something stored in sessionStorage
  var repopulateForm = function() {
    for (var i = 0; i < sessionStorage.length; i++) {
      var storedValue = sessionStorage.getItem(sessionStorage.key(i));
      $("#" + sessionStorage.key(i)).val(storedValue);
    }
  };

  // This handles the form submit (dur)
  function submitForm() {
    var $contactForm = $(this);
    if ( !$('#sender-name').val() || !$('#sender-email').val() || !$('#sender-message').val() ) {  // Are all the fields filled in?
      $('.status-message, .incomplete-message').fadeIn().delay(messageDelay).fadeOut();  // (this is required for browsers without HTML5 validation)
    }
    else {  // You did it!
      $.ajax( {
        url: $contactForm.attr( 'action' ) + "?ajax=true",
        type: $contactForm.attr( 'method' ),
        data: $contactForm.serialize(),
        success: submitFinished
      });
    }
    return false;  // As always, lets prevent what's supposed to happen from happening...
  }
  $guts.on('submit', '#contact-form', submitForm);

  // Mr. AJAX's response...
  function submitFinished(response) {
    response = $.trim(response);
    if (response === "success") {  // Great success!
      $('.status-message, .success-message').fadeIn().delay(messageDelay).fadeOut();  // 1. Display the success message
      $('#sender-name').val( "" );  // 2. Clear the name
      $('#sender-email').val( "" );  // 3. Clear the email
      $('#sender-message').val( "" );  // 4. Clear the message
      sessionStorage.clear();  // 5. Clear sessionStorage
    }
    else {  // No great success... :(
      $('.status-message, .failure-message').fadeIn().delay(messageDelay).fadeOut();  // Redisplay the failure form!
    }
  }

});