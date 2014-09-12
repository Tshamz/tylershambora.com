/* jshint undef: false */

(function($, Lightbox, undefined) {
  'use strict';

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
