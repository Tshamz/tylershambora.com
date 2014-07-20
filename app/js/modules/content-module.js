(function($, Content, undefined) {

  var removeOldContent = function() {
    $guts.children('section').remove();
  };

  var loadNewContent = function(hash) {
    $guts.prepend(Resources.injectedHtml.closest('#' + hash));
  };

  Content.loadPage = function(hash, callback) {
    removeOldContent();
    switch (hash) {
      case 'resume':
      case 'papn':
      case 'csh':
      case 'fb':
      case 'sns':
      case 'petershambora':
      case 'wtfdrink':
      case 'laura':
      case 'resizely':
      case 'cpsolutions':
        // Gallery Module
        break;
      case 'contact':
        // Contact Module
      default:
        loadNewContent(hash);
    }
    if (callback) {
      callback();
    }
  };

  var $guts = $('#guts');
  //var injectedHtml = Resources.injectedHtml;

}(jQuery, window.Content = window.Content || {}));