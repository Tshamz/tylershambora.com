(function($, Contact, undefined) {

  function submitFinished(response) {
    response = $.trim(response);
    if (response === 'success') {
      $('.status-message, .success-message').fadeIn().delay(messageDelay).fadeOut();
      $('#sender-name').val( '' );
      $('#sender-email').val( '' );
      $('#sender-message').val( '' );
      sessionStorage.removeItem('sender-name');
      sessionStorage.removeItem('sender-email');
      sessionStorage.removeItem('sender-message');
    } else {
      $('.status-message, .failure-message').fadeIn().delay(messageDelay).fadeOut();
    }
  }
  function submitForm() {
    var $contactForm = $(this);
    if (!$('#sender-name').val() || !$('#sender-email').val() || !$('#sender-message').val()) {
      $('.status-message, .incomplete-message').fadeIn().delay(messageDelay).fadeOut();
    } else {
      $.ajax( {
        url: $contactForm.attr('action') + '?ajax=true',
        type: $contactForm.attr('method'),
        data: $contactForm.serialize(),
        success: submitFinished
      });
    }
    return false;
  }
  var bindUIActions = function() {
    $guts.on('keyup', '.stored', function() {
      var fieldName = this.id;
      sessionStorage.setItem(fieldName, this.value);
    });
    $guts.on('submit', '#contact-form', submitForm);
  };

  Contact.repopulateForm = function() {
    for (var i = 0; i < sessionStorage.length; i++) {
      var storedValue = sessionStorage.getItem(sessionStorage.key(i));
      $('#' + sessionStorage.key(i)).val(storedValue);
    }
  };
  Contact.init = function() {
    bindUIActions();
  };

  var messageDelay = 2000;
  var $guts = $('#guts');

}(jQuery, window.Contact = window.Contact || {}));

(function($, Content, undefined) {

  var removeOldContent = function() {
    $guts.children('section').remove();
  };
  var loadNewContent = function(content) {
    $guts.prepend(content);
  };

  Content.loadPage = function(hash, callback) {
    removeOldContent();
    switch (hash) {
      case 'papn':
      case 'csh':
      case 'fb':
      case 'sns':
      case 'petershambora':
      case 'wtfdrink':
      case 'laura':
      case 'resizely':
      case 'cpsolutions':
        loadNewContent(Gallery.loadGallery(hash));
        break;
      case 'contact':
        Contact.repopulateForm();
      default:
        loadNewContent(Resources.injectedHtml.closest('#' + hash));
        break;
    }
    if (callback) {
      callback();
    }
  };

  var $guts = $('#guts');

}(jQuery, window.Content = window.Content || {}));

