import {PeticionAjax} from "./peticionAjax.js";

export class Libro {
    _cod;
    _activo;
    _titulo;
    _autor;
    _isbn;
    _precio;
    _url;

    constructor(cod) {
        this._cod = cod;
    }

    eliminar() {

    }

    crear() {

    }

    editar() {

    }

    mostrar() {
        PeticionAjax.peticionGet('http://localhost:8080/libros/' + this._cod)
            .then(libro => {
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
                    '                                    <div class="col-md-8">\n';

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
            });

            // Libro.obtenerLibroPorId(idLibro)
            //     .then(libro => {
            //         let precio = libro.precio.toLocaleString('es-ES', {
            //             style: 'currency',
            //             currency: 'EUR'
            //         });
            //
            //         let tituloLibro = document.getElementById('tituloLibro');
            //         tituloLibro.innerText = libro.titulo;
            //
            //         let imgLibro = document.getElementById('imagen');
            //         imgLibro.setAttribute('src', 'imagenes/' + libro.imagen);
            //         imgLibro.setAttribute('alt', libro.titulo);
            //
            //         let cadenaLibro = '';
            //         let fichaTecnica = document.querySelector('.infoLibro');
            //
            //         cadenaLibro = cadenaLibro + '<div class="row">\n' +
            //             '                                    <div class="col-md-12">\n' +
            //             '                                        <p class="font-weight-bold fichaTecnica text-center">Ficha Técnica</p>\n' +
            //             '                                    </div>\n' +
            //             '                                </div>\n' +
            //             '                                <div class="row">\n' +
            //             '                                    <div class="col-md-4">\n' +
            //             '                                        <p>Autor</p>\n' +
            //             '                                    </div>\n' +
            //             '                                    <div class="col-md-8">\n';
            //
            //         if (libro.autor == null) {
            //             cadenaLibro = cadenaLibro + '<p>Anónimo</p>\n';
            //         }
            //         else {
            //             cadenaLibro = cadenaLibro + '<p>' + libro.autor + '</p>\n';
            //         }
            //
            //         cadenaLibro = cadenaLibro + '</div>\n' +
            //             '                                </div>\n' +
            //             '                                <div class="row">\n' +
            //             '                                    <div class="col-md-4">\n' +
            //             '                                        <p>ISBN</p>\n' +
            //             '                                    </div>\n' +
            //             '                                    <div class="col-md-8">\n' +
            //             '                                        <p>' + libro.isbn + '</p>\n' +
            //             '                                    </div>\n' +
            //             '                                </div>\n' +
            //             '                                <div class="row">\n' +
            //             '                                    <div class="col-md-4">\n' +
            //             '                                        <p>Precio</p>\n' +
            //             '                                    </div>\n' +
            //             '                                    <div class="col-md-8">\n' +
            //             '                                        <p>' + precio + '</p>\n' +
            //             '                                    </div>\n' +
            //             '                      </div>';
            //
            //         fichaTecnica.innerHTML = cadenaLibro;
            //     })
            //     .catch(mensaje => alert(mensaje));
    }

    static obtenerLibro(idLibro) {
        PeticionAjax.peticionGet('http://localhost:8080/libros/' + idLibro)
            .then(libro => {
                mostrarInfoLibro(libro.cod);
            });

        // let libro = new Promise((resolve, reject) => {
        //     fetch('http://localhost:8080/libros/' + idLibro)
        //         .then(resultado => resultado.json())
        //         .then(resultado => {
        //
        //             if (resultado.ok) {
        //                 let libro = resultado.data;
        //
        //                 return resolve(libro);
        //             }
        //         })
        //         .catch(() => {
        //             let mensaje = 'Ha habido un error al obtener los datos del libro con id ' + idLibro;
        //
        //             return reject(mensaje);
        //         });
        // });
        //
        // return libro;
    }

    static obtenerLibros() {
        let libros = new Promise((resolve, reject) => {
            fetch('http://localhost:8080/libros')
                .then(resultado => resultado.json())
                .then(resultado => {

                    if (resultado.ok) {
                        let libros = [];

                        for (let i = 0; i < resultado.data.length; i++) {
                            let libro = resultado.data[i];

                            if (libro.activo) {
                                libros.push(libro);
                            }
                        }

                        return resolve(libros);
                    }
                })
                .catch(() => reject('Ha habido un error al obtener los libros'));
        });

        return libros;
    }
}