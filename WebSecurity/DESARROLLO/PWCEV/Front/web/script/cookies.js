
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var nombre = getCookie("nombre");
    var usuario = getCookie("usuario");
    if (nombre != "" && usuario != "") {
        alert("Hola " + nombre + " tu usuario es: " + usuario);
    } else {
        nombre = prompt("Da tu nombre:", "");
        if (nombre != "" && nombre != null) {
            setCookie("nombre", nombre);
        }
        usuario = prompt("Da tu usuario:", "");
        if (usuario != "" && usuario != null) {
            setCookie("usuario", usuario);
            alert("refresca la página");
        }
    }
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

