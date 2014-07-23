(function($, Contact, undefined) {

  function submitFinished(response) {
    response = $.trim(response);
    if (response === 'success') {
      $('.contact-status-message, .success-message').fadeIn().delay(messageDelay).fadeOut();
      $('#sender-name').val( '' );
      $('#sender-email').val( '' );
      $('#sender-message').val( '' );
      sessionStorage.removeItem('sender-name');
      sessionStorage.removeItem('sender-email');
      sessionStorage.removeItem('sender-message');
    } else {
      $('.contact-status-message, .failure-message').fadeIn().delay(messageDelay).fadeOut();
    }
  }
  function submitForm() {
    var $contactForm = $(this);
    if (!$('#sender-name').val() || !$('#sender-email').val() || !$('#sender-message').val()) {
      $('.contact-status-message, .incomplete-message').fadeIn().delay(messageDelay).fadeOut();
    } else {
      $.ajax( {
        url: $contactForm.attr('action') + '?ajax=true',
        type: $contactForm.attr('method'),
        data: $contactForm.serialize(),
        success: submitFinished
      });
    }
    return false;
  }
  var bindUIActions = function() {
    $guts.on('keyup', '.stored', function() {
      var fieldName = this.id;
      sessionStorage.setItem(fieldName, this.value);
    });
    $guts.on('submit', '#contact-form', submitForm);
  };

  Contact.repopulateForm = function() {
    for (var i = 0; i < sessionStorage.length; i++) {
      var storedValue = sessionStorage.getItem(sessionStorage.key(i));
      $('#' + sessionStorage.key(i)).val(storedValue);
    }
  };
  Contact.init = function() {
    bindUIActions();
  };

  var messageDelay = 2000;
  var $guts = $('#guts');

}(jQuery, window.Contact = window.Contact || {}));