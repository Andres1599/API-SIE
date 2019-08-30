const config = require('./config/config');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const db = require('./models/db');
require('dotenv').config();

//Set express 
const app = express();

let port;
if (config.develop.port) {
    port = config.develop.port;
} else {
    port = config.production.port;
}

//Sync the database
db.Sequelize.sync({
    force: false
}).then((sync) => {
    console.log('Base de datos sincronizada');
}).catch((err) => {
    console.log('Error al sincronizar la base de datos', err);
});

app.set('tipo_usuario', db.TipoUsuario);
app.set('usuario', db.Usuario);
app.set('sequelize', db.Sequelize);
app.set('carta', db.Carta);
app.set('moneda', db.Moneda);
app.set('empresa', db.Empresa);
app.set('pais', db.Pais);
app.set('tipo_documento', db.TipoDocumento);
app.set('tipo_cuenta', db.TipoCuenta);
app.set('banco', db.Banco);
app.set('gasto', db.CatalogoGastos);
app.set('subgasto', db.CatalogoSubgasto);
app.set('factura', db.Factura);

app.use(bodyParser.urlencoded({
    extended: true
}));
//Set config server
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});
app.use('/api/sie', require('./routes')(app));
app.use(cors());

app.listen(port, () => {
    console.log("Servidor iniciado en el puerto: " + port);
    console.log("Debug del server: ");
});

module.exports = app;