(function($, Gallery, undefined) {

  var checkForGalleryInCache = function(galleryName) {
    if (galleryName in galleryCache) {
      return true;
    } else {
      return false;
    }
  };
  var retrieveGalleryFromCache = function(galleryName) {
    return galleryCache[galleryName];
  };
  var addGalleryToCache = function(galleryName, fullGallery) {
    galleryCache[galleryName] = fullGallery;
  };
  var retrieveGalleryInfo = function(galleryName) {
    return Resources.galleryInfo[galleryName];
  };
  var buildGalleryStatusBadge = function(width1, width2, color, text, textX) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width1 + '" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="' + width1 + '" height="18" fill="#555"/><rect rx="4" x="44" width="' + width2 + '" height="18" fill="' + color + '"/><path fill="' + color + '" d="M44 0h4v18h-4z"/><rect rx="4" width="' + width1 + '" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="' + textX + '" y="13" fill="#010101" fill-opacity=".3">' + text + '</text><text x="' + textX + '" y="12">' + text + '</text></g></svg>';
  };
  var setMainGalleryConditions = function(galleryInfo) {
    var marqueeImageString;
    var galleryLinkString;
    var statusBadgeString;
    if (galleryInfo.galleryStatus === 'online') {
      marqueeImageString = '<a href="' + galleryInfo.galleryUrl + '" target="_blank"><img src="' + galleryInfo.marqueeImageLocation + '" lightbox="' + galleryInfo.marqueeImageHasLightbox + '" /></a>';
      galleryLinkString = '<p><strong><a href="' + galleryInfo.galleryUrl + '" target="_blank">' + galleryInfo.galleryUrlAppearance + '</a></strong></p>';
      statusBadgeString = buildGalleryStatusBadge('88', '44', '#4c1', galleryInfo.galleryStatus, '65');
    } else {
      marqueeImageString = '<img src="' + galleryInfo.marqueeImageLocation + '" lightbox="' + galleryInfo.marqueeImageHasLightbox + '" />';
      galleryLinkString = '';
      if (galleryInfo.galleryStatus === 'offline') {
        statusBadgeString = buildGalleryStatusBadge('89', '45', '#e05d44', galleryInfo.galleryStatus, '65.5');
      } else if (galleryInfo.galleryStatus === 'mock-up') {
        statusBadgeString = buildGalleryStatusBadge('99', '55', '#dfb317', galleryInfo.galleryStatus, '70.5');
      }
    }
    return {
      marqueeImage: marqueeImageString,
      galleryLink: galleryLinkString,
      statusBadge: statusBadgeString
    };
  };
  var buildMainGallery = function(galleryName, galleryInfo) {
    var mainGalleryConditionalStrings = setMainGalleryConditions(galleryInfo);
    var marqueeImage = mainGalleryConditionalStrings.marqueeImage;
    var galleryTitle = '<h2 class="hyphenate">' + galleryInfo.galleryTitle + '</h2>';
    var galleryLink = mainGalleryConditionalStrings.galleryLink;
    var galleryStatusBadge = mainGalleryConditionalStrings.statusBadge;
    var galleryDescription = '<p>' + galleryInfo.galleryDescription + '</p>';
    return '<section id="' + galleryName + '" class="fadeOut content sub gallery"><nav><button class="gallery-control previous" disabled="disabled"></button><button class="gallery-control next"></button></nav><div class="slide first" style="left:0%;"><div class="gallery-panel marquee"><div class="marquee-image">' + marqueeImage + '</div><div class="gallery-title">' + galleryTitle + '</div><div class="gallery-url">' + galleryLink + '</div><div class="gallery-status">' + galleryStatusBadge + '</div><div class="gallery-description">' + galleryDescription + '</div></div></div>';
  };
  var buildAdditionalGalleries = function(galleryInfo) {
    var additionalGalleries = galleryInfo.additionalGalleries;
    var additionalGalleriesString = '';
    for (var i = 0; i < additionalGalleries.length; i++) {
      var currentGallery = additionalGalleries[i];
      var galleryHasLightbox = currentGallery.hasLightbox;
      var additionalClasses = currentGallery.additionalClasses;
      var galleryImageLocation = currentGallery.imageLocation;
      var galleryImageDescription = currentGallery.imageDescription;
      var galleryStartingPosition = (i + 1) * 100 + '%';
      if ((i + 1) !== additionalGalleries.length) {
        additionalGalleriesString += '<div class="slide" ';
      } else {
        additionalGalleriesString += '<div class="slide last" ';
      }
       additionalGalleriesString += 'style="left: ' + galleryStartingPosition + ';"><div class="gallery-panel repeat ' + additionalClasses + '"><div class="gallery-image"><img src="' + galleryImageLocation + '" lightbox="' + galleryHasLightbox + '" /></div><div class="gallery-text"><p>' + galleryImageDescription + '</p></div></div></div>';
    }
    additionalGalleriesString += '</section>';
    return additionalGalleriesString;
  };
  var buildNewGallery = function(galleryName) {
    var galleryInfo = retrieveGalleryInfo(galleryName);
    var mainGallery = buildMainGallery(galleryName, galleryInfo);
    var additionalGalleries = buildAdditionalGalleries(galleryInfo);
    var fullGallery = mainGallery + additionalGalleries;
    addGalleryToCache(galleryName, fullGallery);
    return fullGallery;
  };

  Gallery.loadGallery = function(galleryName) {
    var galleryString = '';
    var galleryInCache = checkForGalleryInCache(galleryName);
    if (galleryInCache) {
      galleryString = retrieveGalleryFromCache(galleryName);
    } else {
      galleryString = buildNewGallery(galleryName);
    }
    return galleryString;
  };

  var $guts = $('#guts');
  var galleryCache = {};

}(jQuery, window.Gallery = window.Gallery || {}));

(function($, GalleryAnimation, undefined) {

  var moveBackThroughGallery = function(previousButton) {
    $('.gallery-control').attr('disabled', 'disabled');
    $('.slide').animate({left: '+=100%'}, animationTime, function() {
      $('.gallery-control').removeAttr('disabled');
      if ($('.first').css('left') === '0px') {
        $('.previous').attr('disabled', 'disabled');
      }
    });
  };
  var moveForwardsThroughGallery = function(nextButton) {
    $('.gallery-control').attr('disabled', 'disabled');
    $('.slide').animate({left: '-=100%'}, animationTime, function() {
      $('.gallery-control').removeAttr('disabled');
      if ($('.last').css('left') === '0px') {
        $('.next').attr('disabled', 'disabled');
      }
    });
  };
  var bindUIActions = function() {
    $guts.on('click', '.previous', function() {
      moveBackThroughGallery(this);
    });
    $guts.on('click', '.next', function() {
      moveForwardsThroughGallery(this);
    });
  };

  GalleryAnimation.init = function() {
    bindUIActions();
  };

  $guts = $('#guts');
  animationTime = 400;

}(jQuery, window.GalleryAnimation = window.GalleryAnimation || {}));

