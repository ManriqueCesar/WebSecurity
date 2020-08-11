function setNombre() {
  var user = Cookies.get('usuario');
  $('#nombreUser').text(user);

}

$(document).ready(function () {
  setNombre();
  var x = 0;
  $('#tbl-resultado').DataTable({
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

      $(".cboselect").select2({
        closeOnSelect: false
      });


    },

    ajax: {
      url: pwcev - apirest.herokuapp.com + '/pregunta-controller',
      //dataSrc: 'clase',
      beforeSend: function (request) {
        request.setRequestHeader("X-Auth-Token", token);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#tbl-clases').DataTable().clear().draw();
      }
    },
    columns: [
      {data: 'id'},
      {data: 'clase'},
      {data: 'estado'},
      {data: 'auditoria.usuario'},
      {data: 'auditoria.fecha'},
      {data: null,
        render: function (data, type, row) {

          if (data.estado == '1') {
            return '<button title="MODIFICAR" class="fa fa-edit" id="btn-modificar"  type="button"data-toggle="modal" data-target="#modal-default"></button>' +
              '<button id="btn-marcar" title="CAMBIAR ESTADO" class="fa fa-toggle-on" type="button" ></button>' +
              '<button  id="btn-eliminar" title="ELIMINAR" class="fa fa-trash"  type="button"></button>';
          } else {
            return '<button title="MODIFICAR" class="fa fa-edit" id="btn-modificar"  type="button"data-toggle="modal" data-target="#modal-default"></button>' +
              '<button id="btn-marcar" title="CAMBIAR ESTADO" class="fa fa-toggle-off" type="button"></button>' +
              '<button id="btn-eliminar" title="ELIMINAR" class="fa fa-trash"  type="button"></button>';
          }
        }
      }
    ]
  });

});


$('#btn-close').click(function () {
  deleteCookie();
  
});