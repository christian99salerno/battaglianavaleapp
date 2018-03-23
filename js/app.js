$('#play').on('click', function () {
  var loginForm = $("#loginForm");

  $(this).addClass('bounceOutLeft');

  loginForm.css('display', 'block');
  loginForm.addClass('bounceInRight');
});