(function($, Hashchange, undefined) {

  var sendGoogleAnalyticsEvent = function(label, value) {
    ga('send', 'event', 'Navigation', label, value);
  };
  var navigateTo = function(hash) {
    switch (hash) {
      case 'papn':
      case 'csh':
      case 'fb':
      case 'sns':
      case 'petershambora':
      case 'wtfdrink':
      case 'laura':
      case 'resizely':
      case 'cpsolutions':
        Navigation.removeActiveAttributeAndClass();
      default:
        Transition.kickOffTransition();
        break;
    }
  };
  var bindUIActions = function() {
    $(window).on('hashchange', function() {
      $('html, body').animate({ scrollTop: 0 }, 400);
      var hash = window.location.hash.substring(1);
      sendGoogleAnalyticsEvent('Click', 'hashchange');
      sendGoogleAnalyticsEvent('Event', '#' + hash);
      navigateTo(hash);
    });
  };

  Hashchange.init =  function() {
    bindUIActions();
  };

}(jQuery, window.Hashchange = window.Hashchange || {}));

(function($, Init, undefined) {

  var setHash = function() {
    var hash = window.location.hash.substring(1);
    if (hash === '') {
      return 'entrance';
    } else {
      return hash;
    }
  };

  Init.init = function() {
    var hash = setHash();
    Navigation.updateActiveClass('.' + hash + ' a');
    Navigation.updateDisabledAttribute('.' + hash + ' a');
    Content.loadPage(hash, function() {
      Transition.firstLoad();
    });
  };

}(jQuery, window.Init = window.Init || {}));

(function($, Lightbox, undefined) {

  var isMobile = function() {
    if ($('.nav-toggle').is(':visible')) {
      return true;
    } else {
      return false;
    }
  };
  var populateLightbox = function(clickedImage) {
    var imgSrc = $(clickedImage).attr('src');
    $lightboxImage.attr('src', imgSrc);
  };
  var openResume = function() {
    window.open('/resume.pdf', 'Tyler Shambora\'s Resume');
  };
  var openLightbox = function() {
    if (!isMobile()) {
      $lightbox.show();
    }
  };
  var closeLightbox = function() {
    $lightbox.hide();
  };
  var bindUIActions = function() {
    $guts.on('click', '.gallery img[lightbox="true"]', function() {
      populateLightbox(this);
      openLightbox();
    });
    $guts.on('click', '#resume .gallery-image', function() {
      openResume();
    });
    $lightbox.click(function() {
      closeLightbox();
    });
    $lightboxImage.click(function(e) {
      e.stopPropagation();
    });
  };

  Lightbox.init = function() {
    bindUIActions();
  };

  var $guts = $('#guts');
  var $lightbox = $('#lightbox');
  var $lightboxImage = $('#lightbox-image');

}(jQuery, window.Lightbox = window.Lightbox || {}));

(function($, Navigation, undefined) {

  var navToggleIsVisible = function() {
    if ($navToggle.is(':visible')) {
      return true;
    } else {
      return false;
    }
  };
  var toggleNavMenu = function() {
    $navItemExcludingLogo.toggle();
  };
  var hideNavMenu = function() {
    if (navToggleIsVisible()) {
      $navItemExcludingLogo.hide();
    }
  };
  var bindUIActions = function() {
    $navToggle.click(function() {
      toggleNavMenu();
    });
    $navItemLink.click(function() {
      hideNavMenu();
    });
    $navItemLink.click(function() {
      if (this.pathname === '/resume.pdf') {
        return;
      }
      Navigation.updateActiveClass(this);
      Navigation.updateDisabledAttribute(this);
    });
  };

  Navigation.updateActiveClass = function(activeNavLink) {
    $navItem.removeClass('is-active');
    $(activeNavLink).parent().addClass('is-active');
  };
  Navigation.updateDisabledAttribute = function(activeNavLink) {
    $navItemLink.removeAttr('disabled');
    $(activeNavLink).attr('disabled', 'disabled');
  };
  Navigation.removeActiveAttributeAndClass = function() {
    $navItem.removeClass('is-active');
    $navItem.children('a').removeAttr('disabled');
  };
  Navigation.init = function() {
    bindUIActions();
  };

  var $navItem = $('.nav-item');
  var $navItemLink = $('.nav-item a');
  var $navItemExcludingLogo = $('.nav-item:not(.logo)');
  var $navToggle = $('.nav-toggle');

}(jQuery, window.Navigation = window.Navigation || {}));

