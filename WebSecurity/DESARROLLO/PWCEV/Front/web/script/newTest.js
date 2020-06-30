$(document).ready(function() {



var defaultTítulo = 'Ingresar el título del examen';

function endEdit(e) {
  var input = $(e.target),
      label = input && input.prev();

  label.text(input.val() === '' ? defaultTítulo : input.val());
  input.hide();
  label.show();
}

$('.clickedit').hide()
.focusout(endEdit)
.keyup(function (e) {
  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
      endEdit(e);
      return false;
  } else {
      return true;
  }
})
.prev().click(function () {
  $(this).hide();
  $(this).next().show().focus();
});

var defaultDescripción = 'Ingresar la descripción';

function endEdit2(e) {
  var input = $(e.target),
      label = input && input.prev();

  label.text(input.val() === '' ? defaultDescripción : input.val());
  input.hide();
  label.show();
}

$('.clickedit2').hide()
.focusout(endEdit2)
.keyup(function (e) {
  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
      endEdit(e);
      return false;
  } else {
      return true;
  }
})
.prev().click(function () {
  $(this).hide();
  $(this).next().show().focus();
});







$(function () {
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
  //Date range as a button
  $('#daterange-btn').daterangepicker({
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf(
          'month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    },
    function (start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }
  )

  //Timepicker
  $('#timepicker').datetimepicker({
    format: 'LT'
  })

})

var uniqueId = 1;
$(function() {
     $('.addRow').click(function() {

      //$("#original").clone().appendTo("#containers");
         var copy = $("#original").clone(true);
         var formId = 'NewForm' + uniqueId;
         copy.attr('id', formId );
         $('#campaign').append(copy);
         $('#' + formId).find('input,select').each(function(){
            $(this).attr('id', $(this).attr('id') + uniqueId); 
             
         });
         uniqueId++; 
     });
});

contador = 0;




$('#close').click(function () {
  console.log("asd1");
  var id = $(this).closest("form")
  console.log(id)
  $( ".NewForm" ).remove();
  console.log("asd2");
});




});


$('.addRow').mousedown(function() {
  contador++;
  console.log(contador)
  if(contador>9){
    console.log('maximo')
    $('.addRow').prop('disabled', true);

  }
  //$( this ).append( "<span style='color:#00f;'>Mouse down.</span>" );
});