
function fn_rol(cboid, opcionxdefecto) {
  var token = getCookie('X-Auth-Token');
  $('#' + cboid).empty();
  $.ajax({
    async: false,
    cache: true,
    url: ipgeneral + '/users/rol',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    }
  }).done(function (data) {

    for (var x = 0; x < data.rol.length; x++) {
      $('#' + cboid).append('<option value="' + data.rol[x].rol + '">' + data.rol[x].rol + '</option>');
    }
    if (opcionxdefecto != null) $('#' + cboid).val(opcionxdefecto);
  });
}

function fn_dni(cboid, opcionxdefecto) {
  var token = getCookie('X-Auth-Token');
  $('#' + cboid).empty();
  $.ajax({
    async: false,
    cache: true,
    url: ipgeneral + '/canal/usuarios',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    }
  }).done(function (data) {
    for (var x = 0; x < data.usuario.length; x++) {
      if (data.usuario[x].estado == '1') {
        $('#' + cboid).append('<option value="' + data.usuario[x].id + '">' + data.usuario[x].nroDocumento + '</option>');
      } else {
        $('#' + cboid).append('<option disabled="disabled" value="' + data.usuario[x].id + '">' + data.usuario[x].nroDocumento + '</option>');
      }
    }
    if (opcionxdefecto != null) $('#' + cboid).val(opcionxdefecto);
  });
}


function fn_categoria(cboid, opcion) {
  $.getJSON('categoriausuario.json', function (data) {
    for (var x = 0; x < data.categoriausuario.length; x++) {
      $("#" + cboid).append('<option value="' + data.categoriausuario[x].categoriausuario.id + '">' + data.categoriausuario[x].categoriausuario.descripcion + '</option>');
    }
  })
}



