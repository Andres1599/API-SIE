module.exports = function(app) {
    let ordenDeposito = app.get('orden_liquidacion');
    return {
        create: (req, res) => { newOrdenDeposito(ordenDeposito, req, res); },
        update: (req, res) => { updateOrdenDeposito(ordenDeposito, req, res); },
        delete: (req, res) => { deleteOrdenDeposito(ordenDeposito, req, res); },
        getById: (req, res) => { getOrdenDepositoById(ordenDeposito, req, res); },
        getAll: (req, res) => { getAllOrdenDeposito(ordenDeposito, req, res); }
    }
}

function newOrdenDeposito(ordenDeposito, req, res) {
    ordenDeposito.create({
        fk_id_orden: req.body.fk_id_orden,
        fk_id_liquidacion: req.body.fk_id_liquidacion,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva orden de deposito",
                created: false
            });
        }
    });
}

function deleteOrdenDeposito(ordenDeposito, req, res) {
    ordenDeposito.findOne({
        where: {
            id_orden_liquidacion: req.body.id_orden_liquidacion
        }
    }).then(function(response) {
        if (response) {
            ordenDeposito.destroy({
                where: {
                    id_orden_liquidacion: req.body.id_orden_liquidacion
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la orden de deposito",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la orden de deposito",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de deposito para eliminarlo"
            });
        }
    });
}

function updateOrdenDeposito(ordenDeposito, req, res) {
    ordenDeposito.update({
        fk_id_orden: req.body.fk_id_orden,
        fk_id_liquidacion: req.body.fk_id_liquidacion,
    }, {
        where: {
            id_orden_liquidacion: req.body.id_orden_liquidacion
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getOrdenDepositoById(ordenDeposito, req, res) {
    ordenDeposito.findOne({
        where: {
            id_orden_liquidacion: req.params.id_orden_liquidacion
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de deposito"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar la orden de deposito",
            error: err
        });
    });
}

function getAllOrdenDeposito(ordenDeposito, req, res) {
    ordenDeposito.findAll().then(function(response) {
        res.json(response);
    });
}