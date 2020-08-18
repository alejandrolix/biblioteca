const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mime = require('mime');
const fs = require('fs');

let app = express();
app.use(bodyParser.json({
    limit: '50mb'
}));

function obtenerConexionBd() {
    let conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'libreria'
    });

    conexion.connect(error => {
        if (error) {
            console.log("Error al conectar con la BD: ", error);
        }
    });

    return conexion;
}

app.use('/', express.static(__dirname + '/public'));     // Para crear un servidor web de páginas estáticas.

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

            for (let i = 0; i < libros.length;  i++) {
                let libro = libros[i];

                if (!fs.existsSync('public/imagenes/' + libro.imagen)) {
                    libro.imagen = 'noDisponible.png';
                }
            }

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
    let sql = `select l.cod, l.titulo, l.isbn, l.precio, l.imagen, l.activo, a.nombre as autor 
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

app.get('/autores', (req, res) => {
    let sql = `select cod, NOMBRE
               from autor
               order by NOMBRE;`;

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
            let autores = resultado;
            codigoRespuesta = 200;
            respuesta = {
                ok: true,
                mensaje: 'Autores obtenidos correctamente',
                data: autores
            };
        }

        conexion.end();

        res.status(codigoRespuesta)
            .send(respuesta);
    });
});

app.get('/autores/totalLibros', (req, res) => {
    let sql = `select a.cod, a.nombre, count(l.cod) as numLibros
               from autor a
                    inner join libros l on a.COD = l.COD_AUTOR
               group by a.cod, a.NOMBRE
               order by a.NOMBRE;`;

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
            let autores = resultado;
            codigoRespuesta = 200;
            respuesta = {
                ok: true,
                mensaje: 'Autores obtenidos correctamente',
                data: autores
            };
        }

        conexion.end();

        res.status(codigoRespuesta)
           .send(respuesta);
    });
});

app.get('/autores/:id/libros', (req, res) => {
    let sql = `select titulo, isbn, precio, imagen
               from libros
               where cod_autor = ?;`;

    let codAutor = req.params.id;
    let codigoRespuesta = 0;
    let respuesta = null;

    let conexion = obtenerConexionBd();
    conexion.query(sql, codAutor, (error, resultado) => {
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

app.post('/libros', (req, res) => {
    let sql = 'insert into libros set ?;';

    let codigoRespuesta = 0;
    let respuesta = null;
    let libro = {
      COD: req.body.cod,
      ISBN: req.body.isbn,
      TITULO: req.body.titulo,
      PRECIO: req.body.precio,
      URL: req.body.url,
      COD_AUTOR: req.body.autor,
      ACTIVO: req.body.activo,
      IMAGEN: req.body.imagen
    };

    var decodedImg = decodeBase64Image(libro.IMAGEN);
    var imageBuffer = decodedImg.data;
    var type = decodedImg.type;
    var extension = mime.getExtension(type);
    var fileName =  libro.COD + "." + extension;

    try{
        fs.writeFileSync(__dirname + "/public/imagenes/" + fileName, imageBuffer, 'utf8');
        libro.IMAGEN = fileName;
    }
    catch (err) {
        res.status(500)
       .send({
                ok: false,
                mensaje: "Error guardando el fichero de imagen"
        });
    }

    let conexion = obtenerConexionBd();
    conexion.query(sql, libro, (error, resultado) => {
        if (error) {
            codigoRespuesta = 500;
            respuesta = {
                ok: false,
                mensaje: error.message
            };
        }
        else {
            if (resultado.affectedRows >= 1) {
                codigoRespuesta = 201;
                respuesta = {
                    ok: true,
                    mensaje: 'Libro creado correctamente'
                };
            }
        }

        conexion.end();

        res.status(codigoRespuesta)
           .send(respuesta);
    });
});

function decodeBase64Image(dataString) {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

app.listen(8080);