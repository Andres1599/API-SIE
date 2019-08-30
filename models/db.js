const Config = require('../config/config');
const sequelize = require('sequelize');

//IMPORTACION DE LOS MODELOS
const UsuarioModel = require('./usuario.model');
const TipoUsuarioModel = require('./tipo.usuario.model');
const CartaModel = require('./cartas.model');
const MonedaModel = require('./monedas.model');
const EmpresaModel = require('./empresas.model');
const PaisModel = require('./pais.model');
const TipoDocumentoModel = require('./tipo.documento.model');
const TipoCuentaModel = require('./tipo.cuenta.model');
const BancoModel = require('./banco.model');

//CONTROL DEL ENTORNO DE DESARROLLO DE LA BASE DE DATOS
if (Config.develop.status) {
    Sequelize = new sequelize(Config.develop.db, Config.develop.user, Config.develop.password, Config.develop.db_);
} else {
    Sequelize = new sequelize(Config.production.db, Config.production.user, Config.production.password, Config.production.db_);
}

//INSTANCIA DE LOS MODELOS PARA LA SYNC CON LA BASE DE DATOS
const TipoUsuario = TipoUsuarioModel(Sequelize, sequelize);
const Usuario = UsuarioModel(Sequelize, sequelize, TipoUsuario);
const Carta = CartaModel(Sequelize, sequelize);
const Moneda = MonedaModel(Sequelize, sequelize);
const Empresa = EmpresaModel(Sequelize, sequelize);
const Pais = PaisModel(Sequelize, sequelize);
const TipoDocumento = TipoDocumentoModel(Sequelize, sequelize);
const TipoCuenta = TipoCuentaModel(Sequelize, sequelize);
const Banco = BancoModel(Sequelize, sequelize);

module.exports = {
    Sequelize,
    TipoUsuario,
    Usuario,
    Carta,
    Moneda,
    Empresa,
    Pais,
    TipoDocumento,
    TipoCuenta,
    Banco
};