export class PeticionAjax {

    static get(url) {
        let peticion = new Promise((resolve, reject) => {
            fetch(url)
                .then(resultado => resultado.json())
                .then(resultado => {
                    if (resultado.ok) {
                        return resolve(resultado.data);
                    }
                    else {
                        return reject('La respuesta no es correcta');
                    }
                })
                .catch((error) => reject('Ha habido un error en la petición GET: ' + error));
        });

        return peticion;
    }

    static delete(url) {
        let peticion = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE'
            })
                .then(resultado => resultado.json())
                .then(resultado => {

                    if (resultado.ok) {
                        return resolve();
                    }
                    else {
                        return reject('La respuesta no es correcta');
                    }
                })
                .catch(error => reject('Ha habido un error en la petición DELETE: ' + error));
        });

        return peticion;
    }

    static post(url, datos) {
        let peticion = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => resultado.json())
                .then(resultado => {

                    if (resultado.ok) {
                        return resolve();
                    }
                    else {
                        return reject('La respuesta no es correcta');
                    }
                })
                .catch(error => reject('Ha habido un error en la petición POST: ' + error));
        });

        return peticion;
    }

    static put(url, datos) {
        let peticion = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => resultado.json())
                .then(resultado => {

                    if (resultado.ok) {
                        return resolve();

                        // limpiarFormulario('actualizarLibro');
                        // $('#actualizarLibro').modal('hide');
                        // toastr.success('Se ha actualizado el libro correctamente', 'Libro actualizado');
                        //
                        // getLibros();
                    }
                    else {
                        return reject('La respuesta no es correcta');
                    }
                })
                .catch(error => reject('Ha habido un error en la petición PUT: ' + error));
        });

        return peticion;
    }
}