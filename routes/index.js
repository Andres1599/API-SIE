const routes = require('express').Router();
module.exports = (app) => {
    //import models
    const CartaController = require('../controller/carta.controller')(app);
    const UsuarioController = require('../controller/usuario.controller')(app);
    const AdminGetController = require('../controller/admin.controller')(app);
    const BancosController = require('../controller/banco.controller')(app);
    //routes cartas
    routes.post('/carta/create/', CartaController.create);
    routes.get('/carta/', CartaController.getAll);
    routes.delete('/carta/delete/', CartaController.delete);

    //routes usuario
    routes.post('/usuario/login/', UsuarioController.login);
    routes.get('/usuario/:id_usuario', UsuarioController.get);

    //routes get all master tables
    routes.get('/usuarios/', AdminGetController.getUsuarios);
    routes.get('/empresa/', AdminGetController.getEmpresas);
    routes.get('/bancos/', AdminGetController.getBancos);
    routes.get('/monedas/', AdminGetController.getMoneda);
    routes.get('/tipo/usuario/', AdminGetController.getTipoUsuario);

    //routes from bancos
    routes.post('/bancos/', BancosController.create);
    routes.get('/bancos/:id_banco', BancosController.getById);
    routes.delete('/bancos/delete', BancosController.delete);
    routes.put('/bancos/update', BancosController.update);

    return routes;
};