const mysql = require('mysql');
const config = require('./../config/config');

class Conexion {
    _conexionBd;

    constructor() {
        this._conexionBd = null;
    }

    obtenerConexionBd() {
        this._conexionBd = mysql.createConnection({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });

        this._conexionBd.connect(error => {
            if (error) {
                console.log("Error al conectar con la BD: " + error);
            }
        });
    }

    cerrarConexionBd() {
        this._conexionBd.end();
    }

    consulta(sql) {
        this.obtenerConexionBd();

        let promesa = new Promise((resolve, reject) => {
            this._conexionBd.query(sql, (error, resultado) => {
               if (error) {
                   return reject(error);
               }
               else {
                   this.cerrarConexionBd();
                   return resolve(resultado);
               }
            });
        });

        return promesa;
    }

    consultaParametrizada(sql, parametros) {
        this.obtenerConexionBd();

        let promesa = new Promise((resolve, reject) => {
            this._conexionBd.query(sql, parametros, (error, resultado) => {

                if (error) {
                    return reject(error);
                }
                else {
                    this.cerrarConexionBd();
                    return resolve(resultado);
                }
            });
        });

        return promesa;
    }
}

module.exports = Conexion;