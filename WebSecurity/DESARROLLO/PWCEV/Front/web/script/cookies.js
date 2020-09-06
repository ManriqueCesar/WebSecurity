
function refrescar() {
    location.reload(true);
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

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + "; ";
}


function updateNombre() {
    nombre = prompt("Da tu nombre nuevamente:", "");
    if (nombre != "" && nombre != null) {
        setCookie("nombre", nombre);
    }
}

function updateUsuario() {
    usuario = prompt("Da tu usuario nuevamente:", "");
    if (usuario != "" && usuario != null) {
        setCookie("usuario", usuario);
    }
}

