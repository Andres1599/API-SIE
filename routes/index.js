const routes = require('express').Router();
module.exports = (app) => {
    //import models
    const CartaController = require('../controller/carta.controller')(app);
    const UsuarioController = require('../controller/usuario.controller')(app);
    const AdminGetController = require('../controller/admin.controller')(app);
    const BancosController = require('../controller/banco.controller')(app);
    const TipoUsuarioController = require('../controller/tipo.usuario.controller')(app);
    const EmpresaController = require('../controller/empresa.controller')(app);
    const MonedaController = require('../controller/moneda.controller')(app);
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

    //routes from tipo usuario
    routes.post('/tipo/usuario/', TipoUsuarioController.create);
    routes.delete('/tipo/usuario/delete', TipoUsuarioController.delete);

    //routes from empresas
    routes.post('/empresa/', EmpresaController.create);
    routes.delete('/empresa/', EmpresaController.delete);
    routes.put('/empresa/', EmpresaController.update);

    //routes from moneda
    routes.post('/moneda/', MonedaController.create);
    routes.delete('/moneda/', MonedaController.delete);
    routes.put('/moneda/', MonedaController.update);
    routes.get('/moneda/iso/:simbolo', MonedaController.getByIso);
    routes.post('/moneda/impuesto/', MonedaController.updateImpuesto);
    routes.get('/moneda/iso/', MonedaController.getIso);


    return routes;
};