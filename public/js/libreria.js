import {PeticionAjax} from "./peticionAjax.js";
import {Botones} from "./botones.js";

export class Libreria {
    static getLibros() {
        PeticionAjax.get('http://localhost:8080/libros')
            .then(libros => Libreria.mostrarLibros(libros))
            .catch(error => Swal.fire('Error', 'No se han podido obtener los libros del servidor: ' + error, 'error'));
    }

    static mostrarLibros(libros) {
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
                    '                                <img src="imagenes/' + libro.imagen + '" class="card-img-top" alt="' + libro.titulo + '">\n' +
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
                    '                                            <button type="button" id="btnDetalles-' + libro.cod + '" class="btnDetalles btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#verLibro">\n' +
                    '                                                <i class="fas fa-eye"></i>\n' +
                    '                                            </button>\n' +
                    '                                            <button type="button" id="btnEditar-' + libro.cod + '" class="btnEditar btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#formularioLibro">\n' +
                    '                                                <i class="fas fa-edit"></i>\n' +
                    '                                            </button>\n' +
                    '                                            <button type="button" id="btnEliminar-' + libro.cod + '" class="btnEliminar btn btn-sm btn-outline-secondary">\n' +
                    '                                                <i class="fas fa-trash"></i>\n' +
                    '                                            </button>\n' +
                    '                                        </div>\n' +
                    '                                        <small class="text-muted">' + precio + '</small>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>';

                divLibros.innerHTML = cadenaLibros;

                let botonesDetalles = new Botones();
                botonesDetalles.obtenerBotones('.btnDetalles');
                botonesDetalles.asociarEventoClick(12);

                let botonesEditar = new Botones();
                botonesEditar.obtenerBotones('.btnEditar');
                botonesEditar.asociarEventoClick(10);

                let botonesEliminar = new Botones();
                botonesEliminar.obtenerBotones('.btnEliminar');
                botonesEliminar.asociarEventoClick(12);
            }
        }
    }

    static mostrarAutores() {
        PeticionAjax.get('http://localhost:8080/autores/totalLibros')
            .then(autores => {
                let cadenaAutores = '';

                for (let i = 0; i < autores.length; i++) {
                    let autor = autores[i];

                    cadenaAutores = cadenaAutores + '<div class="col-md-4 mb-5">\n' +
                        '                               <div class="card" style="width: 18rem;">\n' +
                        '                                <div class="card-body">\n' +
                        '                                    <h5 class="card-title">' + autor.nombre + '</h5>\n';

                    if (autor.numLibros == 1) {
                        cadenaAutores = cadenaAutores + '<button class="btnVerLibros btn btn-primary" id="' + autor.cod + '-' + autor.nombre + '" data-toggle="modal" data-target="#verLibros">Ver Libro</button>';
                    }
                    else {
                        cadenaAutores = cadenaAutores + '<button class="btnVerLibros btn btn-primary" id="' + autor.cod + '-' + autor.nombre + '" data-toggle="modal" data-target="#verLibros">Ver Libros</button>';
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

                let botonesVerLibros = new Botones();
                botonesVerLibros.obtenerBotones('.btnVerLibros');
                botonesVerLibros.asociarEventoClick(1);
            });
    }

    static mostrarLibrosPorAutor(autor) {
        let tituloLibros = document.getElementById('tituloLibros');
        tituloLibros.innerText = 'Libros de ' + autor.nombre;

        PeticionAjax.get('http://localhost:8080/autores/' + autor.codigo + '/libros')
            .then(libros => {
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
            });
    }
}