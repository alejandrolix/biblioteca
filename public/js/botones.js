import {Libro} from "./libro.js";
import {Formularios} from "./formularios.js";
import {Autor} from "./autor.js";
import {Libreria} from "./libreria.js";

export class Botones {
    _botones;
    _nombreClase;

    constructor() {
        this._botones = null;
        this._nombreClase = null;
    }

    obtenerBotones(nombreClase) {
        this._nombreClase = nombreClase;
        this._botones = document.querySelectorAll(nombreClase);
    }

    asociarEventoClick(posicionCodLibro) {
        for (let i = 0; i < this._botones.length; i++) {
            let boton = this._botones[i];

            let id = boton.getAttribute('id')
                          .substr(posicionCodLibro);

            let libro = new Libro();
            libro.cod = id;

            let funcion = null;

            switch (this._nombreClase) {
                case '.btnDetalles':
                    funcion = () => libro.mostrar();
                    break;

                case '.btnEditar':
                    funcion = () => Formularios.mostrarFormCrearEditarLibro(libro.cod);
                    break;

                case '.btnEliminar':
                    funcion = () => libro.eliminar();
                    break;

                case '.btnVerLibros':
                    let idBoton = boton.getAttribute('id');

                    let autor = new Autor();
                    autor.codigo = idBoton.split('-')[0];
                    autor.nombre = idBoton.split('-')[1];

                    funcion = () => Libreria.mostrarLibrosPorAutor(autor);
                    break;

                default:
                    alert('No existe ningún botón con la clase ' + this._nombreClase);
                    break;
            }

            boton.addEventListener('click', () => funcion());
        }
    }
}