(function($, Example, undefined) {
  'use strict';

  // -------------
  // Private Functions
  var addActiveCheckbox = function(value) {
    Example.activeCheckboxs.push(value);
  };
  var removeActiveCheckbox = function(value) {
    Example.activeCheckboxes.splice(Example.activeCheckboxes.indexOf(value), 1);
  };
  var bindUIActions = function() {
    $button.on('click', function() {
      $guts.empty();
    });
    $checkbox.on('change', function() {
      var checkboxValue = $(this).val();
      if ($(this).is(':checked')) {
        addActiveCheckbox(checkboxValue);
      } else {
        removeActiveCheckbox(checkboxValue);
      }
    });
  };


  // -------------
  // Public Functions
  Example.isGutsEmpty = function() {
    if ($guts.is(':empty')) {
      return true;
    } else {
      return false;
    }
  };
  Example.getActiveItems = function() {
    return activeCheckboxes;
  };
  Example.init = function() {
    bindUIActions();
  };


  // -------------
  // Private Vars
  var privateVar = 'thing';
  var $button = $('.my-button');
  var $checkbox = $('.my-form input[type="checkbox"]');
  var $guts = $('.guts');


  // -------------
  // Public Vars
  Example.activeCheckboxes = [];


}(jQuery, window.Example = window.Example || {}));
