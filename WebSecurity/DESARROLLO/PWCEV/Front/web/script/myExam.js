function setNombre() {
  var usuario = Cookies.get('usuario');
  $('#nombreUser').text(usuario);
}

$(document).ready(function () {
  var user = Cookies.get('apellido');
  var idUser = Cookies.get('id');
  setNombre();
  document.getElementById('imgUser').src = "../web/dist/js/labeled_images/" + user + "/1.jpg";

  ruta = 'https://api-pwcev.herokuapp.com';
  var x=0;
  $('#tbl-misExamenes').DataTable({
    "responsive": true,
    "info": false,
    "paging": false,
    "searching": false,
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
},
 
  ajax:{
        url: ruta+'/examenes/usuario/'+idUser,
        dataSrc: '',
        async:false,
        cache:true, 
        error: function(jqXHR, textStatus, errorThrown){
          $('#tbl-misExamenes').DataTable().clear().draw();
        }
     },
  columns: [
    { data: 'curso.curso'},
    { data: 'titulo'},
    { data: 'curso.periodo' },
    { data: 'fechaInicio'},
    { data: null,
      render: function (data, type, row) {
            return '<button title="VER" class="btn btn-primary" id="btn-listar">VER</button>';
      }
    },
    
  ]
});

});

$('#btn-close').click(function () {
  deleteCookie();
});