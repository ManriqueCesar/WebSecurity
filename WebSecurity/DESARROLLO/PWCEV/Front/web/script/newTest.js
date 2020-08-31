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







  var alternativa11 = $("#alternativa1-1").text("DEMO11");
  var alternativa12 = $("#alternativa1-2").text("DEMO12");
  var alternativa13 = $("#alternativa1-3").text("DEMO13");
  var alternativa14 = $("#alternativa1-4").text("DEMO14");
  var alternativa15 = $("#alternativa1-5").text("DEMO15");


  var alternativa21 = $("#alternativa2-1").text("DEMO21");
  var alternativa22 = $("#alternativa2-2").text("DEMO22");
  var alternativa23 = $("#alternativa2-3").text("DEMO23");
  var alternativa24 = $("#alternativa2-4").text("DEMO24");
  var alternativa25 = $("#alternativa2-5").text("DEMO25");

  var alternativa31 = $("#alternativa3-1").text("DEMO31");
  var alternativa32 = $("#alternativa3-2").text("DEMO32");
  var alternativa33 = $("#alternativa3-3").text("DEMO33");
  var alternativa34 = $("#alternativa3-4").text("DEMO34");
  var alternativa35 = $("#alternativa3-5").text("DEMO35");

  var alternativa41 = $("#alternativa4-1").text("DEMO41");
  var alternativa42 = $("#alternativa4-2").text("DEMO42");
  var alternativa43 = $("#alternativa4-3").text("DEMO43");
  var alternativa44 = $("#alternativa4-4").text("DEMO44");
  var alternativa45 = $("#alternativa4-5").text("DEMO45");

  var alternativa51 = $("#alternativa5-1").text("DEMO51");
  var alternativa52 = $("#alternativa5-2").text("DEMO52");
  var alternativa53 = $("#alternativa5-3").text("DEMO53");
  var alternativa54 = $("#alternativa5-4").text("DEMO54");
  var alternativa55 = $("#alternativa5-5").text("DEMO");





  var uniqueId = 1;
  var contador = 0;

  //funcion para duplicar preguntas
  /*  $('.addRow').click(function () {
      // duplicarAlternativas(unique);
      duplicar(uniqueId);
      uniqueId++;
      contador++;
      if (contador > 8) {
        console.log('maximo')
        $('.addRow').prop('disabled', true);
      }
    });*/

  // $(document).on('change', '[type=radio]', function (e) {});
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
    $('#exampleModalCenter').modal('toggle');
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("error")
  })
});

