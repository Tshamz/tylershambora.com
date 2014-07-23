(function($, Navigation, undefined) {

  var navToggleIsVisible = function() {
    if ($navToggle.is(':visible')) {
      return true;
    } else {
      return false;
    }
  };
  var toggleNavMenu = function() {
    $navItemExcludingLogo.toggle();
  };
  var hideNavMenu = function() {
    if (navToggleIsVisible()) {
      $navItemExcludingLogo.hide();
    }
  };
  var bindUIActions = function() {
    $navToggle.click(function() {
      toggleNavMenu();
    });
    $navItemLink.click(function() {
      hideNavMenu();
    });
    $navItemLink.click(function() {
      if (this.pathname === '/resume.pdf') {
        return;
      }
      Navigation.updateActiveClass(this);
      Navigation.updateDisabledAttribute(this);
    });
  };

  Navigation.updateActiveClass = function(activeNavLink) {
    $navItem.removeClass('is-active');
    $(activeNavLink).parent().addClass('is-active');
  };
  Navigation.updateDisabledAttribute = function(activeNavLink) {
    $navItemLink.removeAttr('disabled');
    $(activeNavLink).attr('disabled', 'disabled');
  };
  Navigation.removeActiveAttributeAndClass = function() {
    $navItem.removeClass('is-active');
    $navItem.children('a').removeAttr('disabled');
  };
  Navigation.init = function() {
    bindUIActions();
  };

  var $navItem = $('.nav-item');
  var $navItemLink = $('.nav-item a');
  var $navItemExcludingLogo = $('.nav-item:not(.nav-logo)');
  var $navToggle = $('.nav-toggle');

}(jQuery, window.Navigation = window.Navigation || {}));