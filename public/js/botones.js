import {Libro} from "./libro.js";

class Botones {
    _botones;
    _nombreClaseBotones;

    constructor(nombreClaseBotones) {
        this._nombreClaseBotones = nombreClaseBotones;
    }

    obtenerBotones(nombreClase) {
        this._botones = document.querySelectorAll(nombreClase);
    }

    asociarEvento(libros) {
        for (let i = 0; i < this._botones.length; i++) {
            let libro = new Libro(libros[i].cod);

            switch (this._nombreClaseBotones) {
                case '.btnDetalles':
                    libro.mostrar();
                    break;

                case '.btnEditar':
                    libro.editar();
                    break;

                case '.btnEliminar':
                    libro.eliminar();
                    break;

                default:
                    alert('error');
                    break;
            }

            this._botones[i].addEventListener('click', () => libro.mostrar());
        }
    }
}