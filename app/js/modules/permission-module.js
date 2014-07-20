(function($, Permission, undefined) {

  var bindUIActivity = function() {
    if (sessionStorage.wtfdrinkPermission !== true) {
      $guts.on('click', '.wtfdrink a', function(e) {
        e.preventDefault();
        $wtf.show();
      });
    }
    $('#no-way').click(function() {
      sessionStorage.setItem('wtfdrinkPermission', false);
      $wtf.hide();
    });
    $('#yes-way').click(function() {
      sessionStorage.setItem('wtfdrinkPermission', true);
      $wtf.hide();
      $guts.off('click', '.wtfdrink a');
      window.location.hash = 'wtfdrink';
    });
  };

  Permission.init = function() {
    bindUIActivity();
  };

  var $guts = $('#guts');
  var $wtf = $('#wtf-overlay');

}(jQuery, window.Permission = window.Permission || {}));