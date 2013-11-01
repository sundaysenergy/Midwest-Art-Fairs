$('#password').on('keyup focusin focusout', function() {
  // Add feedback after at least 1 character has been entered
  if ($(this).val().length > 0) {
    var p = $(this).val();
    var z = zxcvbn(p);
    // Change classes and attributes based on zxcvbn score (0-4)
    switch (z.score) {
      case 0:
        $('.progress-bar').css('width', '0');
        $(this).parent().addClass('has-error');
        $('.password-stronger').show();
        $('#proceed').attr('disabled', true);
        break;
      case 1:
        $('.progress-bar').css('width', '25%').addClass('progress-bar-danger').removeClass('progress-bar-warning progress-bar-success');
        $(this).parent().addClass('has-error');
        $('.password-stronger').show();
        $('#proceed').attr('disabled', true);
        break;
      case 2:
        $('.progress-bar').css('width', '50%').addClass('progress-bar-warning').removeClass('progress-bar-danger progress-bar-success');
        $(this).parent().removeClass('has-error');
        $('.password-stronger').hide();
        if ($('#passwordconfirm').val() == $(this).val()) {
          $('#proceed').attr('disabled', false);
          $('#passwordconfirm').parent().removeClass('has-error');
          $('.password-mismatch').hide();
        } else {
          $('#proceed').attr('disabled', true);
          $('#passwordconfirm').parent().addClass('has-error');
          $('.password-mismatch').show();
        }
        break
      case 3:
        $('.progress-bar').css('width', '75%').addClass('progress-bar-success').removeClass('progress-bar-danger progress-bar-warning');
        $(this).parent().removeClass('has-error');
        $('.password-stronger').hide();
        if ($('#passwordconfirm').val() == $(this).val()) {
          $('#proceed').attr('disabled', false);
          $('#passwordconfirm').parent().removeClass('has-error');
          $('.password-mismatch').hide();
        } else {
          $('#proceed').attr('disabled', true);
          $('#passwordconfirm').parent().addClass('has-error');
          $('.password-mismatch').show();
        }
        break;
      case 4:
        $('.progress-bar').css('width', '100%').addClass('progress-bar-success').removeClass('progress-bar-danger progress-bar-warning');
        $(this).parent().removeClass('has-error');
        $('.password-stronger').hide();
        if ($('#passwordconfirm').val() == $(this).val()) {
          $('#proceed').attr('disabled', false);
          $('#passwordconfirm').parent().removeClass('has-error');
          $('.password-mismatch').hide();
        } else {
          $('#proceed').attr('disabled', true);
          $('#passwordconfirm').parent().addClass('has-error');
          $('.password-mismatch').show();
        }
        break;
    } 
  } else {
    $('.progress-bar').css('width', '0');
  }
});

$('#passwordconfirm').on('keyup focusin focusout', function() {
  // Add feedback after at least 1 character has been entered
  if ($(this).val().length > 0) {
    // Compare password fields
    console.log($(this).val() == $('#password').val());
    switch ($(this).val() == $('#password').val()) {
      case false:
        $(this).parent().addClass('has-error');
        $('.password-mismatch').show();
        $('#proceed').attr('disabled', true);
        break;
      case true:
        $(this).parent().removeClass('has-error');
        $('.password-mismatch').hide();
        $('#proceed').attr('disabled', false);
        break;
    } 
  }
});