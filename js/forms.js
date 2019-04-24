//// TEXT RICH ////
$(function () {
    'use strict';

    if ($('#editor-rich').length ) {
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'], // custom dropdow
            ['blockquote', 'code-block'],

            [{
                'header': 1
            }, {
                'header': 2
            }], // custom button values
            [{
                'list': 'ordered'
            }, {
                'list': 'bullet'
            }],
            [{
                'script': 'sub'
            }, {
                'script': 'super'
            }], // superscript/subscript
            [{
                'indent': '-1'
            }, {
                'indent': '+1'
            }], // outdent/indent
            [{
                'direction': 'rtl'
            }], // text direction

            [{
                'align': []
            }],

            ['image', 'clean'] // remove formatting button
        ];

        const editor = new Quill('#editor-rich', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        });

        const deltastore = $('#editor-rich').data('deltastore');

        if ($(deltastore).val()) {
            try {
                editor.setContents(JSON.parse($(deltastore).val()));
            } catch {
                console.log('Não foi possível parsear o conteúdo existente da notícia.')
            }
        }

        editor.on('text-change', function (delta, oldDelta, source) {
            $(deltastore).val(JSON.stringify(editor.getContents()));
        });
    }


    //// TAGS INPUT (KEYWORDS) ////
    const tagContainer = $('.input-tags');
    let tagsHtml, tagsDataStore, tagsData = [],
        tagsInput, tagsCount = 0;

    const setData = () => {
        tagsDataStore.val(JSON.stringify({
            data: tagsData
        }));
    }

    const createTag = (text) => {
        tagsCount++;

        const tag = document.createElement('span');
        tag.setAttribute('class', 'input-tags__tag badge badge-secondary');
        tag.setAttribute('data-key', tagsCount);
        tag.innerHTML = `<span class="value">${text}</span> <i class="mdi mdi-close input-tags__tag__delete"></i>`;

        tag.addEventListener('click', function (e) {
            removeTag(this.getAttribute('data-key'));
        });

        tagsData.push(text);
        setData();

        return tag;
    }

    const removeTag = (key) => {
        $(`.input-tags__tag[data-key="${key}"`).fadeOut(300, function () {
            tagsData = tagsData.filter(data => data !== $(this).children('.value').html());
            setData();
            $(this).remove();
        });
    }

    // Prevent submit form from perssing enter
    $(document).on("keypress", ".input-tags__input", function (event) {
        return event.keyCode != 13;
    });

    tagContainer.append('<input class="input-tags__input"/>');

    // Setting preset values
    tagsHtml = tagContainer.children('.input-tags__tag');
    tagsDataStore = $(tagContainer.data('datastore'));
    const existentData = tagsDataStore.val() ? JSON.parse(tagsDataStore.val()).data : [];

    // Seting existing data to container
    existentData.forEach(text => {
        tagContainer.prepend(createTag(text));
    });

    // Working with de input events
    tagsInput = tagContainer.children('.input-tags__input');
    tagsInput.keyup(function (e) {
        if (e.keyCode === 13 && e.target.value.length > 1) {
            tagContainer.prepend(createTag(e.target.value)).children('.input-tags__tag:first').hide().fadeIn(1000);
            e.target.value = '';
        }
    });
})