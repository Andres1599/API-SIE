const Config = require('../config/config');
const sequelize = require('sequelize');

//Import models
const UsuarioModel = require('./usuario.model');
const TipoUsuarioModel = require('./tipo.usuario.model');

if (Config.develop.status) {
    Sequelize = new sequelize(Config.develop.db || 'sie_dev', Config.develop.user || 'root', Config.develop.password || 'root', Config.develop.db_);
} else {
    Sequelize = new sequelize(Config.production.db || 'sie_produc', Config.production.user || 'root', Config.production.password || 'root', Config.production.db_);
}

const TipoUsuario = TipoUsuarioModel(Sequelize, sequelize);
const Usuario = UsuarioModel(Sequelize, sequelize, TipoUsuario);

module.exports = { Sequelize, TipoUsuario, Usuario };