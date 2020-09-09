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




window.onload = function () {
  TimeMe.trackTimeOnElement('area-of-interest-1');
  TimeMe.trackTimeOnElement('area-of-interest-2');
  setInterval(function () {
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
  var fechaActual = moment().format('HH:mm:ss');
  Cookies.set('fechaActual', fechaActual, {
    expires: 2
  });
  var userAp = Cookies.get('apellido');
  var idUser = Cookies.get('id');
  var idExamen = Cookies.get('idExamen');
  setNombre();
  document.getElementById('imgUser').src = "../web/dist/js/labeled_images/" + userAp + "/1.jpg";
  var ruta = 'https://api-pwcev.herokuapp.com';

  // Initialize library and start tracking time

  TimeMe.initialize({
    currentPageName: "my-home-page", // current page
    idleTimeoutInSeconds: 30 // seconds
  });

  $.ajax({
    url: ruta + '/examenes/' + idExamen,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).done(function (data) {
    console.log(data);
    var titulo = data.examen.titulo;

    $("#tituloExamen").text(titulo);

    /* pregunta 1*/
    var descripcion1 = data.preguntas[0].descripcion;
    var alternativa11 = data.respuestas[0].descripcion;
    var alternativa12 = data.respuestas[1].descripcion;
    var alternativa13 = data.respuestas[2].descripcion;
    var alternativa14 = data.respuestas[3].descripcion;

    /* pregunta 2*/
    var descripcion2 = data.preguntas[1].descripcion;
    var alternativa21 = data.respuestas[4].descripcion;
    var alternativa22 = data.respuestas[5].descripcion;
    var alternativa23 = data.respuestas[6].descripcion;
    var alternativa24 = data.respuestas[7].descripcion;


    /* pregunta 3*/
    var descripcion3 = data.preguntas[2].descripcion;
    var alternativa31 = data.respuestas[8].descripcion;
    var alternativa32 = data.respuestas[9].descripcion;
    var alternativa33 = data.respuestas[10].descripcion;
    var alternativa34 = data.respuestas[11].descripcion;

    /* pregunta 4*/
    var descripcion4 = data.preguntas[3].descripcion;
    var alternativa41 = data.respuestas[12].descripcion;
    var alternativa42 = data.respuestas[13].descripcion;
    var alternativa43 = data.respuestas[14].descripcion;
    var alternativa44 = data.respuestas[15].descripcion;

    /* pregunta 5*/
    var descripcion5 = data.preguntas[4].descripcion;
    var alternativa51 = data.respuestas[16].descripcion;
    var alternativa52 = data.respuestas[17].descripcion;
    var alternativa53 = data.respuestas[18].descripcion;
    var alternativa54 = data.respuestas[19].descripcion;

    /* pregunta 1*/
    $("#titulo1").text(descripcion1);

    $("#alternativa11").text(alternativa11);
    $("#alternativa12").text(alternativa12);
    $("#alternativa13").text(alternativa13);
    $("#alternativa14").text(alternativa14);

    /* pregunta 2*/
    $("#titulo2").text(descripcion2);
    $("#alternativa21").text(alternativa21);
    $("#alternativa22").text(alternativa22);
    $("#alternativa23").text(alternativa23);
    $("#alternativa24").text(alternativa24);

    /* pregunta 3*/
    $("#titulo3").text(descripcion3);
    $("#alternativa31").text(alternativa31);
    $("#alternativa32").text(alternativa32);
    $("#alternativa33").text(alternativa33);
    $("#alternativa34").text(alternativa34);

    /* pregunta 4*/
    $("#titulo4").text(descripcion4);
    $("#alternativa41").text(alternativa41);
    $("#alternativa42").text(alternativa42);
    $("#alternativa43").text(alternativa43);
    $("#alternativa44").text(alternativa44);

    /* pregunta 5*/
    $("#titulo5").text(descripcion5);
    $("#alternativa51").text(alternativa51);
    $("#alternativa52").text(alternativa52);
    $("#alternativa53").text(alternativa53);
    $("#alternativa54").text(alternativa54);


  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("error")
  })

});


//Mandar respuestas
$(document).on('click', '#btn-enviar', function (event) {
  var ruta = 'https://api-pwcev.herokuapp.com';
  // Retrieve time spent on current page
  var tiempo = TimeMe.getTimeOnCurrentPageInSeconds();
  var idExamen = Cookies.get('idExamen');
  var idUsuario = Cookies.get('id');
  var fechaInicioExamen = Cookies.get('fechaActual');
  $.ajax({
    url: ruta + '/examenes/' + idExamen,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).done(function (data) {
    var request = {};
    var respuestas = [];

    var fechaI = data.examen.fechaInicio;
    var horaI = data.examen.horaInicio;
    var duracion = data.examen.tiempoDuracion;
    var fechaEnvio = moment().format('HH:mm:ss');
    var horaFin = moment().format('HH:mm:ss');
    var fechaFin = moment(fechaInicio).add(duracion, 'minutes').format('YYYY-MM-DD HH:mm');
    var fechaInicio = fechaI + ' ' + horaI;
    if (fechaFin > fechaEnvio) {
      //optimizar
      if ($("input[id='answer-0-1']:radio").is(':checked')) {
        var respuestas1 = data.respuestas[0].idRespuesta;
      } else if ($("input[id='answer-0-2']:radio").is(':checked')) {
        var respuestas1 = data.respuestas[1].idRespuesta;
      } else if ($("input[id='answer-0-3']:radio").is(':checked')) {
        var respuestas1 = data.respuestas[2].idRespuesta;
      } else if ($("input[id='answer-0-4']:radio").is(':checked')) {
        var respuestas1 = data.respuestas[3].idRespuesta;
      }


      if ($("input[id='answer-1-1']:radio").is(':checked')) {
        var respuestas2 = data.respuestas[4].idRespuesta;
      } else if ($("input[id='answer-1-2']:radio").is(':checked')) {
        var respuestas2 = data.respuestas[5].idRespuesta;
      } else if ($("input[id='answer-1-3']:radio").is(':checked')) {
        var respuestas2 = data.respuestas[6].idRespuesta;
      } else if ($("input[id='answer-1-4']:radio").is(':checked')) {
        var respuestas2 = data.respuestas[7].idRespuesta;
      }


      if ($("input[id='answer-2-1']:radio").is(':checked')) {
        var respuestas3 = data.respuestas[8].idRespuesta;
      } else if ($("input[id='answer-2-2']:radio").is(':checked')) {
        var respuestas3 = data.respuestas[9].idRespuesta;
      } else if ($("input[id='answer-2-3']:radio").is(':checked')) {
        var respuestas3 = data.respuestas[10].idRespuesta;
      } else if ($("input[id='answer-2-4']:radio").is(':checked')) {
        var respuestas3 = data.respuestas[11].idRespuesta;
      }


      if ($("input[id='answer-3-1']:radio").is(':checked')) {
        var respuestas4 = data.respuestas[12].idRespuesta;
      } else if ($("input[id='answer-3-3']:radio").is(':checked')) {
        var respuestas4 = data.respuestas[13].idRespuesta;
      } else if ($("input[id='answer-3-3']:radio").is(':checked')) {
        var respuestas4 = data.respuestas[14].idRespuesta;
      } else if ($("input[id='answer-3-4']:radio").is(':checked')) {
        var respuestas4 = data.respuestas[15].idRespuesta;
      }

      if ($("input[id='answer-4-1']:radio").is(':checked')) {
        var respuestas5 = data.respuestas[16].idRespuesta;
      } else if ($("input[id='answer-4-2']:radio").is(':checked')) {
        var respuestas5 = data.respuestas[17].idRespuesta;
      } else if ($("input[id='answer-4-3']:radio").is(':checked')) {
        var respuestas5 = data.respuestas[18].idRespuesta;
      } else if ($("input[id='answer-4-4']:radio").is(':checked')) {
        var respuestas5 = data.respuestas[19].idRespuesta;
      }


      var respuesta1 = new Object();
      respuesta1.idPregunta = data.preguntas[0].idPregunta;
      respuesta1.idRespueta = respuestas1;

      var respuesta2 = new Object();
      respuesta2.idPregunta = data.preguntas[1].idPregunta;
      respuesta2.idRespueta = respuestas2;

      var respuesta3 = new Object();
      respuesta3.idPregunta = data.preguntas[2].idPregunta;
      respuesta3.idRespueta = respuestas3;

      var respuesta4 = new Object();
      respuesta4.idPregunta = data.preguntas[3].idPregunta;
      respuesta4.idRespueta = respuestas4;

      var respuesta5 = new Object();
      respuesta5.idPregunta = data.preguntas[4].idPregunta;
      respuesta5.idRespueta = respuestas5;

      respuestas[0] = respuesta1;
      respuestas[1] = respuesta2;
      respuestas[2] = respuesta3;
      respuestas[3] = respuesta4;
      respuestas[4] = respuesta5;

      //algoritmo antiplagio

      console.log(fechaInicioExamen);
     
      console.log("fechaInicioExamen " + fechaInicioExamen);
      console.log("fechaEnvio " + fechaEnvio);
      console.log('tiempo:  ' + tiempo);
      var FechaResta = moment().subtract(tiempo, 'seconds').format('HH:mm:ss');
      var tiempoFuera = moment.utc(moment(FechaResta, "HH:mm:ss").diff(moment(fechaInicioExamen, "HH:mm:ss"))).format("HH:mm:ss");
      console.log('fecharesta: ' + FechaResta);
      console.log('timeOut: ' + tiempoFuera);
      var timeOut= moment(tiempoFuera,'HH:mm:ss').seconds();


      request.tiempoFuera = timeOut;
      request.idExamen = idExamen;
      request.idUsuario = idUsuario;
      request.respuestas = respuestas;

      console.log(request);

      $.ajax({
        url: ruta + '/examenes/enviar',
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
          title: '¡Enviado correctamente!',
          text: "El examen ha concluido."
        })
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("error")
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: "El examen ha concluido."
      })
    }
  });
});


$('#btn-close').click(function () {
  deleteCookie();

});