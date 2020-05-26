const routes = require('express').Router();
const str = require('../utils/strings');
module.exports = (app) => {
    //import models
    const CartaController = require('../controller/carta.controller')(app)
    const UsuarioController = require('../controller/usuario.controller')(app, str)
    const AdminGetController = require('../controller/admin.controller')(app)
    const BancosController = require('../controller/banco.controller')(app)
    const TipoUsuarioController = require('../controller/tipo.usuario.controller')(app)
    const EmpresaController = require('../controller/empresa.controller')(app)
    const MonedaController = require('../controller/moneda.controller')(app)
    const LiquidacionController = require('../controller/liquidacion.controller')(app)
    const CuentaController = require('../controller/cuenta.controller')(app)
    const DepositoController = require('../controller/desposito.controller')(app)
    const EmpresaMonedaController = require('../controller/empresa.moneda.controller')(app)
    const FacturaController = require('../controller/factura.controller')(app)
    const GastosController = require('../controller/gastos.controller')(app)
    const GastosTipoUsuarioController = require('../controller/gastos.tipo.usuario.controller')(app)
    const LiquidacionFacturaController = require('../controller/liquidacion.factura.controller')(app)
    const OrdenDepositoController = require('../controller/orden.deposito.controller')(app)
    const OrdenPresupuestoController = require('../controller/orden.presupuesto.controller')(app)
    const TipoDocumentosController = require('../controller/tipo.documento.controller')(app)
    const TipoCuentaController = require('../controller/tipo.cuenta.controller')(app)
    const UsuarosDatosController = require('../controller/usuario.datos.controller')(app)
    const PaisController = require('../controller/pais.controller')(app)
    const EnsayoController = require('../controller/catalogo.ensayo.controller')(app, str)
    const ActividadController = require('../controller/actividad.controller')(app, str)
    const CalendarioController = require('../controller/calendario.controller')(app, str)

    //routes cartas
    routes.post('/carta/create/', CartaController.create);
    routes.get('/carta/', CartaController.getAll);
    routes.delete('/carta/delete/', CartaController.delete);

    //routes usuario
    routes.post('/usuario/new', UsuarioController.create);
    routes.post('/usuario/pass', UsuarioController.updatePassword);
    routes.post('/usuario/login', UsuarioController.login);
    routes.post('/usuario/forget', UsuarioController.forgetPass);
    routes.put('/usuario/pass', UsuarioController.password);

    //routes usuario dato
    routes.get('/usuario/:id', UsuarosDatosController.getById);
    routes.put('/usuario/data/update', UsuarosDatosController.update);
    routes.get('/usuarios/data', UsuarosDatosController.getAll);

    //routes get all master tables
    routes.get('/usuarios/', AdminGetController.getUsuarios);
    routes.get('/empresa/', AdminGetController.getEmpresas);
    routes.get('/bancos/', AdminGetController.getBancos);
    routes.get('/monedas/', AdminGetController.getMoneda);
    routes.get('/tipo/usuario/', AdminGetController.getTipoUsuario);

    //routes from bancos
    routes.post('/bancos/', BancosController.create);
    routes.get('/bancos/:id_banco', BancosController.getById);
    routes.post('/bancos/:id_banco', BancosController.delete);
    routes.put('/bancos/', BancosController.update);

    //routes from tipo usuario
    routes.post('/tipo/usuario/', TipoUsuarioController.create);
    routes.delete('/tipo/usuario/delete', TipoUsuarioController.delete);

    //routes from empresas
    routes.post('/empresa/', EmpresaController.create);
    routes.post('/empresa/:id', EmpresaController.delete);
    routes.put('/empresa/', EmpresaController.update);
    routes.get('/empresa/moneda', EmpresaController.getEM);

    //routes from moneda
    routes.post('/moneda/', MonedaController.create);
    routes.post('/moneda/:id_moneda', MonedaController.delete);
    routes.put('/moneda/', MonedaController.update);
    routes.get('/moneda/iso/:simbolo', MonedaController.getByIso);
    routes.put('/moneda/impuesto/', MonedaController.updateImpuesto);
    routes.get('/moneda/iso/', MonedaController.getIso);

    //routes from liquidacion
    routes.get('/liquidaciones/', LiquidacionController.getAll);
    routes.post('/liquidaciones/usuario', LiquidacionController.getByUsuario);
    routes.post('/liquidacion/', LiquidacionController.create);

    //routes from cuenta
    routes.get('/cuentas/', CuentaController.getAll);
    routes.get('/cuentas/id', CuentaController.getById);
    routes.delete('/cuentas/id', CuentaController.delete);
    routes.put('/cuentas/id', CuentaController.update);
    routes.post('/cuentas', CuentaController.create);

    //routes from deposito
    routes.get('/depositos/', DepositoController.getAll);
    routes.get('/depositos/id', DepositoController.getById);
    routes.delete('/depositos/id', DepositoController.delete);
    routes.put('/depositos/id', DepositoController.update);
    routes.post('/depositos', DepositoController.create);

    //routes from deposito
    routes.get('/depositos/', DepositoController.getAll);
    routes.get('/depositos/id', DepositoController.getById);
    routes.delete('/depositos/id', DepositoController.delete);
    routes.put('/depositos/id', DepositoController.update);
    routes.post('/depositos', DepositoController.create);

    //routes from empresamonedas
    routes.get('/empresamonedas/', EmpresaMonedaController.getAll);
    routes.get('/empresamonedas/id', EmpresaMonedaController.getById);
    routes.delete('/empresamonedas/id', EmpresaMonedaController.delete);
    routes.put('/empresamonedas/id', EmpresaMonedaController.update);
    routes.post('/empresamonedas', EmpresaMonedaController.create);

    //routes from facturas
    routes.get('/facturas/', FacturaController.getAll);
    routes.get('/facturas/id', FacturaController.getById);
    routes.delete('/facturas/id', FacturaController.delete);
    routes.put('/facturas/id', FacturaController.update);
    routes.post('/facturas', FacturaController.create);
    routes.post('/facturas/usuario', FacturaController.getByIdUser);

    //routes from gastos
    routes.get('/gastos/', GastosController.getAll);
    routes.get('/gastos/id', GastosController.getById);
    routes.delete('/gastos/id', GastosController.delete);
    routes.put('/gastos/id', GastosController.update);
    routes.post('/gastos', GastosController.create);

    //routes from gastostipousuario
    routes.get('/gastostipousuario/', GastosTipoUsuarioController.getAll);
    routes.get('/gastostipousuario/:id', GastosTipoUsuarioController.getById);
    routes.delete('/gastostipousuario/id', GastosTipoUsuarioController.delete);
    routes.put('/gastostipousuario/id', GastosTipoUsuarioController.update);
    routes.post('/gastostipousuario', GastosTipoUsuarioController.create);

    //routes from liquidacionfactura
    routes.get('/liquidacionfactura/', LiquidacionFacturaController.getAll);
    routes.get('/liquidacionfactura/id', LiquidacionFacturaController.getById);
    routes.delete('/liquidacionfactura/id', LiquidacionFacturaController.delete);
    routes.put('/liquidacionfactura/id', LiquidacionFacturaController.update);
    routes.post('/liquidacionfactura', LiquidacionFacturaController.create);

    //routes from ordendeposito
    routes.get('/ordendeposito/', OrdenDepositoController.getAll);
    routes.get('/ordendeposito/id', OrdenDepositoController.getById);
    routes.delete('/ordendeposito/id', OrdenDepositoController.delete);
    routes.put('/ordendeposito/id', OrdenDepositoController.update);
    routes.post('/ordendeposito', OrdenDepositoController.create);

    //routes from ordenpresupuesto
    routes.get('/ordenpresupuesto/', OrdenPresupuestoController.getAll);
    routes.get('/ordenpresupuesto/id', OrdenPresupuestoController.getById);
    routes.delete('/ordenpresupuesto/id', OrdenPresupuestoController.delete);
    routes.put('/ordenpresupuesto/id', OrdenPresupuestoController.update);
    routes.post('/ordenpresupuesto', OrdenPresupuestoController.create);

    //routes from tipo documento
    routes.get('/tipo/documento/', TipoDocumentosController.getAll);
    routes.post('/tipo/documento/', TipoDocumentosController.create);
    routes.put('/tipo/documento/', TipoDocumentosController.update);
    routes.delete('/tipo/documento/:id_tipo_documento', TipoDocumentosController.delete);

    //routes from tipo cuentas
    routes.get('/tipo/cuentas', TipoCuentaController.getAll);
    routes.post('/tipo/cuentas', TipoCuentaController.create);
    routes.put('/tipo/cuentas', TipoCuentaController.update);
    routes.delete('/tipo/cuentas/:id_tipo_cuenta', TipoCuentaController.delete);

    //routes from pais
    routes.get('/pais', PaisController.getAll);
    routes.post('/pais', PaisController.create);
    routes.put('/pais', PaisController.update);
    routes.delete('/pais/:id_pais', PaisController.delete);

    //routes from ensayos
    routes.get('/essay', EnsayoController.getAll)
    routes.post('/essay', EnsayoController.create)
    routes.put('/essay', EnsayoController.update)
    routes.delete('/essay/:id', EnsayoController.delete)

    //routes from activity
    routes.get('/activity', ActividadController.getAll)
    routes.post('/activity', ActividadController.create)
    routes.put('/activity', ActividadController.update)
    routes.delete('/activity/:id', ActividadController.delete)

    //routes from calendario
    routes.get('/calendario', CalendarioController.getAll);
    routes.get('/calendario/:fk_id_usuario', CalendarioController.getById);
    routes.post('/calendario', CalendarioController.create);
    routes.delete('/calendario/:id', CalendarioController.delete);
    routes.post('/calendario/usuario/', CalendarioController.createUser);
    routes.put('/calendario/accept/', CalendarioController.accept);
    routes.put('/calendario/close/', CalendarioController.close);
    routes.put('/calendario/refuse/', CalendarioController.refuse);
    routes.get('/calendario/accept/:id', CalendarioController.getByIdToBeAccept);
    routes.post('/calendario/search', CalendarioController.search);

    return routes;
};