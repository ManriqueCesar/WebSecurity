const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../web/dist/js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../web/dist/js/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../web/dist/js/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('../web/dist/js/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('../web/dist/js/models')

]).then(iniciarVideo)

function iniciarVideo() {
  console.log('Inicio')
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
    var alumno = results.toString().includes("Cesar Manrique");
    if (alumno == true) {

      console.log("bienvenido Cesar Manrique");
      setTimeout(function () {
        document.location.href = "newTest.html";
        // rest of code here
      }, 5000);
    }
  }, 500)
})

function loadLabeledImages() {
  const labels = ['Cesar Manrique', 'Bryan Flores', 'Laurel Gabriela', 'Fernando Fuentes']
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

iniciarVideo();





// function obtenerListaUsuarios() {
//   var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLs'));

//   if (listaUsuarios == null) {
//     listaUsuarios = [
//       //1:docente, 2:alumno
//       //id,nombre,apellido,correo,contraseña,fnac,rol
//       ['1', 'Cesar', 'Manrique', 'cesar.manrique4@unmsm.edu.pe', 'cesar@123', '1994-07-17', '1'],
//       ['2', 'Fernando', 'Fuentes', 'fernando.alumno@unmsm.edu.pe', 'fernando@123', '2000-05-05', '2']
//     ]
//   }
//   return listaUsuarios;

// }

// function validarCredenciales(pCorreo, pContrasena) {
//   var listaUsuarios = obtenerListaUsuarios();
//   var bAcceso = false;

//   for (var i = 0; i < listaUsuarios.length; i++) {
//     if (pCorreo == listaUsuarios[i][3] && pContrasena == listaUsuarios[i][4]) {
//       bAcceso=true;
//       sessionStorage.setItem('usuarioActivo', listaUsuarios[i][1] + ' ' + listaUsuarios[i][2]);
//       sessionStorage.setItem('rolUsuarioActivo', listaUsuarios[i][6]);

//     }
//   }
//   return bAcceso;
// }

// function iniciarSesion() {
//   var sCorreo = '';
//   var sContrasena = '';
//   var bAcceso = false;


//   sCorreo = document.querySelector('#txt-email').value;
//   sContrasena = document.querySelector('#txt-password').value;
//   bAcceso = validarCredenciales(sCorreo, sContrasena);
//   console.log(bAcceso);

//   if (bAcceso == true) {
//     ingresar();
//   }


// }

// function ingresar() {
//   var rol = sessionStorage.getItem('rolUsuarioActivo');
//   console.log(rol);
//   switch (rol) {
//     case '1':
//       window.location.href='newTest.html';
//    //   document.location.href = "newTest.html";
//       break;
//     case '2':
//       window.location.href='waiting.html';
//       break;
//     default:
//       window.location.href='index.html';

//     break;
//   }
// }







$('#btn-ingresar').click(function () {
  // iniciarSesion();

  sCorreo = document.querySelector('#txt-email').value;
  sContrasena = document.querySelector('#txt-password').value;






});




function validar_credenciales(scorreo, sContrasena) {
  var ruta = 'https://api-pwcev.herokuapp.com';
  var user = 'front';
  var password = '12345';
  var username = scorreo;
  var password = sContrasena;

  var request={};
  request.user=user;
  request.password=password;
  
  request.username=username;
  request.password=password;


  $.ajax({
    url: ruta+'oauth/token',
    type: 'POST',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    },
    data: JSON.stringify(request)
  }).done(function (data) {
    if(data.)
    if ( == 'ROLE_ALUM'){
      window.location.href='waiting.html';
    } else if( == 'ROLE_PROFESOR'){
      window.location.href='newTest.html';
    }
    Cookies.set('correo',username,{expires:2});
    Cookies.set('usuario','',{expires:2});
    Cookies.set('cargo','',{expires:2});
  }).fail(function (jqXHR, textStatus, errorThrown) {
    alert(jqXHR.responseJSON.resultado.mensajeRespuesta);
  })

}
