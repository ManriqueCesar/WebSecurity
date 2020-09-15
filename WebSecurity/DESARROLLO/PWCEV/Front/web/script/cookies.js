
function setNombre() {
    var usuario = Cookies.get('usuario');
    $('#nombreUser').text(usuario);
  
  }
  function deleteCookie() {
    Cookies.remove('id');
    Cookies.remove('rol');
    Cookies.remove('nombre');
    Cookies.remove('usuario');
    Cookies.remove('apellido');
    Cookies.remove('idExamen');
    Cookies.remove('temp');
    Cookies.remove('idPregunta1');
    Cookies.remove('idPregunta2');
    Cookies.remove('idPregunta3');
    Cookies.remove('idPregunta4');
    Cookies.remove('idPregunta5');
}

