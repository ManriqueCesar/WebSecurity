$(document).ready(function () {
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: '¡Recuerda refrescar la página!',
    showConfirmButton: false,
    timer: 2500
  })
  var user = Cookies.get('apellido');
  var idUser = Cookies.get('id');
  setNombre();
  document.getElementById('imgUser').src = "../web/dist/js/labeled_images/" + user + "/1.jpg";

  ruta = 'https://api-pwcev.herokuapp.com';
  var x = 0;

  Cookies.set('temp', 1, {
    expires: 2000
  });

  $('#tbl-misExamenes').DataTable({
    "colReorder": true,
    "responsive": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "searching": true,
    "language": {
      "sSearch": "Buscar:",
      "zeroRecords": "No se encontraron resultados",
      "info": "Mostrando exámenes del _START_ al _END_ , de un total de _TOTAL_ exámenes",
      "infoEmpty": "Mostrando exámenes del 0 al 0, de un total de 0 exámenes",
      "infoFiltered": "(Filtrando de un total de _MAX_ registros)",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Ultimo",
        "sNext": "Siguiente",
        "sPrevious": "Anterior",
      }
    },
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
    },

    ajax: {

      url: ruta + '/examenes/usuario/' + idUser,
      dataSrc: '',
      async: false,
      cache: true,
      error: function (jqXHR, textStatus, errorThrown) {
        $('#tbl-misExamenes').DataTable().clear().draw();
      }
    },
    columns: [{
        data: 'examen.curso.periodo'
      },
      {
        data: 'examen.curso.curso'
      },
      {
        data: 'examen.titulo'
      },
      {
        data: 'examen.fechaInicio'
      },
      {
        data: null,
        render: function (data, type, row) {
          return data.examen.horaInicio + ' | ' + data.examen.tiempoDuracion + "'"
        }

      },
      {
        data: null,
        render: function (data, type, row) {
          var fechaI = data.examen.fechaInicio;
          var horaI = data.examen.horaInicio;
          var fechaInicio = fechaI + ' ' + horaI;
          var fechaActual = moment().format('MM-DD-YYYY HH:mm');
          console.log(fechaInicio);
          var duracion = data.examen.tiempoDuracion; //segundos
          console.log('duracion ' + duracion);
          var fechaFin = moment(fechaInicio).add(duracion, 'minutes').format('YYYY-MM-DD HH:mm');
          console.log('fechaInicio: ' + fechaInicio);
          console.log('fechaFin: ' + fechaFin);
          var fechaActual = moment().format('YYYY-MM-DD HH:mm');
          if (fechaActual < fechaInicio) {
            return '<a title="RENDIR EXAMEN" class="btn btn-success disabled"  >RENDIR EXAMEN </a>';
          } else if (fechaActual <= fechaFin) {
            return '<button title="RENDIR EXAMEN" class="btn btn-success" id="btn-rendir">RENDIR EXAMEN</a>'
          } else {
            return '<button title="VER NOTAS" class="btn btn-warning" id="btn-listar">NOTAS</button>';
          }
        }
      }
    ]
  });

});

$(document).on('click', '#btn-rendir', function (event) {
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-misExamenes').DataTable().row(currentRow).data();
  var idExamen = data.examen.idExamen;
  Cookies.set('idExamen', idExamen);
  window.location.href = 'waiting.html';

});

$(document).on('click', '#btn-listar', function (event) {

  $('#modal-notas').modal('toggle');
  var idUser = Cookies.get('id');
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-misExamenes').DataTable().row(currentRow).data();
  var idExamen = data.examen.idExamen;
  var ruta = 'https://api-pwcev.herokuapp.com';
  $.ajax({
    url: ruta + '/resultado/examen/' + idExamen + '/usuario/' + idUser,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).done(function (data) {
    console.log(data)
    var filas = document.getElementById("tbl-listado").rows.length;

    if (data.estado == true) {
      if (data.nota >= 15) {
        $("#tbl-listado").append('<tr>' +
          '<td >' + data.examen.descripcion + '</td>' +
          '<td >' + data.nota + '</td>' +
          '<td >' + data.tiempoFuera + ' ' + 'segundos' + '</td>' +
          '<td style="color:green;">APROBADO</td>' +
          '</td></tr>');
      } else {
        $("#tbl-listado").append('<tr>' +
          '<td >' + data.examen.descripcion + '</td>' +
          '<td >' + data.nota + '</td>' +
          '<td >' + data.tiempoFuera + ' ' + 'segundos' + '</td>' +
          '<td style="color:red;">DESAPROBADO</td>' +
          '</td></tr>');
      }
    } else {
      $("#tbl-listado").append('<tr>' +
        '<td >' + data.examen.descripcion + '</td>' +
        '<td >' + data.nota + '</td>' +
        '<td >' + data.tiempoFuera + ' ' + 'segundos' + '</td>' +
        '<td style="color:red;">ANULADO</td>' +
        '</td></tr>');
    }
    if (filas == 2) {
      document.getElementById("tbl-listado").deleteRow(1);
    } else {

    }

  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("error")
  })

});



$('#btn-close').click(function () {
  deleteCookie();
});