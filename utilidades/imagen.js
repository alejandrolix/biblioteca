const mime = require('mime');
const fs = require('fs');

class Imagen {
    decodeBase64Image(dataString) {
        let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }

    guardarImagenLibro(libro) {
        var decodedImg = this.decodeBase64Image(libro.IMAGEN);
        var imageBuffer = decodedImg.data;
        var type = decodedImg.type;
        var extension = mime.getExtension(type);
        var fileName =  libro.COD + "." + extension;

        try {
            fs.writeFileSync(__dirname + "./../public/imagenes/" + fileName, imageBuffer, 'utf8');
            libro.IMAGEN = fileName;

            return true;
        }
        catch (error) {
            return false;
        }
    }

    static existeImagen(urlImagen) {
        if (fs.existsSync(urlImagen)) {
            return true;
        }
        else {
            return false;
        }
    }

    static convertirABase64(urlImagen) {
        let bitmap = fs.readFileSync(urlImagen);
        let buffer = new Buffer(bitmap).toString('base64');

        return buffer;
    }

    static cargar(urlImagen, libro) {
        let imgBase64 = null;
        let formatoImagen = null;

        if (!Imagen.existeImagen(urlImagen)) {
            imgBase64 = Imagen.convertirABase64('public/imagenes/noDisponible.png');
            formatoImagen = 'png';
        }
        else {
            imgBase64 = Imagen.convertirABase64(urlImagen);
            formatoImagen = urlImagen.split('.')[1];
        }

        libro.imagen = {
            imagen: imgBase64,
            formato: formatoImagen
        }
    }
}

module.exports = Imagen;
