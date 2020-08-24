const express = require('express');
const Conexion = require('./../database/conexion');
const Imagen = require("../utilidades/imagen");

let router = express.Router();

router.get('/', (req, res) => {
    let sql = `select l.cod, l.titulo, l.precio, l.imagen, l.activo, a.nombre as autor 
               from libros l 
                    left join autor a on a.cod = l.cod_autor `;

    let ordenadoPor = req.query.ordenadoPor;

    if (ordenadoPor != undefined) {
        switch (ordenadoPor) {
            case 'titulo':
                sql = sql + 'order by l.titulo;';
    
                break;
        
            case 'autor':
                sql = sql + 'order by autor;';
    
                break;
    
            case 'precio':
                sql = sql + 'order by l.precio;';
                
                break;
        }  
    }  

    let respuesta = null;
    let conexionBd = new Conexion();

    conexionBd.consulta(sql)
        .then(resultado => {
            let libros = resultado;

            for (let i = 0; i < libros.length;  i++) {
                let libro = libros[i];
                let urlImagen = 'public/imagenes/' + libro.imagen;

                if (!Imagen.existeImagen(urlImagen)) {
                    libro.imagen = 'noDisponible.png';
                }
            }

            respuesta = {
                ok: true,
                mensaje: 'Libros obtenidos correctamente',
                data: libros
            };

            res.status(200)
               .send(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: error.message
            };

            res.status(500)
               .send(respuesta);
        });
});

router.get('/activos', (req, res) => {
    let sql = `select l.cod, l.titulo, l.precio, l.imagen, a.nombre as autor 
               from libros l 
                    left join autor a on a.cod = l.cod_autor 
               where l.activo = true      
               order by l.titulo;`;     

    let respuesta = null;
    let conexionBd = new Conexion();

    conexionBd.consulta(sql)
        .then(resultado => {
            let libros = resultado;

            for (let i = 0; i < libros.length;  i++) {
                let libro = libros[i];
                let urlImagen = 'public/imagenes/' + libro.imagen;

                if (!Imagen.existeImagen(urlImagen)) {
                    libro.imagen = 'noDisponible.png';
                }
            }

            respuesta = {
                ok: true,
                mensaje: 'Libros obtenidos correctamente',
                data: libros
            };

            res.status(200)
               .send(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: error.message
            };

            res.status(500)
               .send(respuesta);
        });
});

router.get('/noActivos', (req, res) => {
    let sql = `select l.cod, l.titulo, l.precio, l.imagen, a.nombre as autor 
               from libros l 
                    left join autor a on a.cod = l.cod_autor 
               where l.activo = false      
               order by l.titulo;`;     

    let respuesta = null;
    let conexionBd = new Conexion();

    conexionBd.consulta(sql)
        .then(resultado => {
            let libros = resultado;

            for (let i = 0; i < libros.length;  i++) {
                let libro = libros[i];
                let urlImagen = 'public/imagenes/' + libro.imagen;

                if (!Imagen.existeImagen(urlImagen)) {
                    libro.imagen = 'noDisponible.png';
                }
            }

            respuesta = {
                ok: true,
                mensaje: 'Libros obtenidos correctamente',
                data: libros
            };

            res.status(200)
               .send(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: error.message
            };

            res.status(500)
               .send(respuesta);
        });
});

router.get('/:id', (req, res) => {
    let idLibro = req.params.id;
    let sql = `select l.cod, l.titulo, l.isbn, l.precio, l.imagen, l.url, l.activo, a.nombre as autor 
               from libros l 
                    left join autor a on a.cod = l.cod_autor 
               where l.cod = ?;`;

    let respuesta = null;
    let codigoRespuesta = 0;

    let conexionBd = new Conexion();
    conexionBd.consultaParametrizada(sql, idLibro)
        .then(libro => {

            if (libro.length == 0) {
                codigoRespuesta = 404;
                respuesta = {
                    ok: false,
                    mensaje: 'No existe el libro con id ' + idLibro
                };
            }
            else {
                codigoRespuesta = 200;
                respuesta = {
                    ok: true,
                    mensaje: 'Libro obtenido correctamente',
                    data: libro
                };
            }

            res.status(codigoRespuesta)
               .send(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: error
            };

            res.status(500)
               .send(respuesta);
        });
});

router.delete('/:id', (req, res) => {
    let codigoRespuesta = 0;
    let respuesta = null;
    let idLibro = req.params.id;
    let sql = `delete from libros
               where cod = ?;`;

    let conexionBd = new Conexion();
    conexionBd.consultaParametrizada(sql, idLibro)
        .then(resultado => {

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

            res.status(codigoRespuesta)
               .json(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: 'Error eliminando libro con id ' + idLibro + ' - ' + error.message
            };

            res.status(500)
               .json(respuesta);
        });
});

router.post('/', (req, res) => {
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

    if (libro.IMAGEN.length >= 1) {
        let imagen = new Imagen();
        let estaGuardada = imagen.guardarImagenLibro(libro);

        if (!estaGuardada) {
            res.status(500)
                .send({
                    ok: false,
                    mensaje: "Error guardando el fichero de imagen"
                });
        }
    }

    let conexionBd = new Conexion();
    conexionBd.consultaParametrizada(sql, libro)
        .then(resultado => {
            if (resultado.affectedRows == 0) {
                codigoRespuesta = 200;
                respuesta = {
                    ok: false,
                    mensaje: 'No se ha creado ningún libro'
                };
            }
            else {
                codigoRespuesta = 201;
                respuesta = {
                    ok: true,
                    mensaje: 'Libro creado correctamente'
                };
            }

            res.status(codigoRespuesta)
               .send(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: error.message
            };

            res.status(500)
               .send(respuesta);
        });
});

router.put('/:id', (req, res) => {
    let sql = `update libros set isbn = ?, titulo = ?, precio = ?, imagen = ?, url = ?, activo = ? 
               where cod = ?;`;

    let codigoRespuesta = 0;
    let respuesta = null;
    let libro = {
        COD: req.params.id,
        ISBN: req.body.isbn,
        TITULO: req.body.titulo,
        PRECIO: req.body.precio,
        URL: req.body.url,
        COD_AUTOR: req.body.autor,
        ACTIVO: req.body.activo,
        IMAGEN: req.body.imagen
    };

    if (libro.IMAGEN.length >= 1) {
        let imagen = new Imagen();
        let estaGuardada = imagen.guardarImagenLibro(libro);

        if (!estaGuardada) {
            res.status(500)
                .send({
                    ok: false,
                    mensaje: "Error guardando el fichero de imagen"
                });
        }
    }

    let parametros = [libro.ISBN, libro.TITULO, libro.PRECIO, libro.IMAGEN, libro.URL, libro.ACTIVO, libro.COD];

    let conexionBd = new Conexion();
    conexionBd.consultaParametrizada(sql, parametros)
        .then(resultado => {
            codigoRespuesta = 200;

            if (resultado.changedRows == 0) {
                respuesta = {
                    ok: false,
                    mensaje: 'No se ha actualizado ningún libro'
                };
            }
            else {
                respuesta = {
                    ok: true,
                    mensaje: 'Libro actualizado correctamente'
                };
            }

            res.status(codigoRespuesta)
               .send(respuesta);
        })
        .catch(error => {
            respuesta = {
                ok: false,
                mensaje: error.message
            };

            res.status(500)
               .send(respuesta);
        });
});

module.exports = router;
