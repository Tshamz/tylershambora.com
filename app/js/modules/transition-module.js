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