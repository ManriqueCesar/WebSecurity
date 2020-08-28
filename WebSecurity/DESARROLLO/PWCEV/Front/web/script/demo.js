
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

function Cargar_curso_id(cboid, opcionxdefecto) {
  var idUsuario = Cookies.get('id');
  var ruta = 'https://api-pwcev.herokuapp.com';
  $('#' + cboid).empty();
  $.ajax({
    async: false,
    cache: true,
    url: ruta + '/detallecurso/usuario/' + idUsuario,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).done(function (data) {
    $('#' + cboid).append('<option></option>');
    for (var x = 0; x < data.length; x++) {
      $('#' + cboid).append('<option value="' + data[x].idCurso + '">' + data[x].curso + '</option>');
    }
    if (opcionxdefecto != null) $('#' + cboid).val(opcionxdefecto);
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
  //Datemask dd/mm/yyyy
  $('.miFecha').datepicker({
    format: "dd/mm/yyyy",
    language: "es"
  });
}




function setNombre() {
  var user = Cookies.get('usuario');
  $('#nombreUser').text(user);

}

$(document).ready(function () {
  setNombre();
  editarTitulo();
  cbo_escuela('cbo-eap', 'SOFTWARE');
  cbo_universidad('cbo-centro', 'UNMSM');
  $('.addRow').prop('disabled', true);
  cargarFecha();

  var uniqueId = 1;
  var contador = 0;

  //funcion para duplicar preguntas
  $('.addRow').click(function () {
    // duplicarAlternativas(unique);
    duplicar(uniqueId);
    uniqueId++;
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
  });
});


$(document).on('click', '#btn-crear', function (event) {
  var ruta = 'https://api-pwcev.herokuapp.com';

  //algoritmo para asignar los alumnos en un array
  var alumnos = $('#txt-alumnos').val();
  listaAlumnos = alumnos.split('\n');
  arregloAlumnos = [];
  arregloAlumnos = arregloAlumnos.concat(listaAlumnos);
  console.log(arregloAlumnos);
  //fin algoritmo

  var curso = {};
  var request = {};
  var id = Cookies.get('id');
  
  curso.centroEstudios = $('#cbo-centro').val().toUpperCase();
  curso.curso = $('#txt-curso').val();
  curso.eap = $('#cbo-eap').val().toUpperCase();
  curso.periodo = $('#cbo-periodo').val();
  curso.idCurso = null;
  request.curso = curso;
  request.idUsuario = id;
  request.emailAlumnos = arregloAlumnos;
  request.idDetalleCurso = null;
  $.ajax({
    url: ruta + '/detallecurso/',
    type: 'POST',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(request)
  }).done(function () {
    $('#exampleModalCenter').modal('toggle');
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("error")
  })
});



$('#btn-close').click(function () {
  deleteCookie();
});

$('#tabCurso').click(function () {
  $('.addRow').prop('disabled', true);
});

$('#tabParam').click(function () {
  Cargar_curso_id('cbocurso', 1);
  var options = {
    now: "12:35", //hh:mm 24 hour format only, defaults to current time 
    twentyFour: false, //Display 24 hour format, defaults to false 
    upArrow: 'wickedpicker__controls__control-up', //The up arrow class selector to use, for custom CSS 
    downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS 
    close: 'wickedpicker__close', //The close class selector to use, for custom CSS 
    hoverState: 'hover-state', //The hover state class to use, for custom CSS 
    title: 'Timepicker', //The Wickedpicker's title, 
    showSeconds: false, //Whether or not to show seconds, secondsInterval: 1, //Change interval for seconds, defaults to 1 , 
    minutesInterval: 1, //Change interval for minutes, defaults to 1 
    beforeShow: null, //A function to be called before the Wickedpicker is shown 
    show: null, //A function to be called when the Wickedpicker is shown 
    clearable: false, //Make the picker's input clearable (has clickable "x") 
  };
  $('.timepicker').wickedpicker(options);


  var titulo = $("#txtTitulo").text();
  $('#inputTitulo').val(titulo);
  $('.addRow').prop('disabled', true);
});

$('#tabExamen').click(function () {
  $('.addRow').prop('disabled', false);
});

$('#pruebatab').click(function () {
  $('<div>').append($(html).find('a').unwrap()).html();
});



$(document).on('click', '#btn-pregunta', function (event) {
  $('#inputTituloModal').val($("#txtTitulo").text());
  $('#modalPregunta').modal('toggle');
  var id = $(this).attr("btn-pregunta", "descripcion")

  //capturar id
  var labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor != '') {
      var elem = document.getElementById(labels[i].htmlFor);
      if (elem)
        elem.label = labels[i];

    }
  }
  var miId = $(labels[1]).attr("id");
  console.log(miId);




  $(this).attr('valor', 'descripcion');




   $(this).attr('id', $(this).attr('id') + uniqueId + '-' + index);
   $(this).attr('name', $(this).attr('name') + uniqueId);
  $(this).attr('value', $(this).attr('value') + uniqueId + '-' + index);
});



// var descripcion = $("#descripcion").text();
//  $('#tituloDescripcion').text();
// console.log($("#descripcion").text())