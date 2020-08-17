const express = require('express');
const mysql = require('mysql');

let app = express();

function obtenerConexionBd() {
    let conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca2'
    });

    conexion.connect(error => {
        if (error) {
            console.log("Error al conectar con la BD: ", error);
        }
    });

    return conexion;
}

// app.use('/', express.static(__dirname + '/public'));     Para crear un servidor web de páginas estáticas.

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/libros', (req, res) => {
    let sql = `select l.cod, l.titulo, l.precio, l.imagen, l.activo, a.nombre as autor 
               from libros l 
                    left join autor a on a.cod = l.cod_autor
               order by l.titulo;`;

    let codigoRespuesta = 0;
    let respuesta = null;

    let conexion = obtenerConexionBd();
    conexion.query(sql, (error, resultado) => {
        if (error) {
            codigoRespuesta = 500;
            respuesta = {
                ok: false,
                mensaje: error.message
            };
        }
        else {
            let libros = resultado;
            codigoRespuesta = 200;
            respuesta = {
                ok: true,
                mensaje: 'Libros obtenidos correctamente',
                data: libros
            };
        }

        conexion.end();

        res.status(codigoRespuesta)
           .send(respuesta);
    });
});

app.get('/libros/:id', (req, res) => {
    let idLibro = req.params.id;
    let sql = `select l.titulo, l.isbn, l.precio, l.imagen, a.nombre as autor 
               from libros l 
                    left join autor a on a.cod = l.cod_autor 
               where l.cod = ?;`;

    let codigoRespuesta = 0;
    let respuesta = null;

    let conexion = obtenerConexionBd();
    conexion.query(sql, idLibro, (error, resultado) => {
        if (error) {
            codigoRespuesta = 500;
            respuesta = {
                ok: false,
                mensaje: error.message
            };
        }
        else {
            if (resultado.length == 0) {
                codigoRespuesta = 404;
                respuesta = {
                    ok: false,
                    mensaje: 'No existe el libro con id ' + idLibro
                };
            }
            else {
                let libro = resultado[0];
                codigoRespuesta = 200;
                respuesta = {
                    ok: true,
                    mensaje: 'Libro obtenido correctamente',
                    data: libro
                };
            }
        }

        conexion.end();

        res.status(codigoRespuesta)
           .send(respuesta);
    });
});

app.delete('/libros/:id', (req, res) => {
    let codigoRespuesta = 0;
    let respuesta = null;
    let idLibro = req.params.id;
    let sql = `delete from libros
               where cod = ?;`;

    let conexion = obtenerConexionBd();
    conexion.query(sql, idLibro, (error, resultado) => {
        if (error) {
            codigoRespuesta = 500;
            respuesta = {
                ok: false,
                mensaje: 'Error eliminando libro con id ' + idLibro
            };
        }
        else {
            if (resultado.affectedRows != 0) {
                codigoRespuesta = 200;
                respuesta = {
                    ok: true,
                    mensaje: 'Libro eliminado correctamente'
                };
            }
            else {
                codigoRespuesta = 404;
                respuesta = {
                    ok: false,
                    mensaje: 'No existe el libro con id ' + idLibro
                };
            }
        }

        conexion.end();

        res.status(codigoRespuesta)
           .json(respuesta);
    });
});

app.listen(8080);