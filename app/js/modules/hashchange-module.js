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