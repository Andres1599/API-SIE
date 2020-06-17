const config = require('./config/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const db = require('./models/db');
const str = require('./utils/strings');

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
app.set('usuario_datos', db.UsuarioDatos);
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
app.set('gasto_usuario', db.GastoUsuario);
app.set('factura', db.Factura);
app.set('planilla', db.Planilla);
app.set('planilla_recibo', db.PlanillaRecibo);
app.set('liquidacion', db.Liquidacion);
app.set('liquidacion_factura', db.LiquidacionFactura);
app.set('cuenta', db.Cuenta);
app.set('subcuenta', db.Subcuenta);
app.set('deposito', db.Deposito);
app.set('orden_viaticos', db.OrdenViaticos);
app.set('orden_usuario', db.OrdenUsuario);
app.set('orden_liquidacion', db.OrdenLiquidacion);
app.set('orden_deposito', db.OrdenDeposito);
app.set('orden_presupuesto', db.OrdenPresupuesto);
app.set('orden_orden', db.OrdenOrdenes);
app.set('empresa_moneda', db.EmpresaMoneda);
app.set('catalogo_ensayo', db.CatalogoEnsayo);
app.set('catalogo_actividad', db.Actividad);
app.set('calendario', db.Calendario);
app.set('calendario_usuario', db.CalendarioUsuario);
app.set('op', db.sequelize);

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
app.use('/api/sie', require('./routes')(app, str.STR));
app.use(cors());

app.listen(port, () => {
    console.log("Servidor iniciado en el puerto: " + port);
    console.log("Debug del server: ");
});

module.exports = app;