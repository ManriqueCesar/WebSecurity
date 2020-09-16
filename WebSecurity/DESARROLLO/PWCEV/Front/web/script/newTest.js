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
  var fechaHoy = new Date();
  //Datemask dd/mm/yyyy
  $('.miFecha').datepicker({
    format: "yyyy-mm-dd",
    startDate: fechaHoy,
    language: 'es'
  }).on('changeDate', function (ev) {
    $('#miFecha').text($('#datepicker').data('date'));
    $('#datepicker').datepicker('hide');
  });
}

function editarTitulo() {
  var defaultTítulo = 'INGRESAR LA DESCRIPCIÓN DE LA PREGUNTA';

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

$(document).ready(function () {
  setNombre();
  editarTitulo();
  cbo_escuela('cbo-eap', 'SOFTWARE');
  cbo_universidad('cbo-centro', 'UNMSM');

  cargarFecha();

  $("#alternativa1-1").text("DEMO11");
  $("#alternativa1-2").text("DEMO12");
  $("#alternativa1-3").text("DEMO13");
  $("#alternativa1-4").text("DEMO14");

  $("#alternativa2-1").text("DEMO21");
  $("#alternativa2-2").text("DEMO22");
  $("#alternativa2-3").text("DEMO23");
  $("#alternativa2-4").text("DEMO24");

  $("#alternativa3-1").text("DEMO31");
  $("#alternativa3-2").text("DEMO32");
  $("#alternativa3-3").text("DEMO33");
  $("#alternativa3-4").text("DEMO34");

  $("#alternativa4-1").text("DEMO41");
  $("#alternativa4-2").text("DEMO42");
  $("#alternativa4-3").text("DEMO43");
  $("#alternativa4-4").text("DEMO44");

  $("#alternativa5-1").text("DEMO51");
  $("#alternativa5-2").text("DEMO52");
  $("#alternativa5-3").text("DEMO53");
  $("#alternativa5-4").text("DEMO54");


  $('#close').click(function () {
    console.log("asd1");
    var id = $(this).closest("form")
    console.log(id)
    $(".NewForm").remove();
  });
});

//Crear curso
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

    Swal.fire({
      icon: 'success',
      title: '¡Curso Creado!',
      text: 'Podrás verlo en Parámetros'
    })

    $('#cbo-periodo').val("");
    $('#txt-curso').val("");
    $('#txt-alumnos').val("");
  }).fail(function (jqXHR, textStatus, errorThrown) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: jqXHR.responseJSON.mensaje
    })
  })
});



