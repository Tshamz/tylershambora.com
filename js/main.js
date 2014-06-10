$(document).ready(function() {

/*==========================================================================
  Modernizr Feature Test
==========================================================================*/

var unsupportedFeatures = [];
var fullFeatureNameMap = {
  'js': 'JavaScript',
  'flexbox': 'CSS Flex-Box',
  'flexboxlegacy': 'Legacy CSS Flex-Box',
  'hashchange': 'Hashchange Event',
  'backgroundsize': 'CSS Background-Size',
  'borderradius': 'CSS Border-Radius',
  'boxshadow': 'CSS Box-Shadow',
  'opacity': 'CSS Opacity',
  'cssanimations': 'CSS Animations',
  'csstransforms': 'CSS Transforms',
  'csstransitions': 'CSS Transitions',
  'fontface': '@font-face',
  'sessiomstorage': 'JavaScript Session Storage',
  'boxsizing': 'CSS Box-Sizing',
  'mediaqueries': '@media Queries',
  'lastchild': 'CSS :last-child Selector'
};
var classNames = $('html').attr('class').split(/\s+/);
$.each(classNames, function(index, value) {
  if (value.substring(0,3) === 'no-') {
    unsupportedFeatures.push(fullFeatureNameMap[value.substring(3)]);
  }
  if (unsupportedFeatures.length > 0) {
    var unsupportedFeaturesMegaString = '';
    $.each(unsupportedFeatures, function(index, value) {
      unsupportedFeaturesMegaString = unsupportedFeaturesMegaString + '<li>' + value + '</li>';
    });
    $('#unsupported-features').append(unsupportedFeaturesMegaString);
    // Prevent the heavy images from being loading every time the page is visited
    $('.chrome-link').html('<img src="img/icons/chrome.jpg" />');
    $('.firefox-link').html('<img src="img/icons/firefox.jpg" />');
    $('.safari-link').html('<img src="img/icons/safari.jpg" />');
    $('.opera-link').html('<img src="img/icons/opera.jpg" />');
    $('#browsehappy').show();
  }
});

/*==========================================================================
  VARIABLES
==========================================================================*/

  var messageDelay = 2000;
  $guts = $('#guts');
  var $landing = $('#landing');
  var subGalleries = ["papn", "csh", "fb", "sns", "petershambora", "wtfdrink", "laura", "resizely"];

/*==========================================================================
  LOADING PAGE CONTENT AND GALLERY SETUP
==========================================================================*/

  // Load the new content into the page, and build up a gallery if necessary
  var loadPageContent = function(pageName, callback) {
    $guts.load(pageName + ".html", function() {
      var newPage = pageName;
      switch (newPage) {
        case "papn":
        case "csh":
        case "fb":
        case "sns":
        case "petershambora":
        case "wtfdrink":
        case "laura":
        case "resizely":
        case "resume":
          buildUpGallery();
          break;
        case "contact":
          repopulateForm();
          break;
      }
      if (callback) {
        callback();
      }
    });
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
    $('#primary-nav .' + hash).addClass('is-active');
    $('#primary-nav .' + hash + ' a').attr('disabled', 'disabled');  // Prevents further clicks on active link in IE
    loadPageContent(hash, function() {
      $guts.toggleClass('slideUp slideDown');
      setTimeout(function(){$('.content').toggleClass('fadeOut fadeIn');}, 600);  // $guts slide transition takes 600ms
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
    $('#primary-nav li:not(.logo)').toggle();
  });

  // After navigating to a new location, the nav menu hides
  $('#primary-nav a').click(function() {
    if ($('.nav-toggle').is(':visible')) {
      $('#primary-nav li:not(.logo)').hide();
    }
  });

  // Update the is active class on site navigation
  $('#primary-nav li').click(function() {
    $('#primary-nav li').removeClass('is-active');
    $('#primary-nav a').removeAttr('disabled');
    if ($(this).is("#primary-nav li")) {
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
      $('#primary-nav li').removeClass('is-active');
      $('#portfolio').toggleClass('fadeIn fadeOut');
      setTimeout(function() {
        loadPageContent(newHash, function() {
          $('.content').toggleClass('fadeIn fadeOut');
        });
      }, 200);
    }
    // Are we leaving a sub gallery and going back to Portfolio?
    else if ($(".content").hasClass('sub') && newHash === "portfolio") {
      $('.content').toggleClass('fadeIn fadeOut');
      setTimeout(function(){
        loadPageContent(newHash, function() {
          $('.content').toggleClass('fadeIn fadeOut');
        });
      }, 200);
    // Just moving from one content section to another
    } else {
      $('.content').toggleClass('fadeIn fadeOut');
      setTimeout(function(){$guts.toggleClass('slideDown slideUp');}, 200);  // $('.content') fade transition takes 200ms
      setTimeout(function() {
        loadPageContent(newHash, function() {
          $guts.toggleClass('slideUp slideDown');
          setTimeout(function(){$('.content').toggleClass('fadeOut fadeIn');}, 600);  // $guts slide transition takes 600ms
        });
      }, 800);  // 200ms for the fade + 600ms for the slide
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