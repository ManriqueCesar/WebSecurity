
function setNombre() {
  var user = Cookies.get('usuario');
  $('#nombreUser').text(user);

}


$(document).ready(function () {
setNombre();
var idUser = Cookies.get('id');
ruta = 'https://api-pwcev.herokuapp.com';
var x=0;
$('#tbl-examenes').DataTable({
  "responsive": true,
  "ordering": true,
  "info": true,
  "autoWidth": false,
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
      url: ruta+'/examenes/usuario/'+idUser,
      dataSrc: '',
      async:false,
      cache:true, 
      error: function(jqXHR, textStatus, errorThrown){
        $('#tbl-examenes').DataTable().clear().draw();
      }
   },
columns: [
  { data: 'curso.periodo'},
  { data: 'curso.centroEstudios' },
  { data: 'curso.eap'},
  { data: 'curso.curso'},
  { data: 'titulo'},
  { data: null,
      render: function (data, type, row) {
            return '<button title="LISTA" class="btn btn-primary" id="btn-listar">LISTA</button>';
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
        return 'DEMO ALUMNO'}
      },
      { data: null,
        render: function ( data, type, row ) {
          return '20'}
        },
        { data: null,
          render: function ( data, type, row ) {
            return '150'}
          },
          { data: null,
            render: function (data, type, row) {
                  return '<button  id="btn-eliminar" title="ANULAR" class="fa fa-trash"  type="button"></button>';
              
            }
          }]
        });
        
        
        }); 

$('#btn-close').click(function () {
  deleteCookie();
});
