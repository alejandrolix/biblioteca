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
}