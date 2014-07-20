(function($, Resources, undefined) {

  var loadFeatureTest = function() {
    yepnope({
      load: 'js/feature-test.min.js',
    });
  };

  var loadResources = function() {
    $.when(
      $.get('injected-html.html', function(data) {
        Resources.injectedHtml = $(data);
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

  Resources.injectedHtml = '';
  Resources.galleryInfo = '';

}(jQuery, window.Resources = window.Resources || {}));