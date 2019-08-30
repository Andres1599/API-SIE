const routes = require('express').Router();
module.exports = (app) => {
    //import models
    const CartaController = require('../controller/carta.controller')(app);

    //routes cartas
    routes.post('/carta/create/', CartaController.create);
    routes.get('/carta/', CartaController.getAll);
    routes.delete('/carta/delete/', CartaController.delete);

    return routes;
};