

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


$(document).ready(function () {
  ruta = 'https://api-pwcev.herokuapp.com';
  var token = getCookie('X-Auth-Token');
  console.log(token);  

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
        async:false,
        cache:true, 
        dataSrc: '',
       beforeSend: function (request) {
       request.setRequestHeader("X-Auth-Token",token);
        },
        error: function(jqXHR, textStatus, errorThrown){
          $('#tbl-resultado').DataTable().clear().draw();
        }
     },
  columns: [
      { data: 'alumnosEmail' },
      { data: 'centroEstudios' },
      { data: 'curso'},
      { data: 'eap'},
      { data: 'idCurso'},
      { data: 'periodo'},
      { data: null,
        render: function (data, type, row) {
          
              return '<button title="MODIFICAR" class="fa fa-edit" id="btn-modificar"  type="button"data-toggle="modal" data-target="#modal-default"></button>'+
                 
                  '<button  id="btn-eliminar" title="ELIMINAR" class="fa fa-trash"  type="button"></button>';
          
        }
      }]
});



});