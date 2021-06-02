const helmet = require('helmet')
const config = require('./config/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const db = require('./models/db');
const str = require('./utils/strings');
const compression = require('compression');

//Set express 
var app = express();

let port;
if (config.develop.port) {
    port = config.develop.port;
} else {
    port = config.production.port;
}
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
app.set('calendario_ensayo', db.CalendarioEnsayo);
app.set('op', db.sequelize);
app.set('catalogo_asuetos', db.CatalogoAsuetos);
app.set('periodos_vacaciones', db.PeriodoVacaciones);
app.set('dias_vacaciones', db.DiasVacaciones);
app.set('movimiento_subcuenta', db.MovimientoSubCuenta);
app.set('movimiento_liquidacion', db.MovimientoLiquidacion);
app.set('movimiento_deposito', db.MovimientoDeposito);


//Set config server
app
    .use(express.urlencoded({ extended: true }))
    .use(compression())
    .use(express.json())
    .use(morgan('dev'))
    .use(helmet())
    .use(cors())
    .use('/api/sie', require('./routes')(app, str.STR))
    .listen(port, () => {
        console.log("Servidor iniciado en el puerto: " + port);
        console.log("Debug del server: ");
    });

module.exports = app