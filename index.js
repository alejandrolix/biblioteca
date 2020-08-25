const express = require('express');
const bodyParser = require('body-parser');
const libros = require('./routes/libros');
const autores = require('./routes/autores');
const cors = require('cors');

let app = express();
app.use(bodyParser.json({
    limit: '50mb'
}));

// app.use('/', express.static(__dirname + '/public'));     // Para crear un servidor web de páginas estáticas.
app.use(cors());
app.use('/libros', libros);
app.use('/autores', autores);

// Permitir CORS.
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.listen(8080);