(function($, Permission, undefined) {

  var bindUIActions = function() {
    if (sessionStorage.wtfdrinkPermission !== true) {
      $guts.on('click', '.wtfdrink a', function(e) {
        e.preventDefault();
        $wtf.show();
      });
    }
    $('#no-way').click(function() {
      sessionStorage.setItem('wtfdrinkPermission', false);
      $wtf.hide();
    });
    $('#yes-way').click(function() {
      sessionStorage.setItem('wtfdrinkPermission', true);
      $wtf.hide();
      $guts.off('click', '.wtfdrink a');
      window.location.hash = 'wtfdrink';
    });
  };

  Permission.init = function() {
    bindUIActions();
  };

  var $guts = $('#guts');
  var $wtf = $('#wtf-overlay');

}(jQuery, window.Permission = window.Permission || {}));

(function($, Preload, undefined) {

  var gatherImageLocations = function() {
    var imageLocationsArray = [];
    for (var gallery in Resources.galleryInfo) {
      var galleryObject = Resources.galleryInfo[gallery];
      var marqueeImageLocation = galleryObject.marqueeImageLocation;
      var additionalGalleriesArray = galleryObject.additionalGalleries;
      imageLocationsArray.push(marqueeImageLocation);
      for (var i in additionalGalleriesArray) {
        var galleryItem = additionalGalleriesArray[i];
        var galleryItemImageLocation = galleryItem.imageLocation;
        imageLocationsArray.push(galleryItemImageLocation);
      }
    }
    return imageLocationsArray;
  };
  var buildImageObjects = function(imageLocations) {
    var images = [];
    for (i = 0; i < imageLocations.length; i++) {
      images[i] = new Image();
      images[i].src = imageLocations[i];
    }
  };
  var preLoadImages = function() {
    var imageLocations = gatherImageLocations();
    buildImageObjects(imageLocations);
  };
  var bindOnLoadEvents = function() {
    $(window).load(function() {
      preLoadImages();
    });
  };

  Preload.init = function() {
    bindOnLoadEvents();
  };

}(jQuery, window.Preload = window.Preload || {}));

(function($, Resources, undefined) {

  var loadFeatureTest = function() {
    yepnope({
      load: 'js/feature-test.min.js',
    });
  };
  var loadResources = function() {
    $.when(
      $.get('injected-html.html', function(data) {
        Resources.injectedHtml = $(data);
      }),
      $.getJSON('/js/gallery-info.json', function(data) {
        Resources.galleryInfo = data;
      })
    ).then(function() {
      Init.init();
    });
  };

  Resources.init = function() {
    loadFeatureTest();
    loadResources();
  };

  Resources.injectedHtml = '';
  Resources.galleryInfo = '';

}(jQuery, window.Resources = window.Resources || {}));

(function($, Transition, undefined) {

  var toggleContentFade = function() {
    $('.content').toggleClass('fadeIn fadeOut');
  };
  var toggleGutsSlide = function() {
    $guts.toggleClass('slideUp slideDown');
  };

  var eventsControler = function(originalEvent) {
    var hash = window.location.hash.substring(1);
    var $target = $(originalEvent.target);
    var propertyName = originalEvent.propertyName;
    var fadeOut = $target.hasClass('fadeOut');
    var fadeIn = $target.hasClass('fadeIn');
    var slideDown = $target.hasClass('slideDown');
    var slideUp = $target.hasClass('slideUp');
    var subGallery = $target.hasClass('sub');

    if (fadeOut && propertyName === "opacity") {
      if ((subGallery && hash === 'portfolio') || (subGalleries.indexOf(hash) > -1)) {
        Content.loadPage(hash, function() {
          setTimeout(function() {
            toggleContentFade();
          }, 100);
        });
      } else {
        toggleGutsSlide();
      }
    } else if (slideUp) {
      Content.loadPage(hash, function() {
        toggleGutsSlide();
      });
    } else if (slideDown) {
      toggleContentFade();
    }
  };
  var bindUIActions = function() {
    $guts.on('transitionend webkitTransitionEnd', function(event) {
      var originalEvent = event.originalEvent;
      eventsControler(originalEvent);
    });
  };

  Transition.firstLoad = function() {
    toggleGutsSlide();
  };
  Transition.kickOffTransition = function() {
    toggleContentFade();
  };
  Transition.init = function() {
    bindUIActions();
  };

  var $guts = $('#guts');
  var subGalleries = ["papn", "csh", "fb", "sns", "petershambora", "wtfdrink", "laura", "resizely", "cpsolutions"];

}(jQuery, window.Transition = window.Transition || {}));

(function($) {

  Resources.init();
  Navigation.init();
  Hashchange.init();
  Transition.init();
  GalleryAnimation.init();
  Contact.init();
  Lightbox.init();
  Permission.init();
  Preload.init();

})(jQuery);