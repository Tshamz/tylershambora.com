(function($, Init, undefined) {

  var setHash = function() {
    var hash = window.location.hash.substring(1);
    if (hash === '') {
      return 'entrance';
    } else {
      return hash;
    }
  };

  Init.init = function() {
    var hash = setHash();
    Navigation.updateActiveClass('.' + hash);
    Navigation.updateDisabledAttribute('.' + hash + ' a');
    Content.loadPage(hash, function() {
      Transition.slideThenFade(hash);
    });
  };

}(jQuery, window.Init = window.Init || {}));