//demo
$(document).on('click', '#btn-demo', function (event) {


  var examen = {};
  var preguntaObjeto = {};
  var respuestas = [];
  var request = {};

  examen.idExamen = null;
  preguntaObjeto.idPregunta = 0;

  var estadoDefecto = false;
  var estadoRespuesta = true;
  var idRespuesta = null;
  var puntaje = 5;
  var idPregunta = null;


  /*examen y curso */

  var examenes={};

  var curso={};


  console.log(examenes);

  var titulo = $("#inputTitulo").val();
  var fechaInicio = $("#horaInicio").val();
  var horaInicio =$("#timepicker-two").val();
  var tiempoDuracion = $("#duracion").val();
  var cursoId = $("#cbocurso").val();

  examenes.titulo=titulo;
  examenes.fechaInicio=fechaInicio;
  examenes.horaInicio= horaInicio;
  examenes.tiempoDuracion= tiempoDuracion;
  curso.cursoId= cursoId;
  examenes.curso = curso;


  /* pregunta 1*/
  var descrip1 = $("#descripcion1").text();
  var alternativa11 = $("#alternativa1-1").val();
  var alternativa12 = $("#alternativa1-2").val();
  var alternativa13 = $("#alternativa1-3").val();
  var alternativa14 = $("#alternativa1-4").val();

  var preg1 = [descrip1, examen, idPregunta, puntaje];
  var respuesta1 = [alternativa11, estadoRespuesta, idRespuesta, preguntaObjeto];
  var respuesta2 = [alternativa12, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta3 = [alternativa13, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta4 = [alternativa14, estadoDefecto, idRespuesta, preguntaObjeto];

  /* pregunta 2 */

  var descrip2 = $("#descripcion2").text();
  var alternativa21 = $("#alternativa2-1").val();
  var alternativa22 = $("#alternativa2-2").val();
  var alternativa23 = $("#alternativa2-3").val();
  var alternativa24 = $("#alternativa2-4").val();

  var preg2 = [descrip2, examen, idPregunta, puntaje];
  var respuesta5 = [alternativa21, estadoRespuesta, idRespuesta, preguntaObjeto];
  var respuesta6 = [alternativa22, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta7 = [alternativa23, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta8 = [alternativa24, estadoDefecto, idRespuesta, preguntaObjeto];

  /* pregunta 3 */

  var descrip3 = $("#descripcion3").text();
  var alternativa31 = $("#alternativa3-1").val();
  var alternativa32 = $("#alternativa3-2").val();
  var alternativa33 = $("#alternativa3-3").val();
  var alternativa34 = $("#alternativa3-4").val();

  var preg3 = [descrip3, examen, idPregunta, puntaje];
  var respuesta9 = [alternativa31, estadoRespuesta, idRespuesta, preguntaObjeto];
  var respuesta10 = [alternativa32, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta11 = [alternativa33, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta12 = [alternativa34, estadoDefecto, idRespuesta, preguntaObjeto];

  /* pregunta 4 */

  var descrip4 = $("#descripcion4").text();
  var alternativa41 = $("#alternativa4-1").val();
  var alternativa42 = $("#alternativa4-2").val();
  var alternativa43 = $("#alternativa4-3").val();
  var alternativa44 = $("#alternativa4-4").val();

  var preg4 = [descrip4, examen, idPregunta, puntaje];
  var respuesta13 = [alternativa41, estadoRespuesta, idRespuesta, preguntaObjeto];
  var respuesta14 = [alternativa42, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta15 = [alternativa43, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta16 = [alternativa44, estadoDefecto, idRespuesta, preguntaObjeto];

  /* pregunta 5*/

  var descrip5 = $("#descripcion5").text();
  var alternativa51 = $("#alternativa5-1").val();
  var alternativa52 = $("#alternativa5-2").val();
  var alternativa53 = $("#alternativa5-3").val();
  var alternativa54 = $("#alternativa5-4").val();

  var preg5 = [descrip5, examen, idPregunta, puntaje];
  var respuesta17 = [alternativa51, estadoRespuesta, idRespuesta, preguntaObjeto];
  var respuesta18 = [alternativa52, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta19 = [alternativa53, estadoDefecto, idRespuesta, preguntaObjeto];
  var respuesta20 = [alternativa54, estadoDefecto, idRespuesta, preguntaObjeto];


  var respuestas = [
    respuesta1, respuesta2, respuesta3, respuesta4, respuesta5,
    respuesta6, respuesta7, respuesta8, respuesta9, respuesta10,
    respuesta11, respuesta12, respuesta13, respuesta14, respuesta15,
    respuesta16, respuesta17, respuesta18, respuesta19, respuesta20
  ];

  var preguntas = [
    preg1, preg2, preg3, preg4, preg5
  ];

  request.preguntas = preguntas;
  request.respuestas = respuestas;
  request.examenes = examenes;
  console.log(request);

});


//Crear curso
$(document).on('click', '#btn-crearExamen', function (event) {
  var ruta = 'https://api-pwcev.herokuapp.com';

  var examenes = {};
  var examen = {};
  var pregunta = {};
  var request = {};

  examen.idExamen = null;
  pregunta.idPregunta = 0;

  var estadoDefecto = false;
  var estadoRespuesta = true;
  var idRespuesta = null;
  var puntaje = 4;
  var idPregunta = null;

  /* pregunta 1*/

  var descrip1 = $("#descripcion1").text();
  var alternativa11 = $("#alternativa1-1").val();
  var alternativa12 = $("#alternativa1-2").val();
  var alternativa13 = $("#alternativa1-3").val();
  var alternativa14 = $("#alternativa1-4").val();

  var preg1 = [descrip1, examen, idPregunta, puntaje];
  var respuesta1 = [alternativa11, estadoRespuesta, idRespuesta, pregunta];
  var respuesta2 = [alternativa12, estadoDefecto, idRespuesta, pregunta];
  var respuesta3 = [alternativa13, estadoDefecto, idRespuesta, pregunta];
  var respuesta4 = [alternativa14, estadoDefecto, idRespuesta, pregunta];

  /* pregunta 2 */

  var descrip2 = $("#descripcion2").text();
  var alternativa21 = $("#alternativa2-1").val();
  var alternativa22 = $("#alternativa2-2").val();
  var alternativa23 = $("#alternativa2-3").val();
  var alternativa24 = $("#alternativa2-4").val();

  var preg2 = [descrip2, examen, idPregunta, puntaje];
  var respuesta5 = [alternativa21, estadoRespuesta, idRespuesta, pregunta];
  var respuesta6 = [alternativa22, estadoDefecto, idRespuesta, pregunta];
  var respuesta7 = [alternativa23, estadoDefecto, idRespuesta, pregunta];
  var respuesta8 = [alternativa24, estadoDefecto, idRespuesta, pregunta];

  /* pregunta 3 */

  var descrip3 = $("#descripcion3").text();
  var alternativa31 = $("#alternativa3-1").val();
  var alternativa32 = $("#alternativa3-2").val();
  var alternativa33 = $("#alternativa3-3").val();
  var alternativa34 = $("#alternativa3-4").val();

  var preg3 = [descrip3, examen, idPregunta, puntaje];
  var respuesta9 = [alternativa31, estadoRespuesta, idRespuesta, pregunta];
  var respuesta10 = [alternativa32, estadoDefecto, idRespuesta, pregunta];
  var respuesta11 = [alternativa33, estadoDefecto, idRespuesta, pregunta];
  var respuesta12 = [alternativa34, estadoDefecto, idRespuesta, pregunta];

  /* pregunta 4 */

  var descrip4 = $("#descripcion4").text();
  var alternativa41 = $("#alternativa4-1").val();
  var alternativa42 = $("#alternativa4-2").val();
  var alternativa43 = $("#alternativa4-3").val();
  var alternativa44 = $("#alternativa4-4").val();

  var preg4 = [descrip4, examen, idPregunta, puntaje];
  var respuesta13 = [alternativa41, estadoRespuesta, idRespuesta, pregunta];
  var respuesta14 = [alternativa42, estadoDefecto, idRespuesta, pregunta];
  var respuesta15 = [alternativa43, estadoDefecto, idRespuesta, pregunta];
  var respuesta16 = [alternativa44, estadoDefecto, idRespuesta, pregunta];

  /* pregunta 5*/

  var descrip5 = $("#descripcion5").text();
  var alternativa51 = $("#alternativa5-1").val();
  var alternativa52 = $("#alternativa5-2").val();
  var alternativa53 = $("#alternativa5-3").val();
  var alternativa54 = $("#alternativa5-4").val();

  var preg5 = [descrip5, examen, idPregunta, puntaje];
  var respuesta17 = [alternativa51, estadoRespuesta, idRespuesta, pregunta];
  var respuesta18 = [alternativa52, estadoDefecto, idRespuesta, pregunta];
  var respuesta19 = [alternativa53, estadoDefecto, idRespuesta, pregunta];
  var respuesta20 = [alternativa54, estadoDefecto, idRespuesta, pregunta];


  var respuestas = [
    respuesta1, respuesta2, respuesta3, respuesta4, respuesta5,
    respuesta6, respuesta7, respuesta8, respuesta9, respuesta10,
    respuesta11, respuesta12, respuesta13, respuesta14, respuesta15,
    respuesta16, respuesta17, respuesta18, respuesta19, respuesta20
  ];

  var preguntas = [
    preg1, preg2, preg3, preg4, preg5
  ];

  request.preguntas = preguntas;
  request.respuestas = respuestas;
  request.examen = examen;


});



$('#tabParam').click(function () {
  Cargar_curso_id('cbocurso', 1);
  var options = {
    now: "08:00", //hh:mm 24 hour format only, defaults to current time 
    twentyFour: false, //Display 24 hour format, defaults to false 
    upArrow: 'wickedpicker__controls__control-up', //The up arrow class selector to use, for custom CSS 
    downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS 
    close: 'wickedpicker__close', //The close class selector to use, for custom CSS 
    hoverState: 'hover-state', //The hover state class to use, for custom CSS 
    title: 'Horario', //The Wickedpicker's title, 
    showSeconds: false, //Whether or not to show seconds, secondsInterval: 1, //Change interval for seconds, defaults to 1 , 
    minutesInterval: 1, //Change interval for minutes, defaults to 1 
    beforeShow: null, //A function to be called before the Wickedpicker is shown 
    show: null, //A function to be called when the Wickedpicker is shown 
    clearable: false, //Make the picker's input clearable (has clickable "x") 
  };
  $('.timepicker').wickedpicker(options);

});


$('#btn-close').click(function () {
  deleteCookie();
});