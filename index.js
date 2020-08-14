const express = require('express');

let app = express();
const mysql = require('mysql');

let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manuscrito3po',
    database: 'libreria'
});

conexion.connect((error) => {
    if (error) {
        console.log("Error al conectar con la BD:", error);
    } else {
        console.log("Conexión satisfactoria");
    }
});

// app.use('/', express.static(__dirname + '/public'));     Para crear un servidor web de contenido estático.

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/libros', (req, res) => {
    let sql = 'select l.cod, l.titulo, l.precio, l.imagen, l.activo, a.nombre as autor ' +
              'from libros l ' +
              '     left join autor a on a.cod = l.cod_autor ' +
              'order by l.titulo;';

    conexion.query(sql, (error, resultado) => {
        if (error) {
            res.status(500).send({
               ok: false,
               mensaje: error.message
            });
        }
        else {
            let libros = resultado;

            res.status(200).send({
                ok: true,
                mensaje: 'Libros obtenidos correctamente',
                data: libros
            });
        }
    });
});

app.get('/libros/:id', (req, res) => {
    let idLibro = req.params.id;
    let sql = 'select l.titulo, l.isbn, l.precio, l.imagen, a.nombre as autor ' +
              'from libros l ' +
              '     left join autor a on a.cod = l.cod_autor ' +
              'where l.cod = ?;';

    conexion.query(sql, idLibro, (error, resultado) => {
        if (error) {
            res.status(500).send({
                ok: false,
                mensaje: error.message
            });
        }
        else {
            let libro = resultado[0];

            res.status(200).send({
                ok: true,
                mensaje: 'Libro obtenido correctamente',
                data: libro
            });
        }
    });
});

app.delete('/libros/:id', (req, res) => {
    conexion.query("DELETE FROM libros WHERE cod = ?", req.params.id, (error, resultado) => {
            if (error) {
                res.status(500).send({
                    ok: false,
                    mensaje: 'Error eliminando libro'
                });
            }
            else {
                if (resultado.affectedRows != 0) {
                    res.status(200).json({
                        ok: true,
                        mensaje: 'Libro eliminado correctamente'
                    });
                }
                else {
                    res.status(404).json({
                        ok: false,
                        mensaje: 'No existe el libro'
                    });
                }
            }
    });
});

app.listen(8080);