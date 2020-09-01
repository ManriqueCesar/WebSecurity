function setNombre() {
  var user = Cookies.get('usuario');
  $('#nombreUser').text(user);

}


$(document).ready(function () {
  setNombre();
  var idUser = Cookies.get('id');
  ruta = 'https://api-pwcev.herokuapp.com';
  var x = 0;
  $('#tbl-examenes').DataTable({
    "responsive": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    initComplete: function () {
      this.api().columns().every(function () {
        var column = this;
        x++;
        var select = $('<select class="cboselect" id="columna' + x + '" multiple="multiple" style="width: 100%; color:blue;"><option value=""></option></select>')
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

      $(".cboselect").select2({
        closeOnSelect: false,
        theme: "classic"
      });
      $('#columna1').val('2020-II').trigger('change');
      $('#columna2').val('UNMSM').trigger('change');
    },

    ajax: {
      url: ruta + '/resultado/examen/' + idUser,
      dataSrc: '',
      async: false,
      cache: true,
      error: function (jqXHR, textStatus, errorThrown) {
        $('#tbl-examenes').DataTable().clear().draw();
      }
    },
    columns: [{
        data: 'examen.curso.periodo'
      },
      {
        data: 'examen.curso.centroEstudios'
      },
      {
        data: 'examen.curso.eap'
      },
      {
        data: 'examen.curso.curso'
      },
      {
        data: 'examen.titulo'
      },
      {
        data: null,
        render: function (data, type, row) {
          return '<button title="LISTA" class="btn btn-primary" id="btn-listar">LISTA</button>';
        }

      }
    ]
  });


});


$(document).on('click', '#btn-listar', function (event) {
  $('#modal-alumnos').modal('toggle');
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-examenes').DataTable().row(currentRow).data();
  var id = data.idResultado;
  console.log(id)
  ruta = 'https://api-pwcev.herokuapp.com';
  var x = 0;
  $('#tbl-listado').DataTable({
    "destroy": true,
    "lengthChange": false,
    "searching": false,
    "autoWidth": false,
    "responsive": true,
    initComplete: function () {
      this.api().columns().every(function () {
        var column = this;

      });

      $(".cboselect").select2({
        closeOnSelect: false
      });
    },

    ajax: {
      url: ruta + '/resultado/examen/' + id,
      dataSrc: '',
      async: false,
      cache: false,
      error: function (jqXHR, textStatus, errorThrown) {
        $('#tbl-listado').DataTable().clear().draw();
      }
    },
    columns: [{
        data: null,
        render: function (data, type, row) {
          return data.usuario.apellido + ' ' + data.usuario.nombre
        }
      },
      {
        data: 'nota'
      },
      {
        data: null,
        render: function (data, type, row) {
          return data.tiempoFuera + ' ' + 'segundos'
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          if (data.estado == true) {
            return '<button id="btn-marcar" title="ANULAR EXAMEN"  type="button" class="btn btn-danger">ANULAR</button>';
          } else {
            return '<button id="btn-marcar" title="HABILITAR EXAMEN"  type="button" class="btn btn-success">HABILITAR</button>';
          }
        }
      }
    ]
  });


});


$(document).on('click', '#btn-marcar', function (event) {
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-examenes').DataTable().row(currentRow).data();
  var id = data.idUsuario;
  var estado = data['estado'];
  var request = {};
  if (estado == true) {
    estado = false;
  } else {
    estado = true;
  }
  request.id = id;
  request.clase = data['clase'];
  request.marca = data['marca'];
  request.modelo = data['modelo'];
  request.estado = estado;
  var auditoria = {};
  auditoria.usuario = getCookie('usuario');
  auditoria.origen = "WEB";
  auditoria.fecha = moment().format('YYYY-MM-DD hh:mm:ss');
  request.auditoria = auditoria;
  $.ajax({
    url: ipgeneral + '/autos/modelos',
    type: 'POST',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    },
    data: JSON.stringify(request)
  }).done(function (data) {
    $('#tbl-modelo').DataTable().ajax.reload(null, false);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    alert(jqXHR.responseJSON.resultado.mensajeRespuesta);
  })
});


$('#btn-close').click(function () {
  deleteCookie();
});