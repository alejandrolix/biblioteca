function getLibros() {
    let libros = {
      libros: [
          {
              id: 1,
              titulo: 'El capitán Alatriste',
              autor: {
                  id: 2,
                  nombre: 'Arturo Pérez Reverte'
              },
              isbn: 'cscscscsmmofsdvsd',
              precio: 25.50,
              activo: true,
              imagen: 'segway1.jpg'
          },
          {
              id: 2,
              titulo: 'El Nombre de la Rosa',
              autor: {
                  id: 3,
                  nombre: 'Umberto Eco'
              },
              isbn: '444A',
              precio: 45,
              activo: true,
              imagen: 'segway1.jpg'
          },
          {
              id: 3,
              titulo: 'El Señor de los Anillos',
              autor: {
                  id: 4,
                  nombre: 'Tolkin'
              },
              isbn: '555A',
              precio: 70,
              activo: true,
              imagen: 'segway1.jpg'
          },
          {
              id: 3,
              titulo: 'Los Pilares de la tierra',
              autor: {
                  id: 4,
                  nombre: 'Ken Follet'
              },
              isbn: '555A',
              precio: 70,
              activo: false,
              imagen: 'segway1.jpg'
          }
      ]
    };

    return libros;
}

window.addEventListener('load', () => {
    let libros = getLibros();
    let divLibros = document.getElementById('libros');
    let cadenaLibros = '';

    for (let i = 0; i < libros.libros.length; i++) {
        let libro = libros.libros[i];

        if (libro.activo) {
            cadenaLibros = cadenaLibros + '<div class="col-md-4">\n' +
                '                            <div class="card mb-4 shadow-sm">\n' +
                '                                <img src="imagenes/' + libro.imagen + '" class="img-fluid" alt="Segway">\n' +
                '                                <div class="card-body">\n' +
                '                                    <p class="card-text">' + libro.titulo + '</p>\n' +
                '                                    <p class="card-text">' + libro.autor.nombre + '</p>\n' +
                '                                    <div class="d-flex justify-content-between align-items-center">\n' +
                '                                        <div class="btn-group">\n' +
                '                                            <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#verLibro">\n' +
                '                                                <i class="fas fa-eye"></i>\n' +
                '                                            </button>\n' +
                '                                            <a href="formularioLibro.html" class="btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-edit"></i>\n' +
                '                                            </a>\n' +
                '                                            <a href="eliminar.html" class="btn btn-sm btn-outline-secondary">\n' +
                '                                                <i class="fas fa-trash"></i>\n' +
                '                                            </a>\n' +
                '                                        </div>\n' +
                '                                        <small class="text-muted">' + libro.precio.toLocaleString('es-ES', {
                                                            style: 'currency',
                                                            currency: 'EUR'
                                                        }) + '</small>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '\n' +
                '                            </div>\n' +
                '                        </div>';
        }
    }

    divLibros.innerHTML = cadenaLibros;
});
