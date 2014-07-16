$(document).ready(function() {

/*==========================================================================
  Modernizr Feature Test
==========================================================================*/

  yepnope({
    load: 'js/feature-test.min.js',
  });

/*==========================================================================
  VARIABLES
==========================================================================*/

  var injectedHtml;
  var galleryInfos = '';
  var cachedGalleries = {};
  var messageDelay = 2000;
  var slideTransitionLength = 1000;
  var fadeTransitionLength = 100;
  var $guts = $('#guts');
  var subGalleries = ["papn", "csh", "fb", "sns", "petershambora", "wtfdrink", "laura", "resizely", "cpsolutions"];

/*==========================================================================
  ON INITIAL PAGE LOAD
==========================================================================*/

  $.when(
    $.get("injected-html.html", function(data) {
      injectedHtml = $(data);
    }),
    $.getJSON('/js/galleryInfos.json', function(data) {
      galleryInfos = data;
    })
  ).then(function() {
    initialLoad();
  });

  var initialLoad = function() {
    var hash = window.location.hash.substring(1);
    if (hash === "") {
      hash = "entrance";
    }
    $('#main-header .' + hash).addClass('is-active');
    $('#main-header .' + hash + ' a').attr('disabled', 'disabled');  // Prevents further clicks on active link in IE
    loadPageContent(hash, function() {
      $guts.toggleClass('slideUp slideDown');
      setTimeout(function(){$('.content').toggleClass('fadeOut fadeIn');}, slideTransitionLength);
    });
  };

/*==========================================================================
  LOADING PAGE CONTENT
==========================================================================*/

  var loadPageContent = function(pageName, callback) {
    $guts.children('section').remove();
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
      case "cpsolutions":
        buildUpGallery(newPage);
        break;
      case "contact":
        repopulateForm();
      default:
        $guts.prepend(injectedHtml.closest('#' + newPage));
    }
    if (callback) {
      callback();
    }
  };

/*==========================================================================
  GALLERY BUILDING
==========================================================================*/

  // Build and setup whatever gallery's been loaded
  var buildUpGallery = function(galleryName) {

    // If the gallery has already been built, don't rebuild it
    if (galleryName in cachedGalleries) {
      $guts.prepend(cachedGalleries[galleryName]);
      return;
    }

    var galleryStatus = galleryInfos[galleryName]["galleryStatus"];
    var onlineBadge = '<svg xmlns="http://www.w3.org/2000/svg" width="88" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="88" height="18" fill="#555"/><rect rx="4" x="44" width="44" height="18" fill="#4c1"/><path fill="#4c1" d="M44 0h4v18h-4z"/><rect rx="4" width="88" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="65" y="13" fill="#010101" fill-opacity=".3">online</text><text x="65" y="12">online</text></g></svg>';
    var offlineBadge = '<svg xmlns="http://www.w3.org/2000/svg" width="89" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="89" height="18" fill="#555"/><rect rx="4" x="44" width="45" height="18" fill="#e05d44"/><path fill="#e05d44" d="M44 0h4v18h-4z"/><rect rx="4" width="89" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="65.5" y="13" fill="#010101" fill-opacity=".3">offline</text><text x="65.5" y="12">offline</text></g></svg>';
    var mockupBadge = '<svg xmlns="http://www.w3.org/2000/svg" width="99" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="99" height="18" fill="#555"/><rect rx="4" x="44" width="55" height="18" fill="#dfb317"/><path fill="#dfb317" d="M44 0h4v18h-4z"/><rect rx="4" width="99" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="70.5" y="13" fill="#010101" fill-opacity=".3">' + galleryStatus + '</text><text x="70.5" y="12">' + galleryStatus + '</text></g></svg>';

    var pageTitle = galleryInfos[galleryName]["galleryTitle"];
    var pageDescription = galleryInfos[galleryName]["galleryDescription"];
    var marqueeImage = galleryInfos[galleryName]["marqueeImage"];
    var pageURL = galleryInfos[galleryName]["galleryURL"];
    var pageURLAppearance = galleryInfos[galleryName]["galleryURLAppearance"];
    var statusBadge = '';
    if (galleryStatus === 'online') {
      marqueeImage = '<a href="' + pageURL + '" target="_blank"><img src="' + marqueeImage + '" /></a>';
      statusBadge = onlineBadge;
      pageURL = '<p><strong><a href="' + pageURL + '" target="_blank">' + pageURLAppearance + '</a></strong></p>';
    } else if (galleryStatus === 'offline') {
      marqueeImage = '<img src="' + marqueeImage + '" />';
      statusBadge = offlineBadge;
      pageURL = '';
    } else {
      marqueeImage = '<img src="' + marqueeImage + '" />';
      statusBadge = mockupBadge;
      pageURL = '';
    }

    var baseGallery = '';
    if (galleryInfos[galleryName]["subGallery"]) {
      baseGallery += '<section id="' + galleryName + '" class="fadeOut content sub gallery">';
    } else {
      baseGallery += '<section id="' + galleryName + '" class="fadeOut content gallery">';
    }

      baseGallery += '<nav>';
        baseGallery += '<div class="gallery-control previous"></div>';
        baseGallery += '<div class="gallery-control next"></div>';
      baseGallery += '</nav>';
      baseGallery += '<div class="slide" style="left:0%;">';
        baseGallery += '<div class="gallery-panel marquee">';
          baseGallery += '<div class="marquee-image">';
            baseGallery += marqueeImage;
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-title">';
            baseGallery += '<h2 class="hyphenate">' + pageTitle + '</h2>';
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-url">';
            baseGallery += pageURL;
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-status">';
            baseGallery += statusBadge;
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-description">';
            baseGallery += '<p>' + pageDescription + '</p>';
          baseGallery += '</div>';
        baseGallery += '</div>';
      baseGallery += '</div>';

    var additionalGalleries = galleryInfos[galleryName]["additionalGalleries"];
    var additionalGalleryPanels = '';
    for (i = 0; i < additionalGalleries.length; i++) {
      var activeGallery = additionalGalleries[i];
      var lightboxExists = activeGallery[0];
      var extraClasses = activeGallery[1];
      var imageLocation = activeGallery[2];
      var imageDescription = activeGallery[3];
      var n = i + 1;

      additionalGalleryPanels += '<div class="slide" style="left:' + n + '00%;">';
        additionalGalleryPanels += '<div class="gallery-panel repeat ' + extraClasses + '">';
          additionalGalleryPanels += '<div class="gallery-image"><img src="img/sites/' + imageLocation + '" lightbox="' + lightboxExists + '" /></div>';
          additionalGalleryPanels += '<div class="gallery-text"><p>' + imageDescription + '</p></div>';
        additionalGalleryPanels += '</div>';
      additionalGalleryPanels += '</div>';
    }

    var fullGallery = baseGallery + additionalGalleryPanels + '</section>';
    cachedGalleries[galleryName] = fullGallery;
    $guts.prepend(fullGallery);

    $('.gallery .slide:first-of-type').addClass('first');
    $('.gallery .slide:last-of-type').addClass('last');
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
    $('.gallery .slide').animate({left: "+=100%"}, 750, function() {
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
    $('.gallery .slide').animate({left: "-=100%"}, 750, function() {
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
  LIGHTBOX BINDINGS
==========================================================================*/

  $guts.on('click', '.gallery img[lightbox="true"]', function() {
    if (!$('.nav-toggle').is(':visible')) {
      var imgSrc = $(this).attr('src');
      $('#lightbox-image').attr('src', imgSrc);
      $('#lightbox').show();
    }
  });
  $('#lightbox-image').click(function(e) {
    e.stopPropagation();
  });
  $('#lightbox').click(function() {
    $('#lightbox').hide();
  });
  $guts.on('click', '#resume .gallery-image', function() {
    window.open('/resume.pdf', 'Tyler Shambora\'s Resume');
  });

/*==========================================================================
  NAVIGATION
==========================================================================*/

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
  $('#main-header .nav-item a').on('click', function() {
    $('#main-header .nav-item').removeClass('is-active');
    $('#main-header a').removeAttr('disabled');
    if ($(this).is("#main-header .nav-item a")) {
      $(this).parent().addClass('is-active');
      $(this).find('a').attr('disabled', 'disabled');  // Prevents further clicks on active link in IE
    }
  });

/*==========================================================================
  STATES
==========================================================================*/

  // If the user hasn't consented or them saying ok wasn't stored on this computer, show them the warning
  if (sessionStorage.wtfdrinkPermission !== true) {
    $guts.on('click', '.portfolio-item.wtfdrink a', function(e) {
      $('#wtf-overlay').show();
      e.preventDefault();
    });
  }

  // If they click no, store their answer in sessionStorage and return them to the portfolio
  $('#no-way').click(function() {
    sessionStorage.setItem('wtfdrinkPermission', false);
    $('#wtf-overlay').hide();
  });
  // If they click yes, store that answer also and send them on their way. Also unbind the event to enter the wtfdrink subgallery.
  $('#yes-way').click(function() {
    sessionStorage.setItem('wtfdrinkPermission', true);
    $('#wtf-overlay').hide();
    window.location.hash = 'wtfdrink';
    $guts.off('click', '.portfolio-item.wtfdrink a');
  });

  $(window).on('hashchange', function() {
    // This counts only when the hash changes, it does not count if the initial
    // page also initially included a hash, either way, record a hashchange
    ga('Navigation', 'Click', 'hashchange');
    // Collect information about current states
    var newHash = window.location.hash.substring(1);  // Where we are headed...
    // Are we going into a sub gallery?
    if ($.inArray(newHash, subGalleries) >= 0) {
      $('#main-header .nav-item').removeClass('is-active');
      $('#main-header a').removeAttr('disabled');
      $('#portfolio').toggleClass('fadeIn fadeOut');
      setTimeout(function() {
        loadPageContent(newHash, function() {
          $('.content').toggleClass('fadeIn fadeOut');
          $('html, body').animate({ scrollTop: 0 }, 400);
          ga('Navigation', 'Event', '#' + newHash);
          ga('Navigation', 'Event', 'Portfolio => Sub-Gallery');
        });
      }, fadeTransitionLength);
    }
    // Are we leaving a sub gallery and going back to Portfolio?
    else if ($(".content").hasClass('sub') && newHash === "portfolio") {
      $('.content').toggleClass('fadeIn fadeOut');
      setTimeout(function(){
        loadPageContent(newHash, function() {
          $('.content').toggleClass('fadeIn fadeOut');
          $('html, body').animate({ scrollTop: 0 }, 400);
          ga('Navigation', 'Event', '#' + newHash);
          ga('Navigation', 'Event', 'Portfolio <= Sub-Gallery');
        });
      }, fadeTransitionLength);
    // Just moving from one content section to another
    } else {
      $('.content').toggleClass('fadeIn fadeOut');
      setTimeout(function(){$guts.toggleClass('slideDown slideUp');}, fadeTransitionLength);
      setTimeout(function() {
        loadPageContent(newHash, function() {
          $guts.toggleClass('slideUp slideDown');
          setTimeout(function(){
            $('.content').toggleClass('fadeOut fadeIn');
            $('html, body').animate({ scrollTop: 0 }, 400);
            ga('Navigation', 'Event', '#' + newHash);
            ga('Navigation', 'Event', 'Generic Navigation');
          }, slideTransitionLength);
        });
      }, fadeTransitionLength + slideTransitionLength);
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