$(document).ready(function () {
  var token = getCookie('X-Auth-Token');
  $('#vusuarios').addClass('active');
  $('#mseguridadpermisos').addClass('menu');
  $('[data-mask]').inputmask();
  $('.select2').select2()
  $('#cbodni').attr('disabled', 'disabled');


  $('#cbocategoria').on('change', function (e) {
    var comparar = $("#cbocategoria option:selected").text();
    if (comparar == "FREELANCE") {
      $('#cbodni').removeAttr('disabled');
      fn_dni('cbodni', -1);
    } else {
      $('#cbodni').empty();
      $('#cbodni').attr('disabled', 'disabled');
      $('#nombre').removeAttr('disabled');
      $('#apellidopaterno').removeAttr('disabled');
      $('#apellidomaterno').removeAttr('disabled');
      $('#email').removeAttr('disabled');
      $('#celular').removeAttr('disabled');
    }
  });

  $('#cbodni').on('change', function (e) {
    var comparardni = $("#cbodni option:selected").val();
    $.ajax({
      async: false,
      cache: true,
      url: ipgeneral + '/canal/usuarios',
      method: 'GET',
      beforeSend: function (request) {
        request.setRequestHeader("X-Auth-Token", token);
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      }
    }).done(function (data) {
      for (var x = 0; x < data.usuario.length; x++) {
        if (data.usuario[x].id == comparardni) {

          $('#nombre').val(data.usuario[x].nombre);
          $('#apellidopaterno').val(data.usuario[x].apellidoPaterno);
          $('#apellidomaterno').val(data.usuario[x].apellidoMaterno);
          $('#email').val(data.usuario[x].email);
          $('#celular').val(data.usuario[x].telefono);
          $('#nombre').attr('disabled', 'disabled');
          $('#apellidopaterno').attr('disabled', 'disabled');
          $('#apellidomaterno').attr('disabled', 'disabled');
          $('#email').attr('disabled', 'disabled');
          $('#celular').attr('disabled', 'disabled');
        }
      }
    });
  });

  var x = 0;
  $('#tbl-usuarios').DataTable({
    initComplete: function () {
      this.api().columns().every(function () {
        var column = this;
        x++;
        var select = $('<select class="cboselect" id="columna' + x + '" multiple="multiple" style="width: 100%;"><option value=""></option></select>')
          .appendTo($(column.header()).empty())
          //.appendTo($(column.footer()).empty())
          .on('change', function () {
            var vals = $('option:selected', this).map(function (index, element) {
              return $.fn.dataTable.util.escapeRegex($(element).val());
            }).toArray().join('|');

            column
              .search(vals.length > 0 ? '^(' + vals + ')$' : '', true, false)
              .draw();
          });

        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '">' + d + '</option>')
        });
      });

      $(".cboselect").select2({ closeOnSelect: false });
      $('#columna8').val(1).trigger('change');
    },

    ajax: {
      url: ipgeneral + '/users/users',
      dataSrc: 'userForm'
    },
    columns: [
      { data: 'id' },
      { data: 'categoriaUsuario' },
      { data: 'descripcionEmpresa' },
      { data: null, render: function (data, type, row) { return data.apellidoPaterno + ' ' + data.apellidoMaterno + ' ' + data.nombre } },
      { data: 'cargo' },
      { data: 'rol.descripcion' },
      { data: 'supervisor' },
      { data: 'estado' },
      { data: 'auditoria.usuario' },
      { data: 'auditoria.fecha' },
      {
        data: null,
        render: function (data, type, row) {
          if (data.estado == '1') {
            return '<button title="MODIFICAR" class="fa fa-edit" id="btn-modificar"  type="button"data-toggle="modal" data-target="#modal-default"></button>' +
              '<button id="btn-marcar" title="CAMBIAR ESTADO" class="fa fa-toggle-on" type="button"></button>' +
              '<button  id="btn-eliminar" title="ELIMINAR" class="fa fa-trash"  type="button"></button>';
          } else {
            return '<button title="MODIFICAR" class="fa fa-edit" id="btn-modificar"  type="button"data-toggle="modal" data-target="#modal-default"></button>' +
              '<button id="btn-marcar" title="CAMBIAR ESTADO" class="fa fa-toggle-off" type="button"></button>' +
              '<button id="btn-eliminar" title="ELIMINAR" class="fa fa-trash"  type="button"></button>';
          }
        }
      }]
  });
  $('#frm-usuarios').on('submit', function (e) {
    e.preventDefault();
    var id = $('#id').val();
    var auditoria = {};
    var request = {};
    var rol = {};
    //var supervisor = {};
    auditoria.usuario = getCookie('usuario');
    auditoria.origen = "WEB";
    auditoria.fecha = moment().format('YYYY-MM-DDThh:mm:ss') + 'Z';
    if (id == '') {
      id = null;
    }
    request.id = id;
    request.username = $('#txt-usuario').val();
    request.password = $('#clave').val();


    request.nombre = $('#nombre').val().toUpperCase();
    request.apellidoPaterno = $('#apellidopaterno').val().toUpperCase();
    request.apellidoMaterno = $('#apellidomaterno').val().toUpperCase();
    request.tipoDocumento = $("#buscartipodocumento option:selected").text();
    request.numDocumento = $("#cbodni option:selected").text();


    request.email = $('#email').val().toUpperCase();
    request.categoriaUsuario = $("#cbocategoria option:selected").text();
    request.descripcionEmpresa = $('#empresa').val().toUpperCase();
    request.telefonoCelular = $('#celular').val();
    request.firma = $('#firma').val();
    request.cargo = $('#carguito').val().toUpperCase();

    rol.descripcion = $("#cborol option:selected").text();

    request.rol = rol;
    request.ipsPermitidas = $("#ips").val();
    request.foto = $("#foto").val();
    request.estado = '1';
    request.supervisorId = $("#cbosupervisor option:selected").val();
    request.supervisor = $("#cbosupervisor option:selected").text();;
    request.auditoria = auditoria;


    $.ajax({
      url: ipgeneral + '/users/users',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      },
      data: JSON.stringify(request)
    }).done(function (data) {
      $('#tbl-usuarios').DataTable().ajax.reload(null, false);
      $('#modal-default').modal('toggle');
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.resultado.mensajeRespuesta);
    })
  });

  fn_categoria('cbocategoria', -1);
  fn_rol('cborol', -1);
  fn_supervisor('cbosupervisor', -1);

});


$(document).on('click', '#btn-cerrarsesion', function (event) {
  //sessionStorage.clear();
  deleteCookie();
  document.location.href = "index.html";
})
