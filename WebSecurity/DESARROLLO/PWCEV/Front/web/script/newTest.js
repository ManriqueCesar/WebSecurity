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





function validarRadio() {
  // Uncheck radio buttons in #group1 and #group2
  $('#group1 [type=radio]:checked, #group2 [type=radio]:checked').prop('checked', false).checkboxradio('refresh');
  // "OR" to select all radio buttons in DOM
  $('[type=radio]:checked').prop('checked', false).checkboxradio('refresh');
  // Check clicked radio
  $(this).prop('checked', true).checkboxradio('refresh');
}

$(document).ready(function () {
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

  $('#params').click(function () {
    var titulo = $("#txtTitulo").text();
    console.log(titulo);
    $('#inputTitulo').val(titulo);
  });

});