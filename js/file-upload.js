(function ($) {
  'use strict';
  $(function () {

    const fileReader = new FileReader();

    //File name mask
    $('body').on('click', '.file-upload-browse', function () {
      var file = $(this).parent().parent().find('.file-upload-default');
      file.trigger('click');
    });

    $('body').on('change', '.file-upload-default', function (e) {
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      fileReader.readAsDataURL(this.files[0]);
      fileReader.onload = (e) => {
        $(this).parent().children('.img-preview').remove();
        $(this).parent().prepend(`<img src="${e.target.result}" class="img-preview">`);
      };
    });

    //New image button
    const inputImageTemplate = `
    <div class="input-group col-xs-12 mb-1">
      <input type="file" name="images" class="file-upload-default">
      <input type="text" class="form-control file-upload-info" disabled
        placeholder="Selecionar imagem">
      <span class="input-group-append">
        <button class="file-upload-browse btn btn-gradient-primary" type="button">Selecionar
          imagem</button>
      </span>
    </div>  
    `;

    $('#btnNewImage').click(function () {
      $(this).parent().children('.form-group').append(inputImageTemplate).children(':last').hide().fadeIn(1000);
    })
  });


})(jQuery);