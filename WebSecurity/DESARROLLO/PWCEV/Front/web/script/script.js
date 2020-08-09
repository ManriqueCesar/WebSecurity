const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../web/dist/js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../web/dist/js/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../web/dist/js/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('../web/dist/js/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('../web/dist/js/models')

]).then(iniciarVideo)

function iniciarVideo() {
  navigator.getUserMedia({
      video: {}
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', async () => {
  const labeledFaceDescriptors = await loadLabeledImages()
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
    apellido= Cookies.get('apellido');
    console.log('miApellido es '+ apellido);
    const alumno = results.toString().includes(apellido);
    Cookies.remove('apellido');
    if (alumno == true) {
      $("#loading").text("Identidad confirmada, redireccionando...")
      console.log("bienvenido " + apellido);
      setTimeout(function () {
        document.location.href = "waiting.html";
        // rest of code here
      }, 5000);
    }
  }, 500)
})

function loadLabeledImages() {
  const labels = ['Manrique Mayanga', 'Fuentes Ajra']
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



$(document).ready(function () {
  $('#txt-email').val('cmanrique@gmail.com');
  $('#txt-password').val('1234');
});

$('#btn-ingresar').click(function () {
  // iniciarSesion();
  $("#btn-ingresar").attr('disabled', 'disabled');
  sCorreo = document.querySelector('#txt-email').value;
  sContrasena = document.querySelector('#txt-password').value;
  validar_credenciales(sCorreo, sContrasena);
});



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
    console.log(data.nombre);
    console.log(data.apellido);
    console.log(data.roles[0].nombre);

    Cookies.set('apellido', data.apellido, {
      expires: 2
    });

    if (data.roles[0].nombre == 'ROLE_ALUM') {
      $('#modal-default').modal('toggle');
      iniciarVideo();
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
    console.log(jqXHR)
    if (jqXHR.responseJSON.status == 500) {
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        icon: 'error',
        title: 'Correo o contraseña incorrectos'
      })
    }
    //alert(jqXHR.responseJSON.resultado.mensajeRespuesta);
  })

}