module.exports = function(app) {
    let ordenPresupuesto = app.get('orden_presupuestos');
    return {
        create: (req, res) => { newOrdenPresupuesto(ordenPresupuesto, req, res); },
        update: (req, res) => { updateOrdenPresupuesto(ordenPresupuesto, req, res); },
        delete: (req, res) => { deleteOrdenPresupuesto(ordenPresupuesto, req, res); },
        getById: (req, res) => { getOrdenPresupuestoById(ordenPresupuesto, req, res); },
        getAll: (req, res) => { getAllOrdenPresupuesto(ordenPresupuesto, req, res); }
    }
}

function newOrdenPresupuesto(ordenPresupuesto, req, res) {
    ordenPresupuesto.create({
        gasto: req.body.gasto,
        dias: req.body.dias,
        valor: req.body.valor,
        total: req.body.total,
        observaciones: req.body.observaciones,
        fk_id_orden_viaticos: req.body.fk_id_orden_viaticos,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva orden de presupuesto",
                created: false
            });
        }
    });
}

function deleteOrdenPresupuesto(ordenPresupuesto, req, res) {
    ordenPresupuesto.findOne({
        where: {
            id_presupuesto_orde: req.body.id_presupuesto_orde
        }
    }).then(function(response) {
        if (response) {
            ordenPresupuesto.destroy({
                where: {
                    id_presupuesto_orde: req.body.id_presupuesto_orde
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la orden de presupuesto",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la orden de presupuesto",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de presupuesto para eliminarlo"
            });
        }
    });
}

function updateOrdenPresupuesto(ordenPresupuesto, req, res) {
    ordenPresupuesto.update({
        gasto: req.body.gasto,
        dias: req.body.dias,
        valor: req.body.valor,
        total: req.body.total,
        observaciones: req.body.observaciones,
        fk_id_orden_viaticos: req.body.fk_id_orden_viaticos,
    }, {
        where: {
            id_presupuesto_orde: req.body.id_presupuesto_orde
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

function getOrdenPresupuestoById(ordenPresupuesto, req, res) {
    ordenPresupuesto.findOne({
        where: {
            id_presupuesto_orde: req.params.id_presupuesto_orde
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de presupuesto"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar la orden de presupuesto",
            error: err
        });
    });
}

function getAllOrdenPresupuesto(ordenPresupuesto, req, res) {
    ordenPresupuesto.findAll().then(function(response) {
        res.json(response);
    });
}