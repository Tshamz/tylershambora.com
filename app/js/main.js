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
        url: $contactForm.attr( 'action' ) + '?ajax=true',
        type: $contactForm.attr( 'method' ),
        data: $contactForm.serialize(),
        success: submitFinished
      });
    }
    return false;
  }

  var bindUIActivity = function() {
    $guts.on('keyup', '.stored', function() {
      var fieldName = this.id;
      sessionStorage.setItem(fieldName, this.value);
    });
    $guts.on('submit', '#contact-form', submitForm);
  };

  Contact.repopulateForm = function() {
    for (var i = 0; i < sessionStorage.length; i++) {
      var storedValue = sessionStorage.getItem(sessionStorage.key(i));
      $('#' + sessionStorage.key(i).val(storedValue));
    }
  };

  Contact.init = function() {
    bindUIActivity();
  };

  var messageDelay = 2000;

  var $guts = $('#guts');

}(jQuery, window.Contact = window.Contact || {}));

(function($, Content, undefined) {

  var removeOldContent = function() {
    $guts.children('section').remove();
  };

  var loadNewContent = function(hash) {
    $guts.prepend(Resources.injectedHtml.closest('#' + hash));
  };

  Content.loadPage = function(hash, callback) {
    removeOldContent();
    switch (hash) {
      case 'resume':
      case 'papn':
      case 'csh':
      case 'fb':
      case 'sns':
      case 'petershambora':
      case 'wtfdrink':
      case 'laura':
      case 'resizely':
      case 'cpsolutions':
        // Gallery Module
        break;
      case 'contact':
        // Contact Module
      default:
        loadNewContent(hash);
    }
    if (callback) {
      callback();
    }
  };

  var $guts = $('#guts');
  //var injectedHtml = Resources.injectedHtml;

}(jQuery, window.Content = window.Content || {}));

(function($, Gallery, undefined) {



}(jQuery, window.Gallery = window.Gallery || {}));

(function($, Hashchange, undefined) {

  var sendGoogleAnalyticsEvent = function(label, value) {
    ga('send', 'event', 'Navigation', label, value);
  };
  var subGalleryTest = function(hash) {
    if($.inArray(hash, subGallery) >= 0) {

    }
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
      case 'portfolio':
        Transition.fadeOutFadeIn(hash);
        break;
      default:
        Transition.fadeThenSlide();
        setTimeout(function() {
          Content.loadPage(hash, function() {
            Transition.slideThenFade(hash);
          });
        }, Transition.fadeTransitionLength + Transition.slideTransitionLength);
    }
  };
  var bindUIActivity = function() {
    $(window).on('hashchange', function() {
      var hash = window.location.hash.substring(1);
      sendGoogleAnalyticsEvent('Click', 'hashchange');
      subGalleryTest(hash);
      navigateTo(hash);
    });
  };

  Hashchange.init =  function() {
    bindUIActivity();
  };

  var subGallery = ['papn', 'csh', 'fb', 'sns', 'petershambora', 'wtfdrink', 'laura', 'resizely', 'cpsolutions'];

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
    Navigation.updateActiveClass('.' + hash);
    Navigation.updateDisabledAttribute('.' + hash + ' a');
    Content.loadPage(hash, function() {
      Transition.slideThenFade(hash);
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
    $guts.on('click', $hasLightbox, function() {
      populateLightbox(this);
      openLightbox();
    });
    $guts.on('click', $resumeGalleryImage, function() {
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
  var $hasLightbox = $('.gallery img[lightbox="true"]');
  var $resumeGalleryImage = $('#resume .gallery-image');
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
  var bindUIActivity = function() {
    $navToggle.click(function() {
      toggleNavMenu();
    });
    $mainHeaderLink.click(function() {
      hideNavMenu();
    });
    $mainHeaderLink.click(function() {
      Navigation.updateActiveClass(this);
      Navigation.updateDisabledAttribute(this);
    });
  };

  Navigation.updateActiveClass = function(activeNavLink) {
    $mainHeaderNavItem.removeClass('is-active');
    $(activeNavLink).parent().addClass('is-active');
  };
  Navigation.updateDisabledAttribute = function(activeNavLink) {
    $mainHeaderLink.removeAttr('disabled');
    $(activeNavLink).attr('disabled', 'disabled');
  };
  Navigation.removeActiveAttributeAndClass = function() {
    $navItem.removeClass('is-active');
    $navItem.children('a').removeAttr('disabled');
  };
  Navigation.init = function() {
    bindUIActivity();
  };

  var $mainHeader = $('#main-header');
  var $mainHeaderNavItem = $mainHeader.find('.nav-item');
  var $mainHeaderLink = $mainHeader.find('a');
  var $navItemExcludingLogo = $mainHeader.find('.nav-item:not(.logo)');
  var $navToggle = $('.nav-toggle');

}(jQuery, window.Navigation = window.Navigation || {}));

(function($, Permission, undefined) {

  var bindUIActivity = function() {
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
    bindUIActivity();
  };

  var $guts = $('#guts');
  var $wtf = $('#wtf-overlay');

}(jQuery, window.Permission = window.Permission || {}));

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

  var sendGoogleAnalyticsEvent = function(label, value) {
    ga('send', 'event', 'Navigation', label, value);
  };
  var toggleContentFade = function() {
    $('.content').toggleClass('fadeIn fadeOut');
  };
  var toggleGutsSlide = function() {
    $guts.toggleClass('slideUp slideDown');
  };
  var scrollReset = function() {
    $root.animate({ scrollTop: 0 }, scrollSpeed);
  };

  Transition.fadeOutFadeIn = function(hash) {
    toggleContentFade();
    setTimeout(function() {
      Content.loadPage(hash, function() {
        toggleContentFade();
        scrollReset();
        sendGoogleAnalyticsEvent('Event', '#' + hash);
      });
    }, Transition.fadeTransitionLength);
  };
  Transition.slideThenFade = function(hash) {
    toggleGutsSlide();
    setTimeout(function() {
      toggleContentFade();
      scrollReset();
      sendGoogleAnalyticsEvent('Event', '#' + hash);
    }, Transition.slideTransitionLength);
  };
  Transition.fadeThenSlide = function() {
    toggleContentFade();
    setTimeout(function() {
      toggleGutsSlide();
    }, Transition.fadeTransitionLength);
  };

  var scrollSpeed = 400;

  var $guts = $('#guts');
  var $root = $('html, body');

  Transition.fadeTransitionLength = 100;
  Transition.slideTransitionLength = 1000;

}(jQuery, window.Transition = window.Transition || {}));

(function($) {

  Resources.init();
  // Content.init();
  Navigation.init();
  Hashchange.init();
  // Transition.init();
  // Gallery.init();
  Contact.init();
  Lightbox.init();
  Permission.init();

})(jQuery);