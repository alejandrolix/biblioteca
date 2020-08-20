'use strict';

import {Libreria} from "./libreria.js";
import {Autores} from "./autores.js";
import {Formulario} from "./formulario.js";

(() => {
    window.addEventListener('load', () => {
        Libreria.getLibros();

        let btnNuevoLibro = document.getElementById('btnNuevoLibro');
        btnNuevoLibro.addEventListener('click', () => {
            Autores.cargarSelect(null);
            Formulario.mostrarFormCrearEditarLibro(0);
        });
    });
})();
