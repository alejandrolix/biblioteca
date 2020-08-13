const express = require('express');

let app = express();
// app.use('/', express.static(__dirname + '/public'));     Para crear un servidor web de contenido estático.

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/libros', (req, res) => {
    let libros = {
        mensaje: 'hola, bienvenido',
        ok: true,
        data: [
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
                imagen: 'elCapitanAlatriste'
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
                imagen: 'elNombreDeLaRosa'
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
                imagen: 'elSenorDeLosAnillos'
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
                imagen: 'nodeJs'
            }
        ]
    };

    res.status(200)
       .send(libros);
});

app.get('/libros/:id', (req, res) => {
    let libros = {
        mensaje: 'hola, bienvenido',
        ok: true,
        data: [
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
                imagen: 'elCapitanAlatriste'
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
                imagen: 'elNombreDeLaRosa'
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
                imagen: 'elSenorDeLosAnillos'
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
                imagen: 'nodeJs'
            }
        ]
    };
    let idLibro = parseInt(req.params.id);
    let resultado = {
        ok: true,
        mensaje: 'Libro encontrado'
    };
    let existeLibro = false;
    let codigoRespuesta = 0;

    for (let i = 0; i < libros.data.length; i++) {
        let libro = libros.data[i];

        if (libro.id == idLibro) {
            existeLibro = true;
            resultado.data = libro;
            codigoRespuesta = 200;

            break;
        }
    }

    if (!existeLibro) {
        codigoRespuesta = 404;
        resultado.ok = false;
        resultado.mensaje = 'No se ha encontrado el libro';
    }

    res.status(codigoRespuesta)
       .json(resultado);
});

app.listen(8080);