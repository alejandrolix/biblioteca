'use strict';

import {Libreria} from "./libreria.js";
import {Autores} from "./autores.js";
import {Formularios} from "./formularios.js";

(() => {
    window.addEventListener('load', () => {
        Libreria.getLibros();

        let btnNuevoLibro = document.getElementById('btnNuevoLibro');
        btnNuevoLibro.addEventListener('click', () => {
            Autores.cargarSelect(null);
            Formularios.mostrarFormCrearEditarLibro(0);
        });
    });
})();
