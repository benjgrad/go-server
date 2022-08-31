const loginDialog = document.getElementById('loginDialog');
const logoutDialog = document.getElementById('logoutDialog');
const username = loginDialog.querySelector('#username');
const password = loginDialog.querySelector('#password');
const loginBtn = loginDialog.querySelector('#loginBtn');
const logoutBtn = logoutDialog.querySelector('#logoutBtn');
const logoutCancelBtn = logoutDialog.querySelector('#logoutCancelBtn');
const loginCancelBtn = loginDialog.querySelector('#loginCancelBtn');



/***
0.1
This scripts read images element from the web page and the css file (backgrounds) 
***/
/*
get image src from CSS file
Just local urls
param ed: editor
*/
function imgCSS(editor) {
    var code = editor.getCss(), imags;
    local = document.location.host.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    regex = new RegExp('(http:|https:){0,1}\/\/' + local, 'g');
    code = code.replace(regex, ''); //limpiar url locales
    code = code.replace(/(http:|https:){0,1}\/\//g, '#'); //marcar url no locales
    imags = code.match(/\("{0,1}[^#^\(]+?\.(gif|jpg|png|jpeg|tif|tiff|webp|svg|ico)"{0,1}\)/gi);
    if (imags !== null) {
        imags = imags.map(function (x) { return x.replace(/\("{0,1}(.*){0,1}"\)/, '$1'); });
    }
    else
        imags = [];
    return imags;
}
/*
get image src from HTML file
just local urls
*/
function imgHTML() {
    var imags = [];
    var src;
    var code = document.querySelector('.gjs-frame').contentDocument;
    code = code.getElementsByTagName('img');
    for (i = 0; i < code.length; i++) {
        src = code[i].src;
        src = src.replace(location.origin, '');
        if (!src.includes('http')) {
            imags.push(src);
        }
    };

    return imags;
}


/**
Convierte a binario los datos devueltos en la lectura
**/
function arrayBufferToBinary(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return binary;
};

/*
Leer los archivos de imagen
param: ed  el editor
*/
async function readImgs(ed) {
    var ImgData;
    var listaImgs, imagsSet;
    var peticion, archivo;
    var content = [];
    listaImgs = imgHTML(ed).concat(imgCSS(ed));
    imagsSet = new Set(listaImgs);
    listaImgs = [...imagsSet];
    for (var i = 0; i < listaImgs.length; i++) {
        try {
            peticion = await fetch(listaImgs[i]);
            imgData = await peticion.arrayBuffer();
            archivo = peticion.url.match(/[^\/\.]*\.[^\.]*$/, '$&')[0];
            content[archivo] = arrayBufferToBinary(imgData);;
        }
        catch (e) {
            console.log("error " + e.message);

        }
    };
    return content
}// JavaScript Document



// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
if (typeof loginDialog.showModal !== 'function') {
    loginDialog.hidden = true;
    /* a fallback script to allow this dialog/form to function
       for legacy browsers that do not support <dialog>
       could be provided here.
    */
}
if (typeof logoutDialog.showModal !== 'function') {
    logoutDialog.hidden = true;
    /* a fallback script to allow this dialog/form to function
       for legacy browsers that do not support <dialog>
       could be provided here.
    */
}
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
loginDialog.addEventListener('close', () => {
    // console.log("close");
});
logoutCancelBtn.addEventListener('click', () => {
    logoutDialog.close();
});
loginCancelBtn.addEventListener('click', () => {
    // Attempt to save so we can recover it later
    editor.store();
    loginDialog.close();
});

logoutBtn.addEventListener('click', () => {
    fetch("/logout", {
        method: "GET"
    });
    logoutDialog.close();
    location.reload();
})
const pageName = new URLSearchParams(window.location.search).get("page")
const url = !pageName ? '/page' : `/page/${new URLSearchParams(window.location.search).get("page") ?? ""}`;

const prefix = "gjs-scroll"
const editor = grapesjs.init({
    container: '#gjs',
    optsHtml: { withProps: true },
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    storageManager: {
        type: 'remote', // Storage type. Available: local | remote
        autosave: false, // Store data automatically
        autoload: true, // Autoload stored data on init
        recovery: true,
        // Default storage options
        options: {
            remote: {
                urlStore: url,
                urlLoad: url,
                onStore: (data) => ({ name: pageName, data: JSON.stringify(data) }),

            },
            local: { key: `gjsProject-${window.location.pathname}` },
        },
    },
    assetManager: {
        // Upload endpoint, set `false` to disable upload, default `false`
        upload: '/asset',

        // The name used in POST to pass uploaded files, default: `'files'`
        uploadName: 'file',
    },
    fromElement: true,
    height: "100vh",
    plugins: [
        'grapesjs-tui-image-editor',
        'gjs-blocks-basic',
        'gjs-blocks-flexbox',
        'grapesjs-plugin-export',
        'grapesjs-navbar',
        'grapesjs-component-countdown',
        'grapesjs-plugin-forms',
        'grapesjs-tabs',
        'grapesjs-plugin-scroll',
        'grapesjs-plugin-chartjs',
        'grapesjs-blocks-bootstrap4',
    ],
    pluginsOpts: {
        'grapesjs-plugin-export': {
            root: {
                css: {
                    'style.css': ed => ed.getCss(),
                    'some-file.txt': 'My custom content',
                },
                img: async editor => {
                    const images = await readImgs(editor);
                    return images;
                },
                'index.html': ed => `<body>${ed.getHtml().replaceAll(`src="/assets/`, `src="./img/`)}</body>`
            }
        },
        'grapesjs-tui-image-editor': {
            config: {
                includeUI: {
                    initMenu: 'filter',
                },
            },
            icons: {
                'menu.normalIcon.path': './icons/icon-d.svg',
                'menu.activeIcon.path': './icons/icon-b.svg',
                'menu.disabledIcon.path': './icons.icon-a.svg',
                'menu.hoverIcon.path': './icons/icon-c.svg',
                'submenu.normalIcon.path': './icons/icon-d.svg',
                'submenu.activeIcon.path': './icons/icon-c.svg',
            },
        },
        'grapesjs-plugin-scroll': {
            gjsScrollContent: '<div></div>',
            gjsScrollStyles: `
              .${prefix}-container{
              }
              
              .${prefix}-inactive{
                transform: translateY(150px);
                opacity: 0;
                transition: 1s all ease;
              }
              
              .${prefix}-inactive.${prefix}-active{
                transform: translateY(0);
                opacity: 1;
              }
              `,
            gjsScrollInnerStyles: (prefix) => `.${prefix}-container h1{ }`,
        }
    },
});

editor.Panels.addButton('options', [
    {
        id: 'save-database',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: {
            title: 'Save'
        }
    }]);
editor.Panels.addButton('options', [
    {
        id: 'login',
        className: 'fa fa-user',
        command: 'login',
        attributes: {
            title: 'Login'
        }
    }]);

editor.Commands.add('save-db', {
    run: function (editor, sender) {
        sender && sender.set('active', 0); // turn off the button

        fetch("/user/status", {
            method: "GET"
        }).then(res => {
            if (res.ok) {
                editor.store();
            }
            else {
                loginDialog.showModal();
            }
        });

    }
});
editor.Commands.add('login', {
    run: function (editor, sender) {
        sender && sender.set('active', 0); // turn off the button

        fetch("/user/status", {
            method: "GET"
        }).then(res => {
            if (res.ok) {
                logoutDialog.showModal();
            }
            else {
                loginDialog.showModal();
            }
        });

    }
});

editor.on('load', function () {
    let styleManager = window.editor.StyleManager;
    let fontProperty = styleManager.getProperty('typography', 'font-family');
    var list = [];
    fontProperty.set('list', list);
    list = [
        fontProperty.addOption({ value: "'Oswald', sans-serif", name: 'Oswald' }),
        fontProperty.addOption({ value: "Helvetica Neue,Helvetica,Arial,sans-serif", name: 'Helvetica' }),
        fontProperty.addOption({ value: "sans-serif", name: 'sans-serif' }),
        fontProperty.addOption({ value: "Times New Roman", name: 'Times New Roman' }),
        fontProperty.addOption({ value: "Arial Black", name: 'Arial Black' }),
        fontProperty.addOption({ value: "Tahoma", name: 'Tahoma' }),
        fontProperty.addOption({ value: "Verdana, Geneva, sans-serif", name: 'Verdana' }),
        fontProperty.addOption({ value: "Courier New Courier, monospace", name: 'Courier New Courier' }),
        fontProperty.addOption({ value: "'Lato', sans-serif", name: 'Lato' }),
        fontProperty.addOption({ value: "'Open Sans', sans-serif", name: 'Open Sans' }),
        fontProperty.addOption({ value: "'Montserrat', sans-serif", name: 'Montserrat' }),
        fontProperty.addOption({ value: "'Tangerine'", name: 'Tangerine' }),
        fontProperty.addOption({ value: "'Playfair Display'", name: 'Playfair Display' }),
        fontProperty.addOption({ value: "'Permanent Marker'", name: 'Permanent Marker' }),
    ];
    fontProperty.set('list', list);
    styleManager.render();
});

var pfx = editor.getConfig().stylePrefix
var modal = editor.Modal
var cmdm = editor.Commands
var htmlCodeViewer = editor.CodeManager.getViewer('CodeMirror').clone()
var cssCodeViewer = editor.CodeManager.getViewer('CodeMirror').clone()
var pnm = editor.Panels
var container = document.createElement('div')
var btnEdit = document.createElement('button')

htmlCodeViewer.set({
    codeName: 'htmlmixed',
    readOnly: 0,
    theme: 'hopscotch',
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true
})

cssCodeViewer.set({
    codeName: 'css',
    readOnly: 0,
    theme: 'hopscotch',
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true
})
btnEdit.innerHTML = 'Save'
btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import'
btnEdit.onclick = function () {
    var html = htmlCodeViewer.editor.getValue()
    var css = cssCodeViewer.editor.getValue()
    editor.DomComponents.getWrapper().set('content', '')

    editor.setComponents(html.trim())
    editor.setStyle(css)

    modal.close()
}

cmdm.add('edit-code', {
    run: function (editor, sender) {
        sender && sender.set('active', 0)
        var htmlViewer = htmlCodeViewer.editor
        var cssViewer = cssCodeViewer.editor
        //var jsViewer = jsCodeViewer.editor
        modal.setTitle('Edit code')
        if (!htmlViewer && !cssViewer) {
            var txtarea = document.createElement('textarea')
            var cssarea = document.createElement('textarea')
            //var jsarea = document.createElement('textarea')
            container.appendChild(txtarea)
            container.appendChild(cssarea)
            //container.appendChild(jsarea)
            container.appendChild(btnEdit)
            htmlCodeViewer.init(txtarea)
            cssCodeViewer.init(cssarea)
            //jsCodeViewer.init(jsarea)
            htmlViewer = htmlCodeViewer.editor
            cssViewer = cssCodeViewer.editor
            //jsViewer = jsCodeViewer.editor
        }
        var InnerHtml = editor.getHtml()
        var Css = editor.getCss()
        //var Js = editor.getJs()
        modal.setContent('')
        modal.setContent(container)
        htmlCodeViewer.setContent(InnerHtml)
        cssCodeViewer.setContent(Css)
        //jsCodeViewer.setContent(Js)
        modal.open()
        htmlViewer.refresh()
        cssViewer.refresh()
        //jsViewer.refresh()
    }
})

pnm.addButton('options',
    [
        {
            id: 'edit',
            className: 'fa fa-edit',
            command: 'edit-code',
            attributes: {
                title: 'Edit Code'
            }
        }
    ]
)


window.editor = editor;