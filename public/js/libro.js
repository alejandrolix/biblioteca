import {PeticionAjax} from "./utilidades/peticionAjax.js";
import {Libreria} from "./libreria.js";
import {Formulario} from "./formulario.js";
import {ConversorBase64} from "./utilidades/conversorBase64.js";

export class Libro {
    _cod;
    _activo;
    _titulo;
    _autor;
    _isbn;
    _precio;
    _url;
    _imagen;

    constructor() {
        this.cod = null;
        this.activo = false;
        this.titulo = null;
        this.autor = null;
        this.isbn = null;
        this.precio = 0;
        this.url = null;
        this.imagen = null;
    }

    get cod() {
        return this._cod;
    }

    set cod(value) {
        this._cod = value;
    }

    get activo() {
        return this._activo;
    }

    set activo(value) {
        this._activo = value;
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(value) {
        this._titulo = value;
    }

    get autor() {
        return this._autor;
    }

    set autor(value) {
        this._autor = value;
    }

    get isbn() {
        return this._isbn;
    }

    set isbn(value) {
        this._isbn = value;
    }

    get precio() {
        return this._precio;
    }

    set precio(value) {
        this._precio = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get imagen() {
        return this._imagen;
    }

    set imagen(value) {
        this._imagen = value;
    }

    eliminar() {
        Swal.fire({
            title: '¿Está seguro que quiere eliminar el libro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(result => {
            if (result.value) {

                PeticionAjax.delete('http://localhost:8080/libros/' + this._cod)
                    .then(() => {
                        toastr.success('Libro eliminado', 'Operación eliminada correctamente!!');
                        let tarjetaLibro = document.getElementById('btnDetalles-' + this.cod).parentNode.parentNode.parentNode.parentNode.parentNode;
                        tarjetaLibro.remove();
                    });
            }
        });
    }

    crear() {
        let activo = document.getElementById('activo').checked;
        let cod = document.getElementById('cod').value;
        let titulo = document.getElementById('titulo').value;
        let autores = document.getElementById('autores');

        let codAutor = autores.options[autores.selectedIndex].value;
        let isbn = document.getElementById('isbn').value;
        let precio = document.getElementById('precio').value;
        let url = document.getElementById('url').value;

        if (url === '') {
            url = null;
        }

        let libro = {
            activo: activo,
            cod: cod,
            titulo: titulo,
            autor: codAutor,
            isbn: isbn,
            precio: precio,
            url: url
        };

        if (cod !== '' && titulo !== '' && isbn !== '' && precio !== '') {
            let imagen = document.getElementById('imagenLibro');
            let file = imagen.files[0];

            if (imagen.value != '') {
                ConversorBase64.getBase64(file)
                    .then(imagen => {
                        libro.imagen = imagen;
                        PeticionAjax.post('http://localhost:8080/libros', libro)
                            .then(() => {
                                Formulario.limpiar('formularioLibro');
                                $('#formularioLibro').modal('hide');

                                toastr.success('Se ha creado el libro correctamente', 'Libro creado');
                                Libreria.getLibros();
                            });
                    });
            }
        }
    }

    editar() {
        let activo = document.getElementById('activo');
        let codigo = document.getElementById('cod');
        let titulo = document.getElementById('titulo');
        let autores = document.getElementById('autores');
        let isbn = document.getElementById('isbn');
        let precio = document.getElementById('precio');
        let url = document.getElementById('url');
        let imagen = document.getElementById('imagenLibro');

        let libroEditar = {
            activo: activo.checked,
            codigo: codigo.value,
            titulo: titulo.value,
            autor: autores.value,
            isbn: isbn.value,
            precio: precio.value,
            url: url.value
        };

        if (imagen.value != '') {
            let file = imagen.files[0];

            ConversorBase64.getBase64(file)
                .then(imagen => {
                    libroEditar.imagen = imagen;
                    PeticionAjax.put('http://localhost:8080/libros/' + libroEditar.codigo, libroEditar)
                        .then(() => {
                            Formulario.limpiar('formularioLibro');
                            $('#formularioLibro').modal('hide');
                            toastr.success('Se ha actualizado el libro correctamente', 'Libro actualizado');

                            Libreria.getLibros();
                        });
                });
        }
    }

    mostrar() {
        PeticionAjax.get('http://localhost:8080/libros/' + this._cod)
            .then(libro => {
                let precio = libro[0].precio.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                });

                let tituloLibro = document.getElementById('tituloLibro');
                tituloLibro.innerText = libro[0].titulo;

                let imgLibro = document.getElementById('imagen');
                imgLibro.setAttribute('src', 'imagenes/' + libro[0].imagen);
                imgLibro.setAttribute('alt', libro[0].titulo);

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

                if (libro[0].autor == null) {
                    cadenaLibro = cadenaLibro + '<p>Anónimo</p>\n';
                }
                else {
                    cadenaLibro = cadenaLibro + '<p>' + libro[0].autor + '</p>\n';
                }

                cadenaLibro = cadenaLibro + '</div>\n' +
                    '                                </div>\n' +
                    '                                <div class="row">\n' +
                    '                                    <div class="col-md-4">\n' +
                    '                                        <p>ISBN</p>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-md-8">\n' +
                    '                                        <p>' + libro[0].isbn + '</p>\n' +
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
    }
}