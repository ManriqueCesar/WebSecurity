
$(document).ready(function () {
  setNombre();
  var idUser = Cookies.get('id');
  ruta = 'https://api-pwcev.herokuapp.com';
  var x=0;
  $('#tbl-resultado').DataTable({
    "responsive": true,
    "ordering": true,
    "autoWidth": false,
    "language":{ 
      "sSearch": "Buscar:",
      "zeroRecords": "No se encontraron resultados",
      "info": "Mostrando cursos del _START_ al _END_ , de un total de _TOTAL_ cursos",
      "infoEmpty": "Mostrando cursos del 0 al 0, de un total de 0 cursos",
      "infoFiltered": "(Filtrando de un total de _MAX_ cursos)",
        "oPaginate": {
          "sFirst":"Primero",
          "sLast":"Ultimo",
          "sNext":"Siguiente",
          "sPrevious":"Anterior",
    }},
      initComplete: function() {
          this.api().columns().every(function() {
          var column = this;
          x++;
          var select = $('<select class="cboselect" id="columna'+x+'" multiple="multiple" style="width: 100%; color:blue;"><option value=""></option></select>')
              .appendTo($(column.header()).empty())
              //.appendTo($(column.footer()).empty())
              .on('change', function() {
                  var vals = $('option:selected', this).map(function(index, element) {
                      return $.fn.dataTable.util.escapeRegex($(element).val());
                  }).toArray().join('|');

              column
                  .search(vals.length > 0 ? '^(' + vals + ')$' : '', true, false)
                  .draw();
          });

      column.data().unique().sort().each(function(d, j) {
          select.append('<option value="' + d + '">' + d + '</option>') 
      });
      });

      $(".cboselect").select2({
        closeOnSelect:false,
        theme: "classic"
      });
      $('#columna1').val('2020-I').trigger('change');
      $('#columna2').val('UNMSM').trigger('change');
},
 
  ajax:{
        url: ruta+'/detallecurso/usuario/'+idUser,
        dataSrc: '',
        async:false,
        cache:true, 
        error: function(jqXHR, textStatus, errorThrown){
          $('#tbl-resultado').DataTable().clear().draw();
        }
     },
  columns: [
    { data: 'periodo'},
    { data: 'centroEstudios' },
    { data: 'eap'},
    { data: 'curso'},
    { data: null,
        render: function (data, type, row) {
              return '<button title="LISTA" class="btn btn-primary" id="btn-listar">LISTA</button>';
        }
      },
    { data: null,
        render: function (data, type, row) {
              return '<img src="dist/img/icons/eliminar.png"  id="btn-eliminar" title="ELIMINAR" width=30px;  height=30px; type="button"></button>'+' | ' +
                     '<img src="dist/img/icons/editar.png"  id="btn-editar" title="EDITAR" width=30px;  height=30px; type="button"></button>'
              ;
          
        }
      }]
});


}); 

$(document).on('click', '#btn-listar', function (event) {
  $('#modal-alumnos').modal('toggle');
	var currentRow = $(this).closest("tr");
	var data = $('#tbl-resultado').DataTable().row(currentRow).data();
  var id = data.idCurso;
  console.log(id)
  ruta = 'https://api-pwcev.herokuapp.com';
  var x=0;
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
      initComplete: function() {
          this.api().columns().every(function() {
          var column = this;
                    
      });

      $(".cboselect").select2({closeOnSelect:false});
},
 
  ajax:{
        url: ruta+'/detallecurso/curso/alumnos/'+id,
        dataSrc: '',
        async:false,
        cache:false , 
        error: function(jqXHR, textStatus, errorThrown){
          $('#tbl-resultado').DataTable().clear().draw();
        }
     },
  columns: [
    { data: null,
      render: function ( data, type, row ) {
        return data.apellido + ' ' + data.nombre}
      },
    { data: 'email'
      }]
});

});

$(document).on('click', '#btn-eliminar', function (event) {
  ruta = 'https://api-pwcev.herokuapp.com';
  var currentRow = $(this).closest("tr");
  var data = $('#tbl-resultado').DataTable().row(currentRow).data();
  var id = data.idCurso;


 $.ajax({
    url: ruta + '/cursos/' + id,
    type: 'DELETE',
    dataType: 'json'
  }).done(function (data) {
    $(currentRow).closest('tr').fadeOut(1500, function () { 
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Curso eliminado',
        showConfirmButton: false,
        timer: 1500
      })

      $('#tbl-resultado').DataTable().ajax.reload(null, false);
   

  }); 
    
  }).fail(function (jqXHR, textStatus, errorThrown) {
    
  })
});


$('#btn-close').click(function () {
    deleteCookie();
  });
