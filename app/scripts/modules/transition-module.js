/* jshint undef: false */
/* jshint indent: false */

(function($, Transition, undefined) {
  'use strict';

  var toggleContentFade = function() {
    $('.content').toggleClass('fadeIn fadeOut');
  };
  var toggleGutsSlide = function() {
    $guts.toggleClass('slideUp slideDown');
  };
  var whatJustHappened = function(originalEvent) {
    var completedTransition = '';
    var hash = window.location.hash.substring(1);
    var $target = $(originalEvent.target);
    var propertyName = originalEvent.propertyName;
    var enteringSubGallery = subGalleries.indexOf(hash) > -1;
    var leavingSubGallery = $target.hasClass('sub');
    var enteringPortfolio = hash === 'portfolio';
    if ($target.hasClass('fadeOut') && propertyName === 'opacity') {
      completedTransition = 'fadeOut';
    } else if ($target.hasClass('slideDown')) {
      completedTransition = 'slideDown';
    } else if ($target.hasClass('slideUp')) {
      completedTransition = 'slideUp';
    }
    return {
      'completedTransition': completedTransition,
      'hash': hash,
      'enteringSubGallery': enteringSubGallery,
      'leavingSubGallery': leavingSubGallery,
      'enteringPortfolio': enteringPortfolio
    };
  };
  var eventsControler = function(transitionInformation) {
    var hash = transitionInformation.hash;
    var completedTransition = transitionInformation.completedTransition;
    var enteringSubGallery = transitionInformation.enteringSubGallery;
    var leavingSubGallery = transitionInformation.leavingSubGallery;
    var enteringPortfolio = transitionInformation.enteringPortfolio;
    switch (completedTransition) {
      case 'fadeOut':
        if (enteringSubGallery || (leavingSubGallery && enteringPortfolio)) {
          Content.loadPage(hash, function() {
            setTimeout(function() {
              toggleContentFade();
            }, 100);
          });
        } else {
          setTimeout(function() {
            toggleGutsSlide();
          }, 100);
        }
        break;
      case 'slideUp':
        Content.loadPage(hash, function() {
          toggleGutsSlide();
        });
        break;
      case 'slideDown':
        toggleContentFade();
        break;
    }
  };
  var bindUIActions = function() {
    $guts.on('transitionend webkitTransitionEnd', function(event) {
      var originalEvent = event.originalEvent;
      var transitionInformation = whatJustHappened(originalEvent);
      eventsControler(transitionInformation);
    });
  };

  Transition.init = function() {
    bindUIActions();
  };
  Transition.firstLoad = function() {
    toggleGutsSlide();
  };
  Transition.kickOffTransition = function() {
    toggleContentFade();
  };

  var $guts = $('#guts');
  var subGalleries = ['papn', 'csh', 'fb', 'sns', 'petershambora', 'wtfdrink', 'laura', 'resizely', 'cpsolutions'];

}(jQuery, window.Transition = window.Transition || {}));
