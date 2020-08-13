function getLibros() {
    let http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:8080/libros', true);
    http.addEventListener('readystatechange', () => {

        if (http.readyState == 4 && http.status == 200) {
            let resultado = JSON.parse(http.responseText);

            if (resultado.ok) {
                let libros = resultado.data;
                mostrarLibros(libros);
            }
        }
    });

    http.send();
}

window.addEventListener('load', () => {
    getLibros();
});

function mostrarLibros(libros) {
    let divLibros = document.getElementById('libros');
    let cadenaLibros = '';

    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];

        if (libro.activo) {
            let precio = libro.precio.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
            });

            cadenaLibros = cadenaLibros + '<div class="col-md-4">\n' +
                '                            <div class="card mb-4 shadow-sm">\n' +
                '                                <img src="imagenes/' + libro.imagen + '.jpg' + '" class="card-img-top" alt="Segway">\n' +
                '                                <div class="card-body">\n' +
                '                                    <p class="card-text">' + libro.titulo + '</p>\n' +
                '                                    <p class="card-text">' + libro.autor.nombre + '</p>\n' +
                '                                    <div class="d-flex justify-content-between align-items-center">\n' +
                '                                        <div class="btn-group">\n' +
                '                                            <button type="button" class="btnDetalles btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#verLibro">\n' +
                '                                                <i class="fas fa-eye"></i>\n' +
                '                                            </button>\n' +
                '                                            <a href="formularioLibro.html" class="btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-edit"></i>\n' +
                '                                            </a>\n' +
                '                                            <a href="eliminar.html" class="btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-trash"></i>\n' +
                '                                            </a>\n' +
                '                                        </div>\n' +
                '                                        <small class="text-muted">' + precio + '</small>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
        }
    }

    divLibros.innerHTML = cadenaLibros;

    let botonesDetalles = document.querySelectorAll('.btnDetalles');

    for (let i = 0; i < botonesDetalles.length; i++) {
        botonesDetalles[i].addEventListener('click', () => {
            mostrarInfoLibro((i + 1));
        })
    }
}

function mostrarInfoLibro(idLibro) {
    let http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:8080/libros/' + idLibro, true);
    http.addEventListener('readystatechange', () => {

        if (http.readyState == 4 && http.status == 200) {
            let resultado = JSON.parse(http.responseText);

            if (resultado.ok) {
                let libro = resultado.data;
                let precio = libro.precio.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                });

                let tituloLibro = document.getElementById('tituloLibro');
                tituloLibro.innerText = libro.titulo;

                let imgLibro = document.getElementById('imagen');
                imgLibro.setAttribute('src', 'imagenes/' + libro.imagen + '.jpg');
                imgLibro.setAttribute('width', '50%');
                imgLibro.setAttribute('alt', libro.titulo);

                // let modal = document.getElementById('verLibro');
                // modal.innerHTML = '<div class="modal-dialog">\n' +
                //     '                                        <div class="modal-content">\n' +
                //     '                                            <div class="modal-header">\n' +
                //     '                                                <h5 class="modal-title" id="exampleModalLabel">Información del libro ' + libro.titulo + '</h5>\n' +
                //     '                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                //     '                                                    <span aria-hidden="true">&times;</span>\n' +
                //     '                                                </button>\n' +
                //     '                                            </div>\n' +
                //     '                                            <div class="modal-body">\n' +
                //     '                                                <img src="imagenes/' + libro.imagen + '" alt="Segway">\n' +
                //     '                                                <p class="card-text">' + libro.titulo + '</p>\n' +
                //     '                                                <p class="card-text">' + libro.autor.nombre + '</p>\n' +
                //     '                                                <p class="card-text">' + libro.isbn + '</p>\n' +
                //     '                                                <p class="card-text">' + precio + '</p>\n' +
                //     '                                            </div>\n' +
                //     '                                            <div class="modal-footer">\n' +
                //     '                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>\n' +
                //     '                                            </div>\n' +
                //     '                                        </div>\n' +
                //     '                                    </div>\n';
            }
        }
    });

    http.send();
}
