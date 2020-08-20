const express = require('express');
const Conexion = require("../database/conexion");
const Imagen = require("../utilidades/imagen");

let router = express.Router();

router.get('/', (req, res) => {
    let sql = `select cod, NOMBRE
               from autor
               order by NOMBRE;`;

    let respuesta = null;

    let conexionBd = new Conexion();
    conexionBd.consulta(sql)
        .then(resultado => {
            respuesta = {
                ok: true,
                mensaje: 'Autores obtenidos correctamente',
                data: resultado
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

router.get('/totalLibros', (req, res) => {
    let sql = `select a.cod, a.nombre, count(l.cod) as numLibros
               from autor a
                    inner join libros l on a.COD = l.COD_AUTOR
               group by a.cod, a.NOMBRE
               order by a.NOMBRE;`;

    let respuesta = null;

    let conexionBd = new Conexion();
    conexionBd.consulta(sql)
        .then(resultado => {
            respuesta = {
                ok: true,
                mensaje: 'Autores con total de libros obtenidos correctamente',
                data: resultado
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

router.get('/:id/libros', (req, res) => {
    let sql = `select titulo, isbn, precio, imagen
               from libros
               where cod_autor = ?;`;

    let codAutor = req.params.id;
    let respuesta = null;

    let conexionBd = new Conexion();
    conexionBd.consultaParametrizada(sql, codAutor)
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

module.exports = router;