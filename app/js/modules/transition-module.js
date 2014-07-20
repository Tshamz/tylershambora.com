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