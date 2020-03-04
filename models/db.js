//IMPORTACION DE DEPENDENCIAS PARA CREACION Y SYNC DE LA BASE DE DATOS
const Config = require('../config/config');
const sequelize = require('sequelize');

//IMPORTACION DE LOS MODELOS
const UsuarioModel = require('./usuario.model');
const UsuarioDataModel = require('./usuario.datos.model');
const TipoUsuarioModel = require('./tipo.usuario.model');
const CartaModel = require('./cartas.model');
const MonedaModel = require('./monedas.model');
const EmpresaModel = require('./empresas.model');
const PaisModel = require('./pais.model');
const TipoDocumentoModel = require('./tipo.documento.model');
const TipoCuentaModel = require('./tipo.cuenta.model');
const BancoModel = require('./banco.model');
const CatalogoGastosModel = require('./gastos.model');
const CatalogoSubgastoModel = require('./subgasto.model');
const GastoUsuarioModel = require('./gastos.tipo.usuario.model');
const FacturaModel = require('./factura.model');
const LiquidacionModel = require('./liquidacion.model');
const LiquidacionFacturaModel = require('./liquidacion.factura.model');
const PlanillaModel = require('./planilla.model');
const PlanillaReciboModel = require('./planilla.recibo.model');
const CuentaModel = require('./cuenta.model');
const SubcuentaModel = require('./subcuenta.model');
const DepositoModel = require('./deposito.model');
const OrdenViaticosModel = require('./orden.viaticos.model');
const OrdenPresupuestoModel = require('./orden.presupuesto.model');
const OrdenLiquidacionModel = require('./orden.liquidacion.model');
const OrdenDepostioModel = require('./orden.deposito.model');
const OrdenUsuarioModel = require('./orden.usuario.model');
const EmpresaMonedaModel = require('./empresa.moneda');

//CONTROL DEL ENTORNO DE DESARROLLO DE LA BASE DE DATOS
let config;

if (Config.develop.status) {
    config = Config.develop;
} else {
    config = Config.production;
}

Sequelize = new sequelize(config.db, config.user, config.password, config.db_);

//INSTANCIA DE LOS MODELOS PARA LA SYNC CON LA BASE DE DATOS
const TipoUsuario = TipoUsuarioModel(Sequelize, sequelize);
const Usuario = UsuarioModel(Sequelize, sequelize, TipoUsuario);
const UsuarioDatos = UsuarioDataModel(Sequelize, sequelize, Usuario);
const Carta = CartaModel(Sequelize, sequelize);
const Moneda = MonedaModel(Sequelize, sequelize);
const Empresa = EmpresaModel(Sequelize, sequelize);
const Pais = PaisModel(Sequelize, sequelize);
const TipoDocumento = TipoDocumentoModel(Sequelize, sequelize);
const TipoCuenta = TipoCuentaModel(Sequelize, sequelize);
const Banco = BancoModel(Sequelize, sequelize);
const CatalogoGastos = CatalogoGastosModel(Sequelize, sequelize);
const CatalogoSubgasto = CatalogoSubgastoModel(Sequelize, sequelize, CatalogoGastos);
const GastoUsuario = GastoUsuarioModel(Sequelize, sequelize, CatalogoGastos, TipoUsuario);
const Factura = FacturaModel(Sequelize, sequelize, Usuario, TipoDocumento, Moneda, CatalogoSubgasto);
const Liquidacion = LiquidacionModel(Sequelize, sequelize,Usuario, Empresa, Moneda, TipoCuenta);
const LiquidacionFactura = LiquidacionFacturaModel(Sequelize, sequelize, Liquidacion, Factura);
const Planilla = PlanillaModel(Sequelize, sequelize, Pais, Moneda, Empresa);
const PlanillaRecibo = PlanillaReciboModel(Sequelize, sequelize, Planilla, Usuario);
const Cuenta = CuentaModel(Sequelize, sequelize, Usuario);
const Subcuenta = SubcuentaModel(Sequelize, sequelize, Cuenta, Moneda, TipoCuenta, Empresa);
const Deposito = DepositoModel(Sequelize, sequelize, Subcuenta);
const OrdenViaticos = OrdenViaticosModel(Sequelize, sequelize, Empresa, Pais, Moneda);
const OrdenPresupuesto = OrdenPresupuestoModel(Sequelize, sequelize, OrdenViaticos);
const OrdenLiquidacion = OrdenLiquidacionModel(Sequelize, sequelize, OrdenViaticos, Liquidacion);
const OrdenUsuario = OrdenUsuarioModel(Sequelize, sequelize, OrdenViaticos, Usuario);
const OrdenDeposito = OrdenDepostioModel(Sequelize, sequelize, OrdenViaticos, Deposito);
const EmpresaMoneda = EmpresaMonedaModel(Sequelize, sequelize, Empresa, Moneda);
//EXPORTACION DE LOS MODELOS PARA SETEO EN LA APLICACION EXPRESS
module.exports = {
    Sequelize,
    TipoUsuario,
    Usuario,
    UsuarioDatos,
    Carta,
    Moneda,
    Empresa,
    Pais,
    TipoDocumento,
    TipoCuenta,
    Banco,
    CatalogoGastos,
    CatalogoSubgasto,
    GastoUsuario,
    Factura,
    Liquidacion,
    LiquidacionFactura,
    Planilla,
    PlanillaRecibo,
    Cuenta,
    Subcuenta,
    Deposito,
    OrdenViaticos,
    OrdenPresupuesto,
    OrdenLiquidacion,
    OrdenUsuario,
    OrdenDeposito,
    EmpresaMoneda
};