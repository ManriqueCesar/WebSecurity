function setNombre() {
  var user = Cookies.get('usuario');
  $('#nombreUser').text(user);

}


$(document).ready(function () {
  setNombre();
  var idUser = Cookies.get('id');
  var usuario = Cookies.get('usuario');
  ruta = 'https://api-pwcev.herokuapp.com';
  $('#tbl-examenes').DataTable({
    "colReorder": true,
    "responsive": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "searching":true,
    "language":{ 
      "sSearch": "Buscar:",
      "zeroRecords": "No se encontraron resultados",
      "info": "Mostrando exámenes del _START_ al _END_ , de un total de _TOTAL_ exámenes",
      "infoEmpty": "Mostrando exámenes del 0 al 0, de un total de 0 exámenes",
      "infoFiltered": "(Filtrando de un total de _MAX_ registros)",
        "oPaginate": {
          "sFirst":"Primero",
          "sLast":"Ultimo",
          "sNext":"Siguiente",
          "sPrevious":"Anterior",
    }},


    ajax: {
      url: ruta + '/examenes/usuario/' + idUser,
      dataSrc: '',
      async: false,
      cache: true,
      error: function (jqXHR, textStatus, errorThrown) {
        $('#tbl-examenes').DataTable().clear().draw();
      }
    },
    columns: [{
        data: 'curso.periodo'
      },
      {
        data: 'curso.centroEstudios'
      },
      {
        data: 'curso.eap'
      },
      {
        data: 'curso.curso'
      },
      {
        data: 'titulo'
      },
      {
        data: null,
        render: function (data, type, row) {
          return '<button title="LISTA" class="btn btn-primary" id="btn-listar">LISTA</button>';
        }

      }
    ],
    dom: 'Bfrtip',
    buttons: [
      {
        'extend': 'excelHtml5',
        'autoFilter': true,
        "text": '<img src="dist/img/icons/excel.png" alt="Descargar Excel" height = "30px" width="40px">',
        customize: function (xlsx) {
          var sheet = xlsx.xl.worksheets['sheet1.xml'];
          $('c[r=A1] t', sheet).text('WebSecurity |'+' Lista de Exámenes | ' +usuario);
      },
      exportOptions: {
          columns: [0, 1, 2, 3, 4]
      },
    },
      {
        'extend': 'pdfHtml5',
        'autoFilter': true,
        "text": '<img src="dist/img/icons/pdf.png" alt="Descargar PDF" height = "30px" width="30px">',
      exportOptions: {
          columns: [0, 1, 2, 3, 4]
      }

  },
    
     
  ]
  });
 

});


$(document).on('click', '#btn-listar', function (event) {
  $('#modal-alumnos').modal('toggle');
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-examenes').DataTable().row(currentRow).data();
  var idExamen = data.idExamen;
  var idCurso = data.curso.idCurso;
  var nombreExamen = data.titulo;
  console.log(idCurso);

 
  ruta = 'https://api-pwcev.herokuapp.com';
  var x = 0;
  $('#tbl-listado').DataTable({
    "destroy": true,
    "lengthChange": false,
    "searching": false,
    "autoWidth": false,
    "responsive": true,
    "language":{ 
      "sSearch": "Buscar:",
      "zeroRecords": "No se encontraron resultados",
      "info": "Mostrando alumnos del _START_ al _END_ , de un total de _TOTAL_ alumnos",
      "infoEmpty": "Mostrando alumnos del 0 al 0, de un total de 0 alumnos",
      "infoFiltered": "(Filtrando de un total de _MAX_ alumnos)",
        "oPaginate": {
          "sFirst":"Primero",
          "sLast":"Ultimo",
          "sNext":"Siguiente",
          "sPrevious":"Anterior",
    }},
    initComplete: function () {
      this.api().columns().every(function () {
        var column = this;

      });

      $(".cboselect").select2({
        closeOnSelect: false
      });
    },

    ajax: {
      url: ruta + '/resultado/examen/'+ idExamen+'/curso/'+idCurso,
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
            return '<button id="btn-marcar" title="ANULAR EXAMEN"  type="button" class="btn btn-sucess">HABILITADO</button>';
          } else {
            return '<button id="btn-marcar" title="HABILITAR EXAMEN"  type="button" class="btn btn-danger">ANULADO</button>';
          }
        }
      }
    ],
    dom: 'Bfrtip',
    buttons: [
      {
        'extend': 'excelHtml5',
        "text": '<img src="dist/img/icons/excel.png" alt="Descargar Excel" height = "30px" width="40px">',
        customize: function (xlsx) {
          var sheet = xlsx.xl.worksheets['sheet1.xml'];
          $('c[r=A1] t', sheet).text('Lista de Alumnos | Examen: '+nombreExamen);
      },
      exportOptions: {
          columns: [0, 1, 2,3]
      },
    },
      {
        'extend': 'pdfHtml5',
        "text": '<img src="dist/img/icons/pdf.png" alt="Descargar PDF" height = "30px" width="30px">',
      exportOptions: {
          columns: [0, 1, 2,3]
      }

  },
    
     
  ]
  });


});


$(document).on('click', '#btn-marcar', function (event) {
  var ruta = 'https://api-pwcev.herokuapp.com';
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-listado').DataTable().row(currentRow).data();
  var idResultado = data.idResultado;
  console.log(idResultado);

  $.ajax({
    url: ruta + '/resultado/'+idResultado,
    type: 'PUT'
  }).done(function (data) {
    $('#tbl-listado').DataTable().ajax.reload(null, false);
  });
  
});

$('#btn-close').click(function () {
  deleteCookie();
});