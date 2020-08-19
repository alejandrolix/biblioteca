import {Libro} from "./libro.js";

let btnNuevoLibro = document.getElementById('btnNuevoLibro');
btnNuevoLibro.addEventListener('click', () => {
    let selectAutores = document.getElementById('autores');

    if (selectAutores.options.length == 0) {
        mostrarAutores('autores')
            .then(() => mostrarFormularioCrearEditarLibro(0));
    }
});

function mostrarAutores(nombreSelect) {
    let autores = new Promise((resolve, reject) => {

        fetch('http://localhost:8080/autores')
            .then(resultado => resultado.json())
            .then(resultado => {

                if (resultado.ok) {
                    let autores = resultado.data;
                    let selectAutores = document.getElementById(nombreSelect);

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

                    return resolve();
                }
            })
            .catch(() => {
                alert('Ha habido un error al obtener los autores');
                return reject();
            });
    });

    return autores;
}

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
                    .catch(() => alert('Ha habido un error al crear el libro'));
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

function eliminarLibro(idLibro) {
    Swal.fire({
        title: '¿Está seguro que quiere eliminar el libro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {

        if (result.value) {
            fetch('http://localhost:8080/libros/' + idLibro, {
                method: 'DELETE'
            })
            .then(resultado => resultado.json())
            .then(resultado => {
                toastr.success('Libro eliminado', 'Operación eliminada correctamente!!');

                if (resultado.ok) {
                    let libro = document.getElementById(idLibro);
                    libro.remove();
                }
            });
        }
    });
}

function mostrarFormularioCrearEditarLibro(idLibro) {
    let tituloModal = document.getElementById('tituloModal');
    let btnAccion = document.getElementById('btnAccion');
    let txtBtnAccion = null;

    if (idLibro == 0) {
        tituloModal.innerText = 'Nuevo Libro';

        if (btnAccion.childNodes.length == 0) {
            btnAccion.appendChild(txtBtnAccion);
        }

        txtBtnAccion = document.createTextNode('Guardar');
        btnAccion.addEventListener('click', () => crearLibro());
    }
    else {
        fetch('http://localhost:8080/libros/' + idLibro)
            .then(resultado => resultado.json())
            .then(resultado => {

                if (resultado.ok) {
                    mostrarAutores('autores')
                        .then(() => {
                            txtBtnAccion = document.createTextNode('Editar');

                            if (btnAccion.childNodes.length == 0) {
                                btnAccion.appendChild(txtBtnAccion);
                            }

                            btnAccion.addEventListener('click', () => editarLibro());

                            let libro = resultado.data;

                            tituloModal.innerText = 'Editar libro ' + libro.titulo;

                            let activo = document.getElementById('activo');
                            activo.checked = libro.activo;

                            let codigo = document.getElementById('cod');
                            codigo.value = libro.cod;
                            codigo.disabled = true;

                            let titulo = document.getElementById('titulo');
                            titulo.value = libro.titulo;

                            let autores = document.getElementById('autores');

                            for (let i = 0; i < autores.options.length; i++) {
                                if (autores.options[i].text === libro.autor) {
                                    autores.options[i].selected = true;
                                }
                            }

                            let isbn = document.getElementById('isbn');
                            isbn.value = libro.isbn;

                            let precio = document.getElementById('precio');
                            precio.value = libro.precio;

                            let url = document.getElementById('url');
                            url.value = libro.url;
                        })
                        .catch(() => alert('Ha habido un error al mostrar el desplegable de autores'));
                }
            })
            .catch(() => alert('Ha habido un error al obtener los datos del libro'));
    }
}

function editarLibro() {
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

    let file = imagen.files[0];

    getBase64(file)
        .then(imagen => {
            libroEditar.imagen = imagen;

            fetch('http://localhost:8080/libros/' + libroEditar.codigo, {
                method: 'PUT',
                body: JSON.stringify(libroEditar),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => resultado.json())
                .then(resultado => {

                    if (resultado.ok) {
                        limpiarFormulario('actualizarLibro');
                        $('#actualizarLibro').modal('hide');
                        toastr.success('Se ha actualizado el libro correctamente', 'Libro actualizado');

                        getLibros();
                    }
                })
                .catch(() => alert('Ha habido un error al modificar los datos del libro'));
        });
}