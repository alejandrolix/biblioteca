window.addEventListener('DOMContentLoaded', () => obtenerAutores());

function obtenerAutores() {
    fetch('http://localhost:8080/autores/totalLibros')
        .then(resultado => resultado.json())
        .then(resultado => {

            if (resultado.ok) {
                let autores = resultado.data;
                mostrarAutores(autores);
            }
        });
}

function mostrarAutores(autores) {
    let cadenaAutores = '';

    for (let i = 0; i < autores.length; i++) {
        let autor = autores[i];

        cadenaAutores = cadenaAutores + '<div class="col-md-4 mb-5">\n' +
            '                               <div class="card" style="width: 18rem;">\n' +
            '                                <div class="card-body">\n' +
            '                                    <h5 class="card-title">' + autor.nombre + '</h5>\n';

        if (autor.numLibros == 1) {
            cadenaAutores = cadenaAutores + '<button class="btn btn-primary" id="' + autor.cod + '" data-toggle="modal" data-target="#verLibros">Ver Libro</button>';
        }
        else {
            cadenaAutores = cadenaAutores + '<button class="btn btn-primary" id="' + autor.cod + '" data-toggle="modal" data-target="#verLibros">Ver Libros</button>';
        }

        cadenaAutores = cadenaAutores + '<p class="card-text text-right">\n';

        if (autor.numLibros == 1) {
            cadenaAutores = cadenaAutores + '<small class="text-muted">' + autor.numLibros + ' libro escrito</small>\n';
        }
        else {
            cadenaAutores = cadenaAutores + '<small class="text-muted">' + autor.numLibros + ' libros escritos</small>\n';
        }

        cadenaAutores = cadenaAutores + '</p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>';
    }

    let divAutores = document.getElementById('autores');
    divAutores.innerHTML = cadenaAutores;

    let botonesVerLibros = document.querySelectorAll('.btn.btn-primary');

    for (let i = 0; i < botonesVerLibros.length; i++) {
        botonesVerLibros[i].addEventListener('click', () => {
            let autor = autores[i];

            mostrarLibrosPorAutor(autor.cod, autor.nombre);
        });
    }
}

function mostrarLibrosPorAutor(idAutor, nombre) {
    let tituloLibros = document.getElementById('tituloLibros');
    tituloLibros.innerText = 'Libros de ' + nombre;

    fetch('http://localhost:8080/autores/' + idAutor + '/libros')
        .then(resultado => resultado.json())
        .then(resultado => {
            if (resultado.ok) {
                let libros = resultado.data;
                let cadenaLibros = '';

                for (let i = 0; i < libros.length; i++) {
                    let libro = libros[i];

                    cadenaLibros = cadenaLibros + '<div class="col-md-6 mb-4">\n' +
                        '                              <img src="imagenes/' + libro.imagen + '" alt="' + libro.titulo + '" class="img-fluid">\n' +
                        '                          </div>\n' +
                        '                          <div class="col-md-6 mb-4">\n' +
                        '                                        <div class="container-fluid infoLibro">';

                    let precio = libro.precio.toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                    });

                    cadenaLibros = cadenaLibros + '<div class="row">\n' +
                        '                                                        <div class="col-md-12">\n' +
                        '                                                            <p class="font-weight-bold fichaTecnica text-center">Ficha Técnica</p>\n' +
                        '                                                        </div>\n' +
                        '                                                    </div>\n' +
                        '                                                    <div class="row">\n' +
                        '                                                        <div class="col-md-4">\n' +
                        '                                                            <p>Título</p>\n' +
                        '                                                        </div>\n' +
                        '                                                        <div class="col-md-8">\n' +
                        '                                                        <p>' + libro.titulo + '</p>\n' +
                        '</div>\n' +
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
                        '                      </div>' +
                        '</div>\n' +
                        '                                    </div>';
                }

                let divLibros = document.getElementById('libros');
                divLibros.innerHTML = cadenaLibros;
            }
        });
}