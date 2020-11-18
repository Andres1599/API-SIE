const routes = require('express').Router();
module.exports = (app, str) => {

    // letter controls
    const CartaController = require('../controller/carta.controller')(app);
    // user controls
    const UsuarioController = require('../controller/usuario.controller')(app, str);
    const UsuarosDatosController = require('../controller/usuario.datos.controller')(app);
    const GastosTipoUsuarioController = require('../controller/gastos.tipo.usuario.controller')(app);
    const AdminGetController = require('../controller/admin.controller')(app);
    const TipoUsuarioController = require('../controller/tipo.usuario.controller')(app);
    // bank controls
    const BancosController = require('../controller/banco.controller')(app);
    // company controls
    const EmpresaController = require('../controller/empresa.controller')(app);
    //coins controls
    const MonedaController = require('../controller/moneda.controller')(app);
    const EmpresaMonedaController = require('../controller/empresa.moneda.controller')(app);
    //account controls
    const CuentaController = require('../controller/cuenta.controller')(app);
    // deposit controls
    const DepositoController = require('../controller/desposito.controller')(app);
    // spending controls
    const GastosController = require('../controller/gastos.controller')(app);
    const TipoCuentaController = require('../controller/tipo.cuenta.controller')(app);
    // liquidation controls
    const LiquidacionFacturaController = require('../controller/liquidacion.factura.controller')(app);
    const FacturaController = require('../controller/factura.controller')(app, str);
    const LiquidationController = require('../controller/liquidacion.controller')(app, str);
    const TipoDocumentosController = require('../controller/tipo.documento.controller')(app);
    // order controls
    const OrdenController = require('../controller/orden.viaticos.controller')(app, str);
    const OrdenDepositoController = require('../controller/orden.deposito.controller')(app);
    const OrdenPresupuestoController = require('../controller/orden.presupuesto.controller')(app);
    // country controls
    const PaisController = require('../controller/pais.controller')(app, str);
    // calendar controls
    const EnsayoController = require('../controller/catalogo.ensayo.controller')(app, str);
    const ActividadController = require('../controller/actividad.controller')(app, str);
    const CalendarioController = require('../controller/calendario.controller')(app, str);

    // migrations controls
    const MigrationController = require('../controller/migration.controller')(app, str);

    // middleware
    const Middleware = require('../middleware/auth.middleware');

    //routes letter
    routes.post('/carta/create/', Middleware.verifyToken, CartaController.create);
    routes.get('/carta/', Middleware.verifyToken, CartaController.getAll);
    routes.delete('/carta/delete/', Middleware.verifyToken, CartaController.delete);

    //routes usuario
    routes.post('/usuario/new', Middleware.verifyToken, UsuarioController.create);
    routes.post('/usuario/pass', Middleware.verifyToken, UsuarioController.updatePassword);
    routes.post('/usuario/login', UsuarioController.findByEmail, UsuarioController.login);
    routes.post('/usuario/forget', Middleware.verifyToken, UsuarioController.forgetPass);
    routes.put('/usuario/pass', Middleware.verifyToken, UsuarioController.password);

    //routes usuario dato
    routes.get('/usuario/:id', UsuarosDatosController.getById);
    routes.put('/usuario/data/update', UsuarosDatosController.update);
    routes.get('/usuarios/data', UsuarosDatosController.getAll);

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

    //routes from liquidacion
    routes.get('/liquidaciones/', Middleware.verifyToken, LiquidationController.getAll);
    routes.get('/liquidacion/:id', Middleware.verifyToken, LiquidationController.getById);
    routes.get('/liquidaciones/usuario/:id', Middleware.verifyToken, LiquidationController.getByUsuarioNotClose);
    routes.post('/liquidacion/', Middleware.verifyToken, LiquidationController.create);
    routes.delete('/liquidacion/:id', Middleware.verifyToken, LiquidationController.delete);
    routes.delete('/liquidacion/item/:id', Middleware.verifyToken, LiquidationController.deleteItem);
    routes.delete('/liquidacion/item/full/:id', Middleware.verifyToken, LiquidationController.deleteItemFull);
    routes.put('/liquidacion/close/', Middleware.verifyToken, LiquidationController.close);
    routes.post('/liquidacion/correlativo/', Middleware.verifyToken, LiquidationController.updateId);
 
    //routes from cuenta
    routes.get('/cuentas/', Middleware.verifyToken, CuentaController.getAll);
    routes.get('/cuentas/id', Middleware.verifyToken, CuentaController.getById);
    routes.delete('/cuentas/id', Middleware.verifyToken, CuentaController.delete);
    routes.put('/cuentas/id', Middleware.verifyToken, CuentaController.update);
    routes.post('/cuentas', Middleware.verifyToken, CuentaController.create);

    //routes from deposito
    routes.get('/depositos/', Middleware.verifyToken, DepositoController.getAll);
    routes.get('/depositos/id', Middleware.verifyToken, DepositoController.getById);
    routes.delete('/depositos/id', Middleware.verifyToken, DepositoController.delete);
    routes.put('/depositos/id', Middleware.verifyToken, DepositoController.update);
    routes.post('/depositos', Middleware.verifyToken, DepositoController.create);

    //routes from deposito
    routes.get('/depositos/', Middleware.verifyToken, DepositoController.getAll);
    routes.get('/depositos/id', Middleware.verifyToken, DepositoController.getById);
    routes.delete('/depositos/id', Middleware.verifyToken, DepositoController.delete);
    routes.put('/depositos/id', Middleware.verifyToken, DepositoController.update);
    routes.post('/depositos', Middleware.verifyToken, DepositoController.create);

    //routes from empresamonedas
    routes.get('/empresamonedas/', Middleware.verifyToken, EmpresaMonedaController.getAll);
    routes.get('/empresamonedas/id', Middleware.verifyToken, EmpresaMonedaController.getById);
    routes.delete('/empresamonedas/id', Middleware.verifyToken, EmpresaMonedaController.delete);
    routes.put('/empresamonedas/id', Middleware.verifyToken, EmpresaMonedaController.update);
    routes.post('/empresamonedas', Middleware.verifyToken, EmpresaMonedaController.create);

    //routes from facturas
    routes.get('/facturas/', Middleware.verifyToken, FacturaController.getAll);
    routes.get('/facturas/id', Middleware.verifyToken, FacturaController.getById);
    routes.delete('/facturas/:id', FacturaController.delete);
    routes.put('/facturas/id', Middleware.verifyToken, FacturaController.update);
    routes.post('/facturas', Middleware.verifyToken, FacturaController.create);
    routes.post('/facturas/usuario', Middleware.verifyToken, FacturaController.getByIdUser);
    routes.post('/facturas/dates', Middleware.verifyToken, FacturaController.getByDate);

    //routes from gastos
    routes.get('/gastos/', Middleware.verifyToken, GastosController.getAll);
    routes.get('/gastos/id', Middleware.verifyToken, GastosController.getById);
    routes.delete('/gastos/id', Middleware.verifyToken, GastosController.delete);
    routes.put('/gastos/id', Middleware.verifyToken, GastosController.update);
    routes.post('/gastos', Middleware.verifyToken, GastosController.create);

    //routes from gastos tipo usuario
    routes.get('/gastostipousuario/', Middleware.verifyToken, GastosTipoUsuarioController.getAll);
    routes.get('/gastostipousuario/:id', Middleware.verifyToken, GastosTipoUsuarioController.getById);
    routes.delete('/gastostipousuario/id', Middleware.verifyToken, GastosTipoUsuarioController.delete);
    routes.put('/gastostipousuario/id', Middleware.verifyToken, GastosTipoUsuarioController.update);
    routes.post('/gastostipousuario', Middleware.verifyToken, GastosTipoUsuarioController.create);

    //routes from liquidacion factura
    routes.get('/liquidacionfactura/', Middleware.verifyToken, LiquidacionFacturaController.getAll);
    routes.get('/liquidacionfactura/id', Middleware.verifyToken, LiquidacionFacturaController.getById);
    routes.delete('/liquidacionfactura/id', Middleware.verifyToken, LiquidacionFacturaController.delete);
    routes.put('/liquidacionfactura/id', Middleware.verifyToken, LiquidacionFacturaController.update);
    routes.post('/liquidacionfactura', Middleware.verifyToken, LiquidacionFacturaController.create);

    //routes from per diem
    routes.get('/ordenes/', Middleware.verifyToken, OrdenController.getAll);
    routes.get('/ordenes/clientes/', Middleware.verifyToken, OrdenController.getAllClient);
    routes.post('/orden/', Middleware.verifyToken, OrdenController.max, OrdenController.createOrder, OrdenController.createOrderBudget, OrdenController.createOrderUsers, OrdenController.createOrderOrders, OrdenController.create);
    routes.get('/orden/:id', Middleware.verifyToken, OrdenController.getById);
    routes.delete('/orden/:id', Middleware.verifyToken, OrdenController.delete);

    //routes from orden deposito
    routes.get('/ordendeposito/', Middleware.verifyToken, OrdenDepositoController.getAll);
    routes.get('/ordendeposito/id', Middleware.verifyToken, OrdenDepositoController.getById);
    routes.delete('/ordendeposito/id', Middleware.verifyToken, OrdenDepositoController.delete);
    routes.put('/ordendeposito/id', Middleware.verifyToken, OrdenDepositoController.update);
    routes.post('/ordendeposito', Middleware.verifyToken, OrdenDepositoController.create);

    //routes from orden presupuesto
    routes.get('/ordenpresupuesto/', Middleware.verifyToken, OrdenPresupuestoController.getAll);
    routes.get('/ordenpresupuesto/id', Middleware.verifyToken, OrdenPresupuestoController.getById);
    routes.delete('/ordenpresupuesto/id', Middleware.verifyToken, OrdenPresupuestoController.delete);
    routes.put('/ordenpresupuesto/id', Middleware.verifyToken, OrdenPresupuestoController.update);
    routes.post('/ordenpresupuesto', Middleware.verifyToken, OrdenPresupuestoController.create);

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
    routes.get('/calendario/:fk_id_usuario', Middleware.verifyToken, CalendarioController.getById);
    routes.post('/calendario', Middleware.verifyToken, CalendarioController.create);
    routes.delete('/calendario/:id', Middleware.verifyToken, CalendarioController.delete);
    routes.post('/calendario/usuario/', Middleware.verifyToken, CalendarioController.createUser);
    routes.post('/calendario/usuario/once/', Middleware.verifyToken, CalendarioController.createUserOnce);
    routes.put('/calendario/accept/', Middleware.verifyToken, CalendarioController.accept);
    routes.put('/calendario/close/', Middleware.verifyToken, CalendarioController.close);
    routes.put('/calendario/refuse/', Middleware.verifyToken, CalendarioController.refuse);
    routes.get('/calendario/accept/:id', Middleware.verifyToken, CalendarioController.getByIdToBeAccept);
    routes.post('/calendario/search', Middleware.verifyToken, CalendarioController.search);
    routes.post('/calendario/search/user', CalendarioController.searchUser);
    routes.post('/calendario/search/full', CalendarioController.full);

    //routes from migration
    routes.get('/migration/bills', MigrationController.migrateBills);
    routes.get('/migration/liquidations', MigrationController.migrateLiquidation);
    routes.get('/migration/liquidations/update', MigrationController.migrateUpdateLiquidation);

    return routes;
};