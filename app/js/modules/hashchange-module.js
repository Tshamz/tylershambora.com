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