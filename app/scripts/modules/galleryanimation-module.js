/* jshint undef: false */

(function($, GalleryAnimation, undefined) {
  'use strict';

  var moveBackThroughGallery = function() {
    $('.gallery-control').attr('disabled', 'disabled');
    $('.slide').animate({left: '+=100%'}, animationTime, function() {
      $('.gallery-control').removeAttr('disabled');
      if ($('.first').css('left') === '0px') {
        $('.previous').attr('disabled', 'disabled');
      }
    });
  };
  var moveForwardsThroughGallery = function() {
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

  var $guts = $('#guts');
  var animationTime = 400;

}(jQuery, window.GalleryAnimation = window.GalleryAnimation || {}));
