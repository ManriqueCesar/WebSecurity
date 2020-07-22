function Cargar_curso_id(cboid, idUsuario) {
 // var token = getCookie('X-Auth-Token');
  $('#' + cboid).empty();
  $.ajax({
    async: false,
    cache: true,
    url: ipgeneral + '/detallecursos/usuario/1',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  //    'X-Auth-Token': token
    }
  }).done(function (data) {
    $('#' + cboid).append('<option></option>');
    for (var x = 0; x < data.clase.length; x++) {
        $('#' + cboid).append('<option value="' + data.curso[x].id + '">' + data.curso[x].curso + '</option>');
    }
    if (idUsuario != null) $('#' + cboid).val(idUsuario);
  });
}

function Cargar_curso(cboid, idUsuario) {
  // var token = getCookie('X-Auth-Token');
   $('#' + cboid).empty();
   $.ajax({
     async: false,
     cache: true,
     url: ipgeneral + '/cursos',
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
   //    'X-Auth-Token': token
     }
   }).done(function (data) {
     $('#' + cboid).append('<option></option>');
     for (var x = 0; x < data.clase.length; x++) {
         $('#' + cboid).append('<option value="' + data.curso[x].id + '">' + data.curso[x].curso + '</option>');
     }
     if (idUsuario != null) $('#' + cboid).val(idUsuario);
   });
 }

 function cbo_escuela(cboid, opcionxdefecto) {
  $.getJSON('json/eaps.json', function (data) {
    for (var x = 0; x < data.length; x++) {
      $("#" + cboid).append('<option value="' + data[x].value + '">' + data[x].descripcion + '</option>');
    }
    if (opcionxdefecto != null) $('#' + cboid).val(opcionxdefecto).trigger('change');

  })
 }

 function cbo_universidad(cboid, opcionxdefecto) {
  $.getJSON('json/universidades.json', function (data) {
    for (var x = 0; x < data.length; x++) {
      $("#" + cboid).append('<option value="' + data[x].value + '">' + data[x].descripcion + '</option>');
    }
    if (opcionxdefecto != null) $('#' + cboid).val(opcionxdefecto).trigger('change');

  })
 }



function cargarFecha() {
  //Initialize Select2 Elements
  //Initialize Select2 Elements
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

function duplicar(uniqueId) {
  // Clone
  var copy = $("#original").clone(true);

   // Set form id
  copy.attr('id', 'NewForm' + uniqueId);

  // Set inputs'id
  copy.find('input, select').each(function (index) {

    $(this).attr('id', $(this).attr('id') + uniqueId + '-' + index); 
    $(this).attr('name', $(this).attr('name') + uniqueId); 
    $(this).attr('value', $(this).attr('value') + uniqueId + '-' + index);
  });

  copy.find('label, select').each(function (index) {
    $(this).attr('for', $(this).attr('for') + uniqueId + '-' + index); 

  });


 
  // Insert new form
  $('#campaign').append(copy);
}


$(document).ready(function () {
  var ruta = 'https://api-pwcev.herokuapp.com';
  $('.addRow').prop('disabled', true);
  cbo_escuela('cbo-eap','SOFTWARE');
  cbo_universidad('cbo-centro','unmsm');
  cargarFecha();
  editarTitulo();
  editarDescripcion();
 // Cargar_curso('cbocurso',1);
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

  $('#btn-close').click(function () {
    deleteCookie();
    
  });




  $(document).on('click', '#btn-crear', function (event) {
    var request = {};
  

    request.alumnosEmail = $('#txt-alumnos').val();
		request.centroEstudios = $('#cbo-centro').val().toUpperCase();
    request.curso = $('#txt-curso').val();
    request.eap = $('#cbo-eap').text();
		request.periodo = $('#cbo-periodo').val();
    request.idCurso = null;

		$.ajax({
			url: ruta + '/cursos',
			type: 'POST',
			dataType: 'json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'//,
			//	'X-Auth-Token': token
			},
			data: JSON.stringify(request)
		}).done(function (data) {
			$('#exampleModalCenter').modal('toggle');
		}).fail(function (jqXHR, textStatus, errorThrown) {
      console.log("error")
		})
});




});