//Crear examen
$(document).on('click', '#btn-crearExamen', function (event) {
  var ruta = 'https://api-pwcev.herokuapp.com';

  var examen = {};
  var preguntaObjeto = {};
  var request = {};
  var preguntas = [];
  var pregunta = {};
  pregunta.idPregunta = 0;
  var respuestas = [];
  examen.idExamen = null;

  preguntaObjeto.idPregunta = 0;

  var estadoDefecto = false;
  var estadoRespuesta = true;
  var idRespuesta = null;
  var puntaje = 4;
  var idPregunta = null;


  /*examen y curso */

  var curso = {};


  console.log(examen);

  var titulo = $("#inputTitulo").val();
  var fechaInicio = $("#horaInicio").val();
  var horaInicio = $("#timepicker-two").val();
  var tiempoDuracion = $("#duracion").val();
  var cursoId = $("#cbocurso").val();

  examen.titulo = titulo;
  examen.fechaInicio = fechaInicio;
  examen.horaInicio = horaInicio;
  examen.tiempoDuracion = tiempoDuracion;
  examen.descripcion = "Prohibido copiar";
  curso.idCurso = cursoId;
  examen.curso = curso;


  /* pregunta 1*/
  var descrip1 = $("#descripcion1").text();
  var alternativa11 = $("#alternativa1-1").val();
  var alternativa12 = $("#alternativa1-2").val();
  var alternativa13 = $("#alternativa1-3").val();
  var alternativa14 = $("#alternativa1-4").val();


  /* pregunta 2 */

  var descrip2 = $("#descripcion2").text();
  var alternativa21 = $("#alternativa2-1").val();
  var alternativa22 = $("#alternativa2-2").val();
  var alternativa23 = $("#alternativa2-3").val();
  var alternativa24 = $("#alternativa2-4").val();


  /* pregunta 3 */

  var descrip3 = $("#descripcion3").text();
  var alternativa31 = $("#alternativa3-1").val();
  var alternativa32 = $("#alternativa3-2").val();
  var alternativa33 = $("#alternativa3-3").val();
  var alternativa34 = $("#alternativa3-4").val();


  /* pregunta 4 */

  var descrip4 = $("#descripcion4").text();
  var alternativa41 = $("#alternativa4-1").val();
  var alternativa42 = $("#alternativa4-2").val();
  var alternativa43 = $("#alternativa4-3").val();
  var alternativa44 = $("#alternativa4-4").val();


  /* pregunta 5*/

  var descrip5 = $("#descripcion5").text();
  var alternativa51 = $("#alternativa5-1").val();
  var alternativa52 = $("#alternativa5-2").val();
  var alternativa53 = $("#alternativa5-3").val();
  var alternativa54 = $("#alternativa5-4").val();

  /* Arreglo de preguntas */

  var pregunta1 = new Object();
  pregunta1.descripcion = descrip1;
  pregunta1.idPregunta = idPregunta;
  pregunta1.puntaje = puntaje;
  pregunta1.examen = examen;

  var pregunta2 = new Object();
  pregunta2.descripcion = descrip2;
  pregunta2.idPregunta = idPregunta;
  pregunta2.puntaje = puntaje;
  pregunta2.examen = examen;

  var pregunta3 = new Object();
  pregunta3.descripcion = descrip3;
  pregunta3.idPregunta = idPregunta;
  pregunta3.puntaje = puntaje;
  pregunta3.examen = examen;

  var pregunta4 = new Object();
  pregunta4.descripcion = descrip4;
  pregunta4.idPregunta = idPregunta;
  pregunta4.puntaje = puntaje;
  pregunta4.examen = examen;

  var pregunta5 = new Object();
  pregunta5.descripcion = descrip5;
  pregunta5.idPregunta = idPregunta;
  pregunta5.puntaje = puntaje;
  pregunta5.examen = examen;


  preguntas[0] = pregunta1;
  preguntas[1] = pregunta2;
  preguntas[2] = pregunta3;
  preguntas[3] = pregunta4;
  preguntas[4] = pregunta5;

  /*arreglo de respuestas*/
  /* pregunta 1*/
  var respuesta1 = new Object();
  respuesta1.descripcion = alternativa11;
  respuesta1.estado = estadoRespuesta;
  respuesta1.idRespuesta = idRespuesta;
  respuesta1.pregunta = pregunta;

  var respuesta2 = new Object();
  respuesta2.descripcion = alternativa12;
  respuesta2.estado = estadoDefecto;
  respuesta2.idRespuesta = idRespuesta;
  respuesta2.pregunta = pregunta;

  var respuesta3 = new Object();
  respuesta3.descripcion = alternativa13;
  respuesta3.estado = estadoDefecto;
  respuesta3.idRespuesta = idRespuesta;
  respuesta3.pregunta = pregunta;

  var respuesta4 = new Object();
  respuesta4.descripcion = alternativa14;
  respuesta4.estado = estadoDefecto;
  respuesta4.idRespuesta = idRespuesta;
  respuesta4.pregunta = pregunta;


  /* pregunta 2*/
  var respuesta5 = new Object();
  respuesta5.descripcion = alternativa21;
  respuesta5.estado = estadoRespuesta;
  respuesta5.idRespuesta = idRespuesta;
  respuesta5.pregunta = pregunta;



  var respuesta6 = new Object();
  respuesta6.descripcion = alternativa22;
  respuesta6.estado = estadoDefecto;
  respuesta6.idRespuesta = idRespuesta;
  respuesta6.pregunta = pregunta;

  var respuesta7 = new Object();
  respuesta7.descripcion = alternativa23;
  respuesta7.estado = estadoDefecto;
  respuesta7.idRespuesta = idRespuesta;
  respuesta7.pregunta = pregunta;

  var respuesta8 = new Object();
  respuesta8.descripcion = alternativa24;
  respuesta8.estado = estadoDefecto;
  respuesta8.idRespuesta = idRespuesta;
  respuesta8.pregunta = pregunta;

  /* pregunta 3*/
  var respuesta9 = new Object();
  respuesta9.descripcion = alternativa31;
  respuesta9.estado = estadoRespuesta;
  respuesta9.idRespuesta = idRespuesta;
  respuesta9.pregunta = pregunta;

  var respuesta10 = new Object();
  respuesta10.descripcion = alternativa32;
  respuesta10.estado = estadoDefecto;
  respuesta10.idRespuesta = idRespuesta;
  respuesta10.pregunta = pregunta;


  var respuesta11 = new Object();
  respuesta11.descripcion = alternativa33;
  respuesta11.estado = estadoDefecto;
  respuesta11.idRespuesta = idRespuesta;
  respuesta11.pregunta = pregunta;

  var respuesta12 = new Object();
  respuesta12.descripcion = alternativa34;
  respuesta12.estado = estadoDefecto;
  respuesta12.idRespuesta = idRespuesta;
  respuesta12.pregunta = pregunta;

  /* pregunta 4*/
  var respuesta13 = new Object();
  respuesta13.descripcion = alternativa41;
  respuesta13.estado = estadoRespuesta;
  respuesta13.idRespuesta = idRespuesta;
  respuesta13.pregunta = pregunta;

  var respuesta14 = new Object();
  respuesta14.descripcion = alternativa42;
  respuesta14.estado = estadoDefecto;
  respuesta14.idRespuesta = idRespuesta;
  respuesta14.pregunta = pregunta;

  var respuesta15 = new Object();
  respuesta15.descripcion = alternativa43;
  respuesta15.estado = estadoDefecto;
  respuesta15.idRespuesta = idRespuesta;
  respuesta15.pregunta = pregunta;

  var respuesta16 = new Object();
  respuesta16.descripcion = alternativa44;
  respuesta16.estado = estadoDefecto;
  respuesta16.idRespuesta = idRespuesta;
  respuesta16.pregunta = pregunta;

  /* pregunta 5*/
  var respuesta17 = new Object();
  respuesta17.descripcion = alternativa51;
  respuesta17.estado = estadoRespuesta;
  respuesta17.idRespuesta = idRespuesta;
  respuesta17.pregunta = pregunta;

  var respuesta18 = new Object();
  respuesta18.descripcion = alternativa52;
  respuesta18.estado = estadoDefecto;
  respuesta18.idRespuesta = idRespuesta;
  respuesta18.pregunta = pregunta;

  var respuesta19 = new Object();
  respuesta19.descripcion = alternativa53;
  respuesta19.estado = estadoDefecto;
  respuesta19.idRespuesta = idRespuesta;
  respuesta19.pregunta = pregunta;

  var respuesta20 = new Object();
  respuesta20.descripcion = alternativa54;
  respuesta20.estado = estadoDefecto;
  respuesta20.idRespuesta = idRespuesta;
  respuesta20.pregunta = pregunta;


  respuestas[0] = respuesta1;
  respuestas[1] = respuesta2;
  respuestas[2] = respuesta3;
  respuestas[3] = respuesta4;
  respuestas[4] = respuesta5;
  respuestas[5] = respuesta6;
  respuestas[6] = respuesta7;
  respuestas[7] = respuesta8;
  respuestas[8] = respuesta9;
  respuestas[9] = respuesta10;
  respuestas[10] = respuesta11;
  respuestas[11] = respuesta12;
  respuestas[12] = respuesta13;
  respuestas[13] = respuesta14;
  respuestas[14] = respuesta15;
  respuestas[15] = respuesta16;
  respuestas[16] = respuesta17;
  respuestas[17] = respuesta18;
  respuestas[18] = respuesta19;
  respuestas[19] = respuesta20;



  request.examen = examen;
  request.preguntas = preguntas;
  request.respuestas = respuestas;

  document.getElementById('inputTitulo').value = '';
  document.getElementById('horaInicio').value = '';
  document.getElementById('duracion').value = '';
  document.getElementById('timepicker-two').value = '';
  $("#cbocurso").val(-1);

  $.ajax({
    url: ruta + '/examenes/',
    type: 'POST',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(request)
  }).done(function () {
    //limpiar

    Swal.fire({
      icon: 'success',
      title: '¡Examen Creado!',
      text: 'Podrás ver los detalles en Ver Exámenes',
    })
  }).fail(function (jqXHR, textStatus, errorThrown) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: jqXHR.responseJSON.mensaje + ' \n Verifica que todos los campos estén llenados correctamente',
    })
  })
});



