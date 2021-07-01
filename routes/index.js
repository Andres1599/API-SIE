const routes = require('express').Router();
module.exports = (app, str) => {

    // letter controls
    const CartaController = require('../controller/carta.controller')(app);
    // user controls
    const UsuarioController = require('../controller/usuario.controller')(app, str);
    const UsuarosDatosController = require('../controller/usuario.datos.controller')(app, str);
    const GastosTipoUsuarioController = require('../controller/gastos.tipo.usuario.controller')(app, str);
    const AdminGetController = require('../controller/admin.controller')(app, str);
    const TipoUsuarioController = require('../controller/tipo.usuario.controller')(app);
    // bank controls
    const BancosController = require('../controller/banco.controller')(app);
    // company controls
    const EmpresaController = require('../controller/empresa.controller')(app);
    // coins controls
    const MonedaController = require('../controller/moneda.controller')(app);
    const EmpresaMonedaController = require('../controller/empresa.moneda.controller')(app);
    // account controls
    const CuentaController = require('../controller/cuenta.controller')(app, str);
    const SubCuentaController = require('../controller/subcuenta.contoller')(app, str);
    // deposit controls
    const DepositoController = require('../controller/desposito.controller')(app, str);
    // spending controls
    const GastosController = require('../controller/gastos.controller')(app, str);
    const SubGastosController = require('../controller/subgasto.controller')(app, str);
    const TipoCuentaController = require('../controller/tipo.cuenta.controller')(app);
    // liquidation controls
    const LiquidacionFacturaController = require('../controller/liquidacion.factura.controller')(app, str);
    const FacturaController = require('../controller/factura.controller')(app, str);
    const LiquidationController = require('../controller/liquidacion.controller')(app, str);
    const TipoDocumentosController = require('../controller/tipo.documento.controller')(app);
    // order controls
    const OrdenController = require('../controller/orden.viaticos.controller')(app, str);
    const OrdenDepositoController = require('../controller/orden.deposito.controller')(app, str);
    const OrdenPresupuestoController = require('../controller/orden.presupuesto.controller')(app, str);
    const OrdenUsersController = require('../controller/orden.usuario.controller')(app, str);
    const OrdenOrderController = require('../controller/orden.ordenes.controller')(app, str);
    const OrdenLiquidationController = require('../controller/orden.liquidacion.controller')(app, str);

    // country controls
    const PaisController = require('../controller/pais.controller')(app, str);
    // calendar controls
    const EnsayoController = require('../controller/catalogo.ensayo.controller')(app, str);
    const ActividadController = require('../controller/actividad.controller')(app, str);
    const CalendarioController = require('../controller/calendario.controller')(app, str);
    const CalendarioUsuarioController = require('../controller/calendario.usuario.controller')(app, str);
    const CalendarioEnsayoController = require('../controller/calendario.ensayo.controller')(app, str);

    // catalogo asuetos
    const CatalogoAsuetosController = require('../controller/catalogo.asuetos.controller')(app, str);

    // migrations controls
    const MigrationController = require('../controller/migration.controller')(app, str);

    // middleware
    const Middleware = require('../middleware/auth.middleware');

    // Vacaciones
    const PeriodoVacacionesController = require('../controller/periodos.vacaciones.controller')(app, str);
    const DiasVacacionesController = require('../controller/dias.vacaciones.controller')(app, str);

    // Movimientos de cuenta
    const MovimientoSubCuentaController = require('../controller/movimiento.controller')(app, str);

    //routes letter
    routes.post('/carta/create/', Middleware.verifyToken, CartaController.create);
    routes.get('/carta/', Middleware.verifyToken, CartaController.getAll);
    routes.delete('/carta/delete/', Middleware.verifyToken, CartaController.delete);

    //routes usuario
    routes.post('/usuario/new', Middleware.verifyToken, UsuarioController.create);
    routes.post('/usuario/login', UsuarioController.findByEmail, UsuarioController.login);
    routes.put('/usuario/pass', Middleware.verifyToken, UsuarioController.update);

    //routes usuario dato
    routes.get('/usuario/:id', Middleware.verifyToken, UsuarosDatosController.getById);
    routes.put('/usuario/data/', Middleware.verifyToken, UsuarosDatosController.update);
    routes.get('/usuarios/data/', Middleware.verifyToken, UsuarosDatosController.getAll);
    routes.get('/usuarios/data/report', Middleware.verifyToken, UsuarosDatosController.getReport);

    //routes get all master tables
    routes.get('/usuarios/', Middleware.verifyToken, AdminGetController.getUsuarios);
    routes.get('/empresa/', Middleware.verifyToken, AdminGetController.getEmpresas);
    routes.get('/bancos/', Middleware.verifyToken, AdminGetController.getBancos);
    routes.get('/monedas/', Middleware.verifyToken, AdminGetController.getMoneda);
    routes.get('/tipo/usuario/', Middleware.verifyToken, AdminGetController.getTipoUsuario);

    //routes from bancos
    routes.post('/bancos/', Middleware.verifyToken, BancosController.create);
    routes.get('/bancos/:id_banco', Middleware.verifyToken, BancosController.getById);
    routes.post('/bancos/:id_banco', Middleware.verifyToken, BancosController.delete);
    routes.put('/bancos/', Middleware.verifyToken, BancosController.update);

    //routes from tipo usuario
    routes.post('/tipo/usuario/', Middleware.verifyToken, TipoUsuarioController.create);
    routes.delete('/tipo/usuario/delete', Middleware.verifyToken, TipoUsuarioController.delete);

    //routes from empresas
    routes.post('/empresa/', Middleware.verifyToken, EmpresaController.create);
    routes.post('/empresa/:id', Middleware.verifyToken, EmpresaController.delete);
    routes.put('/empresa/', Middleware.verifyToken, EmpresaController.update);
    routes.get('/empresa/moneda', Middleware.verifyToken, EmpresaController.getEM);

    //routes from coin
    routes.post('/moneda/', Middleware.verifyToken, MonedaController.create);
    routes.post('/moneda/:id_moneda', Middleware.verifyToken, MonedaController.delete);
    routes.put('/moneda/', Middleware.verifyToken, MonedaController.update);
    routes.get('/moneda/iso/:simbolo', Middleware.verifyToken, MonedaController.getByIso);
    routes.put('/moneda/impuesto/', Middleware.verifyToken, MonedaController.updateImpuesto);
    routes.get('/moneda/iso/', Middleware.verifyToken, MonedaController.getIso);

    // routes from liquidacion
    routes.get('/liquidaciones/', Middleware.verifyToken, LiquidationController.getAll);
    routes.get('/liquidacion/:id', Middleware.verifyToken, LiquidationController.getById);
    routes.get('/liquidaciones/usuario/not/close/:id', Middleware.verifyToken, LiquidationController.getByUsuarioNotClose);
    routes.get('/liquidaciones/usuario/:id', Middleware.verifyToken, LiquidationController.getByUsuario);
    routes.post('/liquidacion/', Middleware.verifyToken, LiquidationController.create);
    routes.delete('/liquidacion/:id', Middleware.verifyToken, LiquidationController.delete);
    routes.delete('/liquidacion/item/:id', Middleware.verifyToken, LiquidationController.deleteItem);
    routes.delete('/liquidacion/item/full/:id', Middleware.verifyToken, LiquidationController.deleteItemFull);
    routes.put('/liquidacion/close/', Middleware.verifyToken, LiquidationController.close, MovimientoSubCuentaController.createCargo);
    routes.put('/liquidacion/unclose/', Middleware.verifyToken, LiquidationController.unclose);
    routes.put('/liquidacion/date/', Middleware.verifyToken, LiquidationController.updateFecha);
    routes.post('/liquidacion/correlativo/', Middleware.verifyToken, LiquidationController.updateId);

    // routes from cuenta
    routes.get('/cuentas/', Middleware.verifyToken, CuentaController.getAll)
    routes.get('/cuentas/:id', Middleware.verifyToken, CuentaController.getById)
    routes.delete('/cuentas/id', Middleware.verifyToken, CuentaController.delete)
    routes.post('/cuentas', Middleware.verifyToken, CuentaController.create)

    // routes from subcuentas
    routes.get('/sub/cuenta/:id', Middleware.verifyToken, SubCuentaController.getById);
    routes.get('/sub/cuenta/pk/:id', Middleware.verifyToken, SubCuentaController.getByPk);
    routes.post('/sub/cuenta/', Middleware.verifyToken, SubCuentaController.create);
    routes.put('/sub/cuenta/', Middleware.verifyToken, SubCuentaController.update);
    routes.post('/sub/cuenta/orden', Middleware.verifyToken, SubCuentaController.getByOrder);

    //routes from deposito
    routes.post('/deposito/', Middleware.verifyToken, DepositoController.create, MovimientoSubCuentaController.createAbono);
    // routes.delete('/deposito/:id', Middleware.verifyToken, DepositoController.delete);

    //routes from empresamonedas
    routes.get('/empresamonedas/', Middleware.verifyToken, EmpresaMonedaController.getAll);
    routes.get('/empresamonedas/id', Middleware.verifyToken, EmpresaMonedaController.getById);
    routes.delete('/empresamonedas/id', Middleware.verifyToken, EmpresaMonedaController.delete);
    routes.put('/empresamonedas/id', Middleware.verifyToken, EmpresaMonedaController.update);
    routes.post('/empresamonedas', Middleware.verifyToken, EmpresaMonedaController.create);

    //routes from facturas
    routes.delete('/facturas/:id', FacturaController.delete);
    routes.put('/facturas/id', Middleware.verifyToken, FacturaController.update);
    routes.post('/facturas', Middleware.verifyToken, FacturaController.create);
    routes.post('/facturas/bunch', Middleware.verifyToken, FacturaController.bulkCreate);
    routes.post('/facturas/usuario', Middleware.verifyToken, FacturaController.getByIdUser);
    routes.post('/facturas/dates', Middleware.verifyToken, FacturaController.getByDate);

    //routes from gastos
    routes.get('/gastos/', Middleware.verifyToken, GastosController.getAll);
    routes.get('/gastos/:id', Middleware.verifyToken, GastosController.getById);
    routes.put('/gastos/', Middleware.verifyToken, GastosController.update);
    routes.post('/gastos/', Middleware.verifyToken, GastosController.create);

    //routes from subgastos
    routes.get('/subgastos/:id', Middleware.verifyToken, SubGastosController.getById);
    routes.post('/subgastos/', Middleware.verifyToken, SubGastosController.create);
    routes.put('/subgastos/', Middleware.verifyToken, SubGastosController.update);
    routes.delete('/subgastos/:id', Middleware.verifyToken, SubGastosController.delete);

    //routes from gastos tipo usuario
    routes.get('/gastos/tipo/usuario/:id', Middleware.verifyToken, GastosTipoUsuarioController.getById);
    routes.get('/gastos/tipo/usuario/gasto/:id', Middleware.verifyToken, GastosTipoUsuarioController.getByGasto);
    routes.delete('/gastos/tipo/usuario/:id', Middleware.verifyToken, GastosTipoUsuarioController.delete);
    routes.post('/gastos/tipo/usuario/', Middleware.verifyToken, GastosTipoUsuarioController.create);

    //routes from liquidacion factura
    routes.post('/liquidacion/factura', Middleware.verifyToken, LiquidacionFacturaController.create);

    //routes from per diem
    routes.get('/ordenes/', Middleware.verifyToken, OrdenController.getAll);
    routes.get('/ordenes/clientes/', Middleware.verifyToken, OrdenController.getAllClient);
    routes.post('/orden/', Middleware.verifyToken, OrdenController.create);
    routes.get('/orden/:id', Middleware.verifyToken, OrdenController.getById);
    routes.put('/orden/', Middleware.verifyToken, OrdenController.update);
    routes.delete('/orden/:id', Middleware.verifyToken, OrdenController.delete);

    //routes from orden deposito
    routes.post('/orden/deposito', Middleware.verifyToken, OrdenDepositoController.create, MovimientoSubCuentaController.createAbono);
    routes.delete('/orden/deposito/:id/:id_deposito', Middleware.verifyToken, OrdenDepositoController.delete);

    //routes from orden liquidation
    routes.post('/orden/liquidation', Middleware.verifyToken, OrdenLiquidationController.create);
    routes.delete('/orden/liquidation/:id', Middleware.verifyToken, OrdenLiquidationController.delete);
    routes.post('/orden/liquidation/search', Middleware.verifyToken, OrdenLiquidationController.getByUserOrder);

    //routes from orden usuario
    routes.post('/orden/usuario/', Middleware.verifyToken, OrdenUsersController.create);
    routes.delete('/orden/usuario/:id', Middleware.verifyToken, OrdenUsersController.delete);

    //routes from orden usuario
    routes.post('/orden/orden/', Middleware.verifyToken, OrdenOrderController.create);
    routes.delete('/orden/orden/:id', Middleware.verifyToken, OrdenOrderController.delete);

    //routes from orden presupuesto
    routes.delete('/orden/presupuesto/:id', Middleware.verifyToken, OrdenPresupuestoController.delete);
    routes.post('/orden/presupuesto', Middleware.verifyToken, OrdenPresupuestoController.create);

    //routes from tipo documento
    routes.get('/tipo/documento/', Middleware.verifyToken, TipoDocumentosController.getAll);
    routes.post('/tipo/documento/', Middleware.verifyToken, TipoDocumentosController.create);
    routes.put('/tipo/documento/', Middleware.verifyToken, TipoDocumentosController.update);
    routes.delete('/tipo/documento/:id_tipo_documento', Middleware.verifyToken, TipoDocumentosController.delete);

    //routes from tipo cuentas
    routes.get('/tipo/cuentas', Middleware.verifyToken, TipoCuentaController.getAll);
    routes.post('/tipo/cuentas', Middleware.verifyToken, TipoCuentaController.create);
    routes.put('/tipo/cuentas', Middleware.verifyToken, TipoCuentaController.update);
    routes.delete('/tipo/cuentas/:id_tipo_cuenta', Middleware.verifyToken, TipoCuentaController.delete);

    //routes from pais
    routes.get('/pais', Middleware.verifyToken, PaisController.getAll);
    routes.post('/pais', Middleware.verifyToken, PaisController.create);
    routes.put('/pais', Middleware.verifyToken, PaisController.update);
    routes.delete('/pais/:id_pais', Middleware.verifyToken, PaisController.delete);

    //routes from ensayos
    routes.get('/essay', Middleware.verifyToken, EnsayoController.getAll);
    routes.post('/essay', Middleware.verifyToken, EnsayoController.create);
    routes.put('/essay', Middleware.verifyToken, EnsayoController.update);
    routes.delete('/essay/:id', Middleware.verifyToken, EnsayoController.delete);

    //routes from activity
    routes.get('/activity', Middleware.verifyToken, ActividadController.getAll);
    routes.post('/activity', Middleware.verifyToken, ActividadController.create);
    routes.put('/activity', Middleware.verifyToken, ActividadController.update);
    routes.delete('/activity/:id', Middleware.verifyToken, ActividadController.delete);

    //routes from calendario
    routes.get('/calendario', Middleware.verifyToken, CalendarioController.getAll);
    routes.get('/calendario/event/:id', Middleware.verifyToken, CalendarioController.getById);
    routes.get('/calendario/:fk_id_usuario', Middleware.verifyToken, CalendarioController.getUserEventsById);
    routes.post('/calendario/', Middleware.verifyToken, CalendarioController.create);
    routes.put('/calendario/', Middleware.verifyToken, CalendarioController.update);
    routes.delete('/calendario/:id', Middleware.verifyToken, CalendarioController.delete);
    routes.put('/calendario/close/', Middleware.verifyToken, CalendarioController.close);
    routes.get('/calendario/accept/:id', Middleware.verifyToken, CalendarioController.getByIdToBeAccept);
    routes.post('/calendario/search', Middleware.verifyToken, CalendarioController.search);
    routes.post('/calendario/search/user', CalendarioController.searchUser);
    routes.post('/calendario/search/full', CalendarioController.full);

    // routes from calendario usuarios
    routes.post('/calendario/usuario/', Middleware.verifyToken, CalendarioUsuarioController.create);
    routes.delete('/calendario/usuario/:id', Middleware.verifyToken, CalendarioUsuarioController.delete);

    // router from calendario ensayos
    routes.post('/calendario/ensayo/', Middleware.verifyToken, CalendarioEnsayoController.create);
    routes.delete('/calendario/ensayo/:id', Middleware.verifyToken, CalendarioEnsayoController.delete);

    // router from catalogo de asuetos
    routes.get('/asuetos', Middleware.verifyToken, CatalogoAsuetosController.getAll);
    routes.post('/asuetos', Middleware.verifyToken, CatalogoAsuetosController.create);
    routes.put('/asuetos', Middleware.verifyToken, CatalogoAsuetosController.update);
    routes.delete('/asuetos/:id', Middleware.verifyToken, CatalogoAsuetosController.delete);

    // routes from migration
    routes.get('/migration/liquidation/consult/:id', MigrationController.searchLiquidation);
    routes.get('/migration/liquidation/consult/:id/:code', MigrationController.getLiquidation);

    // routes from periodo de vacaciones
    routes.post('/periodo/vacaciones/', Middleware.verifyToken, PeriodoVacacionesController.create);
    routes.get('/periodo/vacaciones/:id', Middleware.verifyToken, PeriodoVacacionesController.getByUser);
    routes.get('/periodo/vacaciones/carta/:id', Middleware.verifyToken, PeriodoVacacionesController.getById);
    routes.delete('/periodo/vacaciones/:id', Middleware.verifyToken, PeriodoVacacionesController.delete);
    routes.put('/periodo/vacaciones/', Middleware.verifyToken, PeriodoVacacionesController.update);
    routes.put('/periodo/vacaciones/close', Middleware.verifyToken, PeriodoVacacionesController.close);

    // routes from dias de vacaciones
    routes.post('/dias/vacaciones/', Middleware.verifyToken, DiasVacacionesController.create);
    routes.delete('/dias/vacaciones/:periodo/:dias/:total', Middleware.verifyToken, DiasVacacionesController.delete);

    // routes from movimientos de cuenta
    routes.get('/movimiento/cuenta/:id', MovimientoSubCuentaController.getByAccount);
    routes.post('/movimiento/cuenta/:cuenta/:id', Middleware.verifyToken, MovimientoSubCuentaController.create);

    return routes;
};