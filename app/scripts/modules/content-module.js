/* jshint undef: false */
/* jshint indent: false */

(function($, Content, undefined) {
  'use strict';

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
        /* falls through */
      default:
        loadNewContent(Resources.pageFragments.closest('#' + hash));
        break;
    }
    if (callback) {
      callback();
    }
  };

  var $guts = $('#guts');

}(jQuery, window.Content = window.Content || {}));
