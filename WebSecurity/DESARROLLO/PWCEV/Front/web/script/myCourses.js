




function setNombre() {
  var usuario = Cookies.get('usuario');
  $('#nombreUser').text(usuario);

}
var user = Cookies.get('apellido');
setNombre();
document.getElementById('imgUser').src = "../web/dist/js/labeled_images/" + user + "/1.jpg";



$(document).ready(function () {
  setNombre();
  var idUser = Cookies.get('id');
  ruta = 'https://api-pwcev.herokuapp.com';
  var x=0;
  $('#tbl-misCursos').DataTable({
    "responsive": true,
    "ordering": true,
    "info": false,
    "searching": false,
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
        url: ruta+'/detallecurso/usuario/'+idUser,
        dataSrc: '',
        async:false,
        cache:true, 
        error: function(jqXHR, textStatus, errorThrown){
          $('#tbl-misCursos').DataTable().clear().draw();
        }
     },
  columns: [
    { data: 'periodo'},
    { data: 'curso'},
    { data: 'profesor'},
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
  var data = $('#tbl-misCursos').DataTable().row(currentRow).data();
  var idCurso = data.idCurso;
  console.log(idCurso)
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
      url: ruta + '/detallecurso/curso/alumnos/'+idCurso,
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
          return data.apellido + ' ' + data.nombre
        }
      },
      {
       data:'email' }
      
    ]
  });


});


$('#btn-close').click(function () {
  deleteCookie();

});









