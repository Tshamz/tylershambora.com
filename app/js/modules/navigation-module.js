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
  var bindUIActivity = function() {
    $navToggle.click(function() {
      toggleNavMenu();
    });
    $mainHeaderLink.click(function() {
      hideNavMenu();
    });
    $mainHeaderLink.click(function() {
      Navigation.updateActiveClass(this);
      Navigation.updateDisabledAttribute(this);
    });
  };

  Navigation.updateActiveClass = function(activeNavLink) {
    $mainHeaderNavItem.removeClass('is-active');
    $(activeNavLink).parent().addClass('is-active');
  };
  Navigation.updateDisabledAttribute = function(activeNavLink) {
    $mainHeaderLink.removeAttr('disabled');
    $(activeNavLink).attr('disabled', 'disabled');
  };
  Navigation.removeActiveAttributeAndClass = function() {
    $navItem.removeClass('is-active');
    $navItem.children('a').removeAttr('disabled');
  };
  Navigation.init = function() {
    bindUIActivity();
  };

  var $mainHeader = $('#main-header');
  var $mainHeaderNavItem = $mainHeader.find('.nav-item');
  var $mainHeaderLink = $mainHeader.find('a');
  var $navItemExcludingLogo = $mainHeader.find('.nav-item:not(.logo)');
  var $navToggle = $('.nav-toggle');

}(jQuery, window.Navigation = window.Navigation || {}));