$('#tabParam').click(function () {
  Cargar_curso_id('cbocurso', 1);
  var options = {
    timeFormat: 'HH:mm:ss',
    now: "08:00:00", //hh:mm 24 hour format only, defaults to current time 
    twentyFour: true, //Display 24 hour format, defaults to false 
    upArrow: 'wickedpicker__controls__control-up', //The up arrow class selector to use, for custom CSS 
    downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS 
    close: 'wickedpicker__close', //The close class selector to use, for custom CSS 
    hoverState: 'hover-state', //The hover state class to use, for custom CSS 
    title: 'Horario', //The Wickedpicker's title, 
    showSeconds: false, //Whether or not to show seconds, secondsInterval: 1, //Change interval for seconds, defaults to 1 , 
    minutesInterval: 1, //Change interval for minutes, defaults to 1 
    beforeShow: null, //A function to be called before the Wickedpicker is shown 
    show: null, //A function to be called when the Wickedpicker is shown 
    clearable: false, //Make the picker's input clearable (has clickable "x"),
    timeSeparator: ':'
  };
  $('.timepicker').wickedpicker(options);

});

$('#btn-asignarRespuestas').click(function () {
  Swal.mixin({
    html:
    '<label class="block"><input id="swal-radio" type="radio">A</label>' +
    '<label class="block"><input id="swal-radio" type="radio">B</label>'+
    '<label class="block"><input id="swal-radio" type="radio">C</label>'+
    '<label class="block"><input id="swal-radio" type="radio">D</label>',
    confirmButtonText: 'Siguiente &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3','4','5']
  }).queue([
    {
      title: 'Pregunta 1',
      text: 'Chaining swal2 modals is easy'
    },
    'Pregunta 2',
    'Pregunta 3',
    'Pregunta 4',
    'Pregunta 5'
  ]).then((result) => {
    if (result.value) {
      const answers = JSON.stringify(result.value)
      Swal.fire({ 
        title: 'Finalizado!',
        html: `
          Las claves son:
          <pre><code>${answers}</code></pre>
        `,
        confirmButtonText: 'Lovely!'
      })
    }
  })
});


$('#btn-close').click(function () {
  deleteCookie();
});


