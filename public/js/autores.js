window.addEventListener('DOMContentLoaded', () => {
   obtenerAutores();
});

function obtenerAutores() {
    fetch('http://localhost:8080/autores/totalLibros')
        .then(resultado => {
            return resultado.json();
        })
        .then(resultado => {
            if (resultado.ok) {
                let autores = resultado.data;
                mostrarAutores(autores);
            }
        });
}

function mostrarAutores(autores) {
    let cadenaAutores = '';

    for (let i = 0; i < autores.length; i++) {
        let autor = autores[i];

        cadenaAutores = cadenaAutores + '<div class="col-md-4 mb-5">\n' +
            '                               <div class="card" style="width: 18rem;">\n' +
            '                                <div class="card-body">\n' +
            '                                    <h5 class="card-title">' + autor.nombre + '</h5>\n';

        if (autor.numLibros == 1) {
            cadenaAutores = cadenaAutores + '<button class="btn btn-primary">Ver Libro</button>';
        }
        else {
            cadenaAutores = cadenaAutores + '<button class="btn btn-primary">Ver Libros</button>';
        }

        cadenaAutores = cadenaAutores + '<p class="card-text text-right">\n';

        if (autor.numLibros == 1) {
            cadenaAutores = cadenaAutores + '<small class="text-muted">' + autor.numLibros + ' libro escrito</small>\n';
        }
        else {
            cadenaAutores = cadenaAutores + '<small class="text-muted">' + autor.numLibros + ' libros escritos</small>\n';
        }

        cadenaAutores = cadenaAutores + '</p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>';
    }

    let divAutores = document.getElementById('autores');
    divAutores.innerHTML = cadenaAutores;
}