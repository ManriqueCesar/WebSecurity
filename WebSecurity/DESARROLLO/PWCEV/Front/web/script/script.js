function iniciarVideo() {
  navigator.getUserMedia({
      video: {}
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

function loadLabeledImages(apellido) {
  const labels = [apellido];
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`../web/dist/js/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}

function validar_credenciales(sCorreo, sContrasena) {
  var ruta = 'https://api-pwcev.herokuapp.com';
  //var ruta = 'http://localhost:9090';
  request = {};
  request.email = sCorreo;
  request.password = sContrasena;
  $.ajax({
    url: ruta + '/usuarios/login',
    processData: false,
    type: 'POST',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    data: JSON.stringify(request),
  }).done(function (data) {
    $("#btn-ingresar").removeAttr('disabled');
    Cookies.set('apellido', data.apellido, {
      expires: 2
    });

    if (data.roles[0].nombre == 'ROLE_ALUM') {
      $('#modal-default').modal();
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('../web/dist/js/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('../web/dist/js/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('../web/dist/js/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('../web/dist/js/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('../web/dist/js/models')

      ]).then(iniciarVideo)
      iniciarVideo();

      Cookies.set('apellido', data.apellido, {
        expires: 200
      });
      Cookies.set('usuario', data.nombre + ' ' + data.apellido, {
        expires: 200
      });
      Cookies.set('nombre', data.nombre, {
        expires: 200
      });
      Cookies.set('id', data.idUsuario, {
        expires: 200
      });
    } else if (data.roles[0].nombre == 'ROLE_PROF') {
      Cookies.set('rol', data.roles[0].nombre, {
        expires: 200
      });
      Cookies.set('usuario', data.nombre + ' ' + data.apellido, {
        expires: 200
      });
      Cookies.set('nombre', data.nombre, {
        expires: 200
      });
      Cookies.set('id', data.idUsuario, {
        expires: 200
      });
      window.location.href = 'newTest.html';
    }

  }).fail(function (jqXHR, textStatus, errorThrown) {
    $("#btn-ingresar").removeAttr('disabled');
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    if (jqXHR.responseJSON.status == 500) {
      Toast.fire({
        icon: 'error',
        title: 'Correo o contraseña incorrectos'
      })
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Error. Por favor intente nuevamente'
      })
    }
    //alert(jqXHR.responseJSON.resultado.mensajeRespuesta);
  })
}

$(document).ready(function () {
  $('#txt-email').val('lwong@unmsm.edu.pe');
  $('#txt-password').val('1234');
  const video = document.getElementById('video')

  video.addEventListener('play', async () => {
    var apellido = Cookies.get('apellido');
    const labeledFaceDescriptors = await loadLabeledImages(apellido)
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    console.log(faceMatcher._labeledDescriptors)
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {
      width: video.width,
      height: video.height
    }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      console.log(results.toString());

      $("#alumnos").text(results.toString());
      console.log(Cookies.get('apellido'));
      var alumno = results.toString().includes(apellido);
      if (alumno == true) {
        $("#loading").text("Identidad confirmada, redireccionando...");
        console.log("bienvenido " + apellido);
        setTimeout(function () {
          Cookies.set('rol', data.roles[0].nombre, {
            expires: 200
          });
          document.location.href = "myExam.html";
        }, 5000);
      }
    }, 500)
  })
});

$('#btn-ingresar').click(function () {
  $("#btn-ingresar").attr('disabled', 'disabled');
  sCorreo = document.querySelector('#txt-email').value;
  sContrasena = document.querySelector('#txt-password').value;
  validar_credenciales(sCorreo, sContrasena);
});

$('#btn-close').click(function () {
  deleteCookie();
});