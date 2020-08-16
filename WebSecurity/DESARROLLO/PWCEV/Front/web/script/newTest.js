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
      'Content-Type': 'application/json',
      //    'X-Auth-Token': token
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

function fnExcelReport() {
  var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
  var textRange;
  var j = 0;
  tab = document.getElementById('headerTable'); // id of table

  for (j = 0; j < tab.rows.length; j++) {
    tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
    //tab_text=tab_text+"</tr>";
  }

  tab_text = tab_text + "</table>";
  tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
  tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
  tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
  {
    txtArea1.document.open("txt/html", "replace");
    txtArea1.document.write(tab_text);
    txtArea1.document.close();
    txtArea1.focus();
    sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
  } else //other browser not tested on IE 11
    sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

  return (sa);
}


function cargarFecha() {
  //Datemask dd/mm/yyyy
  $('.miFecha').datepicker({
    format: "dd/mm/yyyy",
    language: "es"
});
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
  //$("#original").clone().appendTo("#containers");
  contador = 1;
  var copy = $("#descripcion").clone(true);
  var formId = 'opcion' + unique;
  copy.attr('id', formId);
  $('#original').append(copy);
  $('#' + formId).find("p", "label", "input").each(function () {
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
  copy.find('label, select').each(function () {
    $(this).attr('id', $(this).attr('id') + uniqueId);
    //  $(this).attr('id', $(this).attr('id') + uniqueId + '-' + index);
    //    $(this).attr('name', $(this).attr('name') + uniqueId);
    //  $(this).attr('value', $(this).attr('value') + uniqueId + '-' + index);
  });
  copy.find('label, select').each(function (index) {
    $(this).attr('for', $(this).attr('for') + uniqueId + '-' + index);
  });
  // Insert new form
  $('#campaign').append(copy);
}

function setNombre() {
  var user = Cookies.get('usuario');
  $('#nombreUser').text(user);

}

$(document).ready(function () {
  setNombre();
  cbo_escuela('cbo-eap', 'SOFTWARE');
  cbo_universidad('cbo-centro', 'UNMSM');
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
  var emailAlumnos= [];

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
    url: ruta +'/detallecurso/',
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
  Cargar_curso_id('cbocurso',1);
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

$(document).on('click', '#btn-pregunta', function (event) {
  $('#inputTituloModal').val($("#txtTitulo").text());
  $('#modalPregunta').modal('toggle');
});