export class PeticionAjax {

    static peticionGet(url) {
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
                .catch(() => reject('Ha habido un error al obtener los libros'));
        });

        return peticion;
    }
}