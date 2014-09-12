/* jshint undef: false */

(function($, Resources, undefined) {
  'use strict';

  var loadFeatureTest = function() {
    yepnope({
      load: 'scripts/feature-test.js',
    });
  };
  var loadResources = function() {
    $.when(
      $.get('page-fragments.html', function(data) {
        Resources.pageFragments = $(data);
      }),
      $.getJSON('scripts/gallery-info.json', function(data) {
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

  Resources.pageFragments = '';
  Resources.galleryInfo = '';

}(jQuery, window.Resources = window.Resources || {}));
