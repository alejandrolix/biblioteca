import {PeticionAjax} from "./utilidades/peticionAjax.js";
import {Autores} from "./autores/autores.js";
import {Libro} from "./libro.js";

export class Formulario {
    static mostrarFormCrearEditarLibro(idLibro) {
        let tituloModal = document.getElementById('tituloModal');
        let btnAccion = document.getElementById('btnAccion');
        let txtBtnAccion = null;

        if (idLibro == 0) {
            tituloModal.innerText = 'Nuevo Libro';
            txtBtnAccion = document.createTextNode('Guardar');

            if (btnAccion.childNodes.length == 0) {
                btnAccion.appendChild(txtBtnAccion);
            }

            btnAccion.addEventListener('click', () => {
                let libro = new Libro();
                libro.cod = idLibro;
                libro.crear();
            });
        }
        else {
            PeticionAjax.get('http://localhost:8080/libros/' + idLibro)
                .then(libro => {
                    Autores.cargarSelect(libro[0].autor);
                    txtBtnAccion = document.createTextNode('Editar');

                    if (btnAccion.childNodes.length == 0) {
                        btnAccion.appendChild(txtBtnAccion);
                    }

                    btnAccion.addEventListener('click', () => {
                        let nuevoLibro = new Libro();
                        nuevoLibro.cod = libro[0].cod;

                        nuevoLibro.editar();
                    });

                    tituloModal.innerText = 'Editar libro ' + libro[0].titulo;

                    let activo = document.getElementById('activo');
                    activo.checked = libro[0].activo;

                    let codigo = document.getElementById('cod');
                    codigo.value = libro[0].cod;
                    codigo.disabled = true;

                    let titulo = document.getElementById('titulo');
                    titulo.value = libro[0].titulo;

                    let isbn = document.getElementById('isbn');
                    isbn.value = libro[0].isbn;

                    let precio = document.getElementById('precio');
                    precio.value = libro[0].precio;

                    let url = document.getElementById('url');
                    url.value = libro[0].url;
                });
        }
    }

    static limpiar(nombreFormulario) {
        let formulario = document.getElementById(nombreFormulario);
        let controles = formulario.getElementsByTagName('input');

        for (let i = 0; i < controles.length; i++) {
            controles[i].value = '';
        }
    }
}