$(document).ready(function () {


  $(function () {
    //Initialize Select2 Elements
    //Initialize Select2 Elements
    console.log("asdasd");
    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', {
      'placeholder': 'dd/mm/yyyy'
    })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', {
      'placeholder': 'mm/dd/yyyy'
    })
    //Money Euro
    $('[data-mask]').inputmask()

    //Date range picker
    $('#reservationdate').datetimepicker({
      format: 'L'
    });
    //Date range picker
    $('#reservation').daterangepicker()
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      locale: {
        format: 'MM/DD/YYYY hh:mm A'
      }
    })
    //Date range as a button
    $('#daterange-btn').daterangepicker({
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf(
            'month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
      },

      function (start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
      }
    )

    //Timepicker
    $('#timepicker').datetimepicker({
      format: 'LT'
    })

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
    //color picker with addon
    $('.my-colorpicker2').colorpicker()

    $('.my-colorpicker2').on('colorpickerChange', function (event) {
      $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    });

  })
  $('#reglas-editable-holder').on('click', "label.editable", function () {
    var $lbl = $(this),
      o = $lbl.text(),
      $txt = $('<input type="text" class="editable-label-text" value="' + o + '" />');
    $lbl
      .replaceWith($txt);
    $txt.focus();

    $txt.blur(function () {
        $txt.replaceWith($lbl);
      })
      .keydown(function (evt) {
        if (evt.keyCode == 13) {
          var no = $(this).val();
          $lbl.text(no);
          $txt.replaceWith($lbl);
        }
      });
  });

  $('#examen-editable-holder').on('click', "label.editable", function () {
    var $lbl = $(this),
      o = $lbl.text(),
      $txt = $('<input type="text" class="editable-label-text" value="' + o + '" />');
    $lbl
      .replaceWith($txt);
    $txt.focus();

    $txt.blur(function () {
        $txt.replaceWith($lbl);
      })
      .keydown(function (evt) {
        if (evt.keyCode == 13) {
          var no = $(this).val();
          $lbl.text(no);
          $txt.replaceWith($lbl);
        }
      });
  });

  


  /*$(document).on('click', '#btn-cerrarsesion', function (event) {
    //sessionStorage.clear();
    deleteCookie();
    document.location.href = "index.html";
  })

*/
})