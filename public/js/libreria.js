import {PeticionAjax} from "./peticionAjax.js";

export class Libreria {
    static getLibros() {
        PeticionAjax.peticionGet('http://localhost:8080/libros')
            .then(libros => Libreria.mostrarLibros(libros))
            .catch(error => Swal.fire('Error', 'No se ha podido obtener los libros del servidor: ' + error, 'error'));
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

                cadenaLibros = cadenaLibros + '<div class="col-md-4" id="' + libro.cod + '">\n' +
                    '                            <div class="card mb-4 shadow-sm">\n' +
                    '                                <img src="imagenes/' + libro.imagen + '" class="card-img-top" alt="' + libro.titulo + '">\n' +
                    '                                <div class="card-body">\n' +
                    '                                    <p class="card-text">' + libro.titulo + '</p>\n';

                if (libro.autor == null) {
                    cadenaLibros = cadenaLibros + '<p class="card-text">Anónimo</p>\n';
                } else {
                    cadenaLibros = cadenaLibros + '<p class="card-text">' + libro.autor + '</p>\n';
                }

                cadenaLibros = cadenaLibros + '<div class="d-flex justify-content-between align-items-center">\n' +
                    '                                        <div class="btn-group">\n' +
                    '                                            <button type="button" class="btnDetalles btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#verLibro">\n' +
                    '                                                <i class="fas fa-eye"></i>\n' +
                    '                                            </button>\n' +
                    '                                            <button class="btnEditar btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#formularioLibro">\n' +
                    '                                                <i class="fas fa-edit"></i>\n' +
                    '                                            </button>\n' +
                    '                                            <button class="btnEliminar btn btn-sm btn-outline-secondary">\n' +
                    '                                                <i class="fas fa-trash"></i>\n' +
                    '                                            </button>\n' +
                    '                                        </div>\n' +
                    '                                        <small class="text-muted">' + precio + '</small>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>';

                divLibros.innerHTML = cadenaLibros;

                let botonesDetalles = document.querySelectorAll('.btnDetalles');

                for (let i = 0; i < botonesDetalles.length; i++) {
                    let libro = libros[i];

                    botonesDetalles[i].addEventListener('click', () => mostrarInfoLibro(libro.cod));
                }

                let botonesEliminar = document.querySelectorAll('.btnEliminar');

                for (let i = 0; i < botonesEliminar.length; i++) {
                    let libro = libros[i];

                    botonesEliminar[i].addEventListener('click', () => eliminarLibro(libro.cod));
                }

                let botonesEditar = document.querySelectorAll('.btnEditar');

                for (let i = 0; i < botonesEditar.length; i++) {
                    botonesEditar[i].addEventListener('click', () => {
                        let idLibro = botonesEditar[i].parentNode.parentNode.parentNode.parentNode.parentNode.id;

                        mostrarFormularioCrearEditarLibro(idLibro);
                    });
                }
            }
        }
    }
}