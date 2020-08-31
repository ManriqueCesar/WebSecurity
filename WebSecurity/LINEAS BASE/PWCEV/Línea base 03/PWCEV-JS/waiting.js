


function cargarFecha() {
  //Initialize Select2 Elements
  //Initialize Select2 Elements
  console.log("asdasd");
  //Datemask dd/mm/yyyy
  $('#datemask').inputmask('dd/mm/yyyy', {
    'placeholder': 'dd/mm/yyyy'
  })
  //Datemask2 mm/dd/yyyy
  $('#datemask2').inputmask('mm/dd/yyyy', {
    'placeholder': 'mm/dd/yyyy'
  })
  //Money Euro
  $('[data-mask]').inputmask()

  //Date range picker
  $('#reservationdate').datetimepicker({
    format: 'L'
  });
  //Date range picker
  $('#reservation').daterangepicker()
  //Date range picker with time picker
  $('#reservationtime').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: 'MM/DD/YYYY hh:mm A'
    }
  })
  //Timepicker
  $('#timepicker').datetimepicker({
    format: 'LT'
  })

}




window.onload = function(){
  TimeMe.trackTimeOnElement('area-of-interest-1');
  TimeMe.trackTimeOnElement('area-of-interest-2');
  setInterval(function(){
    var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    document.getElementById('timeInSeconds').textContent = timeSpentOnPage.toFixed(2);

 //   var timeSpentOnElement = TimeMe.getTimeOnElementInSeconds('area-of-interest-1');
 //   document.getElementById('area-of-interest-time-1').textContent = timeSpentOnElement.toFixed(2);

//    var timeSpentOnElement = TimeMe.getTimeOnElementInSeconds('area-of-interest-2');
//    document.getElementById('area-of-interest-time-2').textContent = timeSpentOnElement.toFixed(2);
  }, 25);
}

function setNombre() {
  var usuario = Cookies.get('usuario');
  $('#nombreUser').text(usuario);

}

$(document).ready(function () {
  var user = Cookies.get('apellido');
  setNombre();
  document.getElementById('imgUser').src = "../web/dist/js/labeled_images/" + user + "/1.jpg";
   // Initialize library and start tracking time
    // Initialize library and start tracking time
    TimeMe.initialize({
	currentPageName: "my-home-page", // current page
	idleTimeoutInSeconds: 30 // seconds
    });

    // ... Some time later ...

    // Retrieve time spent on current page
    var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();

});

$('#btn-close').click(function () {
  deleteCookie();

});









