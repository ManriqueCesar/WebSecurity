


$(document).ready(function () {
  $('#txt-email').val('lwong@unmsm.edu.pe');
  $('#txt-password').val('1234');

  $('#btn-ingresar').click(function () {
    $("#btn-ingresar").attr('disabled', 'disabled');
    
  });$('#btn-ingresar').click(function () {
    $("#btn-ingresar").attr('disabled', 'disabled');
    
  });

});

$('#btn-ingresar').click(function () {
  $("#btn-ingresar").attr('disabled', 'disabled');
  
});

$('#formulario-login').click(function () {
  document.location.href = "newTest.html";
  
});



$('#btn-close').click(function () {
  deleteCookie();
});