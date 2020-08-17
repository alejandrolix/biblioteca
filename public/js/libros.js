let btnNuevoLibro = document.getElementById('btnNuevoLibro');
btnNuevoLibro.addEventListener('click', () => {
    let selectAutores = document.getElementById('autores');

    if (selectAutores.options.length == 0) {
        obtenerAutores();
    }
});

function obtenerAutores() {
    fetch('http://localhost:8080/autores')
        .then(resultado => {
            return resultado.json();
        })
        .then(resultado => {

            if (resultado.ok) {
                let autores = resultado.data;
                mostrarAutores(autores);
            }
        })
        .catch(() => {
            alert('Ha habido un error al obtener los autores');
        });
}

function mostrarAutores(autores) {
    let selectAutores = document.getElementById('autores');

    for (let i = 0; i < autores.length; i++) {
        let autor = autores[i];

        let option = document.createElement('option');
        option.setAttribute('value', autor.cod);

        let txtOption = document.createTextNode(autor.NOMBRE);

        option.appendChild(txtOption);
        selectAutores.appendChild(option);
    }
}

let btnCrearLibro = document.getElementById('btnCrear');
btnCrearLibro.addEventListener('click', () => {
    crearLibro();
});

function crearLibro() {
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

        getBase64(file)
            .then(imagen => {
                libro.imagen = imagen;
                fetch('http://localhost:8080/libros', {
                    method: 'POST',
                    body: JSON.stringify(libro),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(resultado => {
                        return resultado.json();
                    })
                    .then(resultado => {
                        if (resultado.ok) {
                            limpiarFormulario('nuevoLibro');
                            $('#nuevoLibro').modal('hide');
                            getLibros();
                        }
                    })
                    .catch(() => {
                        alert('Ha habido un error al crear el libro');
                    });
            });
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function limpiarFormulario(nombreFormulario) {
    let formulario = document.getElementById(nombreFormulario);
    let controles = formulario.getElementsByTagName('input');

    for (let i = 0; i < controles.length; i++) {
        controles[i].value = '';
    }
}

window.addEventListener('load', () => {
    getLibros();
});

function getLibros() {
    fetch('http://localhost:8080/libros')
        .then((resultado) => {
            return resultado.json();
        })
        .then((resultado) => {
            if (resultado.ok) {
                let libros = resultado.data;
                mostrarLibros(libros);
            }
        })
        .catch(() => {
            alert('Ha habido un error al obtener los libros');
        });
}

function mostrarLibros(libros) {
    let divLibros = document.getElementById('libros');
    let cadenaLibros = '';
    let idsLibros = [];

    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];

        if (libro.activo) {
            idsLibros.push(libro.cod);

            let precio = libro.precio.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
            });

            cadenaLibros = cadenaLibros + '<div class="col-md-4" id="' + libro.cod + '">\n' +
                '                            <div class="card mb-4 shadow-sm">\n' +
                '                                <img src="imagenes/' + libro.imagen + '" class="card-img-top" alt="Segway">\n' +
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
                '                                            <button type="button" class="btnDetalles btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#verLibro">\n' +
                '                                                <i class="fas fa-eye"></i>\n' +
                '                                            </button>\n' +
                '                                            <button class="btnEditar btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#actualizarLibro">\n' +
                '                                                <i class="fas fa-edit"></i>\n' +
                '                                            </button>\n' +
                '                                            <button class="btnEliminar btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-trash"></i>\n' +
                '                                            </button>\n' +
                '                                        </div>\n' +
                '                                        <small class="text-muted">' + precio + '</small>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
        }
    }

    divLibros.innerHTML = cadenaLibros;

    let botonesDetalles = document.querySelectorAll('.btnDetalles');

    for (let i = 0; i < botonesDetalles.length; i++) {
        botonesDetalles[i].addEventListener('click', () => {
            mostrarInfoLibro(idsLibros[i]);
        });
    }

    let botonesEliminar = document.querySelectorAll('.btnEliminar');

    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener('click', () => {
            eliminarLibro(idsLibros[i]);
        });
    }

    let botonesEditar = document.querySelectorAll('.btnEditar');

    for (let i = 0; i < botonesEditar.length; i++) {
        botonesEditar[i].addEventListener('click', () => {
            let idLibro = botonesEditar[i].parentNode.parentNode.parentNode.parentNode.parentNode.id;
            mostrarFormEditarLibro(idLibro);
        });
    }
}

function mostrarInfoLibro(idLibro) {
    fetch('http://localhost:8080/libros/' + idLibro)
        .then((resultado) => {
            return resultado.json();
        })
        .then((resultado) => {

            if (resultado.ok) {
                let libro = resultado.data;

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
            }
        })
        .catch(() => {
            alert('Ha habido un error al obtener los datos del libro');
        });
}

function eliminarLibro(idLibro) {
    Swal.fire({
        title: '¿Está seguro que quiere eliminar el libro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

        if (result.value) {
            fetch('http://localhost:8080/libros/' + idLibro, {
                method: 'DELETE'
            })
            .then((resultado) => {
                return resultado.json();
            })
            .then((resultado) => {
                toastr.success('Libro eliminado', 'Operación eliminada correctamente!!');

                if (resultado.ok) {
                    let libro = document.getElementById(idLibro);
                    libro.remove();
                }
            });
        }
    });
}

function mostrarFormEditarLibro(idLibro) {
    // let autores = obtenerAutores();
    // mostrarAutores(autores);

    fetch('http://localhost:8080/libros/' + idLibro)
        .then(resultado => {
            return resultado.json();
        })
        .then(resultado => {
            console.log(resultado)
            if (resultado.ok) {
                let libro = resultado.data;

                let activo = document.getElementById('activoa');
                activo.checked = libro.activo;

                let codigo = document.getElementById('coda');
                codigo.value = libro.cod;

                let titulo = document.getElementById('tituloa');
                titulo.value = libro.titulo;

                let isbn = document.getElementById('isbna');
                isbn.value = libro.isbn;
            }
        })
        .catch(() => {
            alert('Ha habido un error al obtener los datos del libro');
        });
}