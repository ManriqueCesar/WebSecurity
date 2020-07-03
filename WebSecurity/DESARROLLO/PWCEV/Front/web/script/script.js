

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
  navigator.getUserMedia(
    { video: {} },
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
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    console.log(results.toString());
   
    var alumno = results.toString().includes("CesarManrique");
    if(alumno == true){
      $("#alumnos").text(results.toString());
      console.log("bienvenido Cesar");
    }
  }, 500)
})

function loadLabeledImages() {
  const labels = ['Cesar Manrique','Black Widow', 'Captain America', 'Hawkeye','Fernando Fuentes']
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