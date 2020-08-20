import {PeticionAjax} from "../peticionAjax.js";
import {Libreria} from "../libreria.js";

window.addEventListener('DOMContentLoaded', () => Libreria.mostrarAutores());

export class Autores {

    static cargarSelect(autorASeleccionar = null) {
        PeticionAjax.get('http://localhost:8080/autores')
            .then(autores => {
                let selectAutores = document.getElementById('autores');

                if (selectAutores.options.length >= 1) {
                    let numOptions = selectAutores.options.length;

                    while (numOptions >= 1) {
                        let numUltimaPosicion = selectAutores.options.length - 1;

                        selectAutores.options[numUltimaPosicion].remove();
                        numOptions = selectAutores.options.length;
                    }
                }

                for (let i = 0; i < autores.length; i++) {
                    let autor = autores[i];

                    let option = document.createElement('option');
                    option.setAttribute('value', autor.cod);

                    let txtOption = document.createTextNode(autor.NOMBRE);

                    option.appendChild(txtOption);
                    selectAutores.appendChild(option);
                }

                if (autorASeleccionar != null) {
                    Autores.seleccionarAutor(autorASeleccionar);
                }
            });
    }

    static seleccionarAutor(autor) {
        let autores = document.getElementById('autores');

        for (let i = 0; i < autores.options.length; i++) {
            if (autores.options[i].text === autor) {
                autores.options[i].selected = true;
            }
        }
    }
}