
function refrescar() {
    location.reload(true);
}

function deleteCookie() {
    Cookies.remove('id');
    Cookies.remove('rol');
    Cookies.remove('nombre');
    Cookies.remove('usuario');
    Cookies.remove('apellido');
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

