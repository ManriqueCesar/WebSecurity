


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

function editarTitulo() {
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
}

function editarDescripcion() {
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

}

function duplicarAlternativas(unique) {

  console.log("duplicandoAlternativas");
  //$("#original").clone().appendTo("#containers");
  contador = 1;
  var copy = $("#alternativas").clone(true);
  var formId = 'opcion' + unique;
  copy.attr('id', formId);
  $('#bloque').append(copy);
  $('#' + formId).find('input,select').each(function () {
    $(this).attr('id', $(this).attr('id') + unique);
    unique++;
  });
  contador++;
}

function duplicar(uniqueId,unique) {

  var copy = $("#original").clone(true);
  var formId = 'NewForm' + uniqueId;
  copy.attr('id', formId);
  $('#campaign').append(copy);

  $('#' + formId).find('input,select').each(function () {
    $(this).attr('id', $(this).attr('id') + uniqueId);

  });

}


$(document).ready(function () {
  $('.addRow').prop('disabled', true);
  cargarFecha();
  editarTitulo();
  editarDescripcion();
  var uniqueId = 1;
  var unique = 7;
  var contador = 0;


  //funcion para duplicar preguntas

  $('.addRow').click(function () {
   // duplicarAlternativas(unique);
    duplicar(uniqueId);

    uniqueId++;
    //unique++;

    contador++;
    if (contador > 8) {
      console.log('maximo')
      $('.addRow').prop('disabled', true);
    }
  });

  // $(document).on('change', '[type=radio]', function (e) {});



  $('#close').click(function () {
    console.log("asd1");
    var id = $(this).closest("form")
    console.log(id)
    $(".NewForm").remove();
    console.log("asd2");
  });

  
  $('#tabCurso').click(function () {
    console.log("curso");
    $('.addRow').prop('disabled', true);
  });


  $('#tabParam').click(function () {
    var titulo = $("#txtTitulo").text();
    console.log("aca");
    console.log(titulo);
    $('#inputTitulo').val(titulo);
    $('.addRow').prop('disabled', true);
  });

  $('#tabExamen').click(function () {
    console.log("examen");
    $('.addRow').prop('disabled', false);
  });


  $('#btn-crear').click(function ()
   {
    var texto =  $("#exampleFormControlTextarea1").val();
    console.log(texto);
    
  });






});