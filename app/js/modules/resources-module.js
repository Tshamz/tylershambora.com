(function($, Resources, undefined) {

  var loadFeatureTest = function() {
    yepnope({
      load: 'js/feature-test.min.js',
    });
  };
  var loadResources = function() {
    $.when(
      $.get('page-fragments.html', function(data) {
        Resources.pageFragments = $(data);
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

  Resources.pageFragments = '';
  Resources.galleryInfo = '';

}(jQuery, window.Resources = window.Resources || {}));