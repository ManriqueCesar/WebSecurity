$(document).ready(function () {
  ruta = 'https://api-pwcev.herokuapp.com';

  var x=0;
  $('#tbl-resultado').DataTable({
      initComplete: function() {
          this.api().columns().every(function() {
          var column = this;
          x++;
          var select = $('<select class="cboselect" id="columna'+x+'" multiple="multiple" style="width: 100%;"><option value=""></option></select>')
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

      $(".cboselect").select2({closeOnSelect:false});

     
},
 

  ajax:{
        url: ruta+'/cursos',
        //dataSrc: 'cursos',
        //beforeSend: function (request) {
       //   request.setRequestHeader("X-Auth-Token",token);
        //},
        error: function(jqXHR, textStatus, errorThrown){
          $('#tbl-resultado').DataTable().clear().draw();
        }
     },
  columns: [
      { data: 'alumnoEmail' },
      { data: 'centroEstudios' },
      { data: 'curso'},
      { data: 'eap'},
      { data: 'idExamen'},
      { data: 'periodo'},
      { data: null,
        }]
});



});