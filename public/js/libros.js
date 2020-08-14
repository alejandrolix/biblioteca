function getLibros() {
    fetch('http://localhost:8080/libros')
        .then((resultado) => {
            return resultado.json();
        })
        .then((resultado) => {
            if (resultado.ok) {
                let libros = resultado.data;
                mostrarLibros(libros);
            }
        })
        .catch(() => {
            alert('Ha habido un error al obtener los libros');
        });
}

window.addEventListener('load', () => {
    getLibros();
});

function mostrarLibros(libros) {
    let divLibros = document.getElementById('libros');
    let cadenaLibros = '';
    let idsLibros = [];

    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];

        if (libro.activo) {
            idsLibros.push(libro.cod);

            let precio = libro.precio.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
            });

            cadenaLibros = cadenaLibros + '<div class="col-md-4" id="' + libro.cod + '">\n' +
                '                            <div class="card mb-4 shadow-sm">\n' +
                '                                <img src="imagenes/' + libro.imagen + '" class="card-img-top" alt="Segway">\n' +
                '                                <div class="card-body">\n' +
                '                                    <p class="card-text">' + libro.titulo + '</p>\n';

            if (libro.autor == null) {
                cadenaLibros = cadenaLibros + '<p class="card-text">Anónimo</p>\n';
            }
            else {
                cadenaLibros = cadenaLibros + '<p class="card-text">' + libro.autor + '</p>\n';
            }

            cadenaLibros = cadenaLibros + '<div class="d-flex justify-content-between align-items-center">\n' +
                '                                        <div class="btn-group">\n' +
                '                                            <button type="button" class="btnDetalles btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#verLibro">\n' +
                '                                                <i class="fas fa-eye"></i>\n' +
                '                                            </button>\n' +
                '                                            <a href="formularioLibro.html" class="btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-edit"></i>\n' +
                '                                            </a>\n' +
                '                                            <button class="btnEliminar btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-trash"></i>\n' +
                '                                            </button>\n' +
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
            mostrarInfoLibro(idsLibros[i]);
        });
    }

    let botonesEliminar = document.querySelectorAll('.btnEliminar');

    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener('click', () => {
            eliminarLibro(idsLibros[i]);
        });
    }
}

function mostrarInfoLibro(idLibro) {
    fetch('http://localhost:8080/libros/' + idLibro)
        .then((resultado) => {
            return resultado.json();
        })
        .then((resultado) => {

            if (resultado.ok) {
                let libro = resultado.data;

                let precio = libro.precio.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                });

                let tituloLibro = document.getElementById('tituloLibro');
                tituloLibro.innerText = libro.titulo;

                let imgLibro = document.getElementById('imagen');
                imgLibro.setAttribute('src', 'imagenes/' + libro.imagen);
                imgLibro.setAttribute('alt', libro.titulo);

                let cadenaLibro = '';
                let fichaTecnica = document.querySelector('.infoLibro');

                cadenaLibro = cadenaLibro + '<div class="row">\n' +
                    '                                    <div class="col-md-12">\n' +
                    '                                        <p class="font-weight-bold fichaTecnica text-center">Ficha Técnica</p>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                                <div class="row">\n' +
                    '                                    <div class="col-md-4">\n' +
                    '                                        <p>Autor</p>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-md-8">\n'

                if (libro.autor == null) {
                    cadenaLibro = cadenaLibro + '<p>Anónimo</p>\n';
                }
                else {
                    cadenaLibro = cadenaLibro + '<p>' + libro.autor + '</p>\n';
                }

                cadenaLibro = cadenaLibro + '</div>\n' +
                    '                                </div>\n' +
                    '                                <div class="row">\n' +
                    '                                    <div class="col-md-4">\n' +
                    '                                        <p>ISBN</p>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-md-8">\n' +
                    '                                        <p>' + libro.isbn + '</p>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                                <div class="row">\n' +
                    '                                    <div class="col-md-4">\n' +
                    '                                        <p>Precio</p>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-md-8">\n' +
                    '                                        <p>' + precio + '</p>\n' +
                    '                                    </div>\n' +
                    '                      </div>';

                fichaTecnica.innerHTML = cadenaLibro;
            }
        })
        .catch(() => {
            alert('Ha habido un error al obtener los datos del libro');
        });
}

function eliminarLibro(idLibro) {
    fetch('http://localhost:8080/libros/' + idLibro, {
        method: 'DELETE'
    })
    .then((resultado) => {
        return resultado.json();
    })
    .then((resultado) => {

        if (resultado.ok) {
            let libro = document.getElementById(idLibro);
            libro.remove();
        }
    });
}