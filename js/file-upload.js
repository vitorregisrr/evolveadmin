(function ($) {
  'use strict';
  $(function () {

    //File name mask
    $('.file-upload-browse').on('click', function () {
      var file = $(this).parent().parent().parent().find('.file-upload-default');
      file.trigger('click');
    });
    $('.file-upload-default').on('change', function () {
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });

    //New image button
    const inputImageTemplate = `
    <input type="file" name="images" class="file-upload-default">
    <div class="input-group col-xs-12 mb-1 animated fadeIn">
      <input type="text" class="form-control file-upload-info" disabled
        placeholder="Selecionar imagem">
      <span class="input-group-append">
        <button class="file-upload-browse btn btn-gradient-primary" type="button">Selecionar imagem</button>
      </span>
    </div>
    `;
    
    $('#btnNewImage').click(function () {
      $(this).parent().children('.form-group').append(inputImageTemplate).children(':last').hide().fadeIn(1000);
    })
  });


})(jQuery);