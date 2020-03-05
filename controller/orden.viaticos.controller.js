module.exports = function(app) {
    let ordenViaticos = app.get('orden_viaticos');
    return {
        create: (req, res) => { newOrdenViaticos(ordenViaticos, req, res); },
        update: (req, res) => { updateOrdenViaticos(ordenViaticos, req, res); },
        delete: (req, res) => { deleteOrdenViaticos(ordenViaticos, req, res); },
        getById: (req, res) => { getOrdenViaticosById(ordenViaticos, req, res); },
        getAll: (req, res) => { getAllOrdenViaticos(ordenViaticos, req, res); }
    }
}

function newOrdenViaticos(ordenViaticos, req, res) {
    ordenViaticos.create({
        fecha: req.body.fecha,
        fecha_salia: req.body.fecha_salia,
        fecha_regreso: req.body.fecha_regreso,
        orden_trabajo: req.body.orden_trabajo,
        cliente: req.body.cliente,
        correlativo: req.body.correlativo,
        status: req.body.status,
        fk_id_empresa: req.body.fk_id_empresa,
        fk_id_pais: req.body.fk_id_pais,
        fk_id_moneda: req.body.fk_id_moneda,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva orden de viaticos",
                created: false
            });
        }
    });
}

function deleteOrdenViaticos(ordenViaticos, req, res) {
    ordenViaticos.findOne({
        where: {
            id_orden_viaticos: req.body.id_orden_viaticos
        }
    }).then(function(response) {
        if (response) {
            ordenViaticos.destroy({
                where: {
                    id_orden_viaticos: req.body.id_orden_viaticos
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la orden de viaticos",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la orden de viaticos",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de viaticos para eliminarlo"
            });
        }
    });
}

function updateOrdenViaticos(ordenViaticos, req, res) {
    ordenViaticos.update({
        fecha: req.body.fecha,
        fecha_salia: req.body.fecha_salia,
        fecha_regreso: req.body.fecha_regreso,
        orden_trabajo: req.body.orden_trabajo,
        cliente: req.body.cliente,
        correlativo: req.body.correlativo,
        status: req.body.status,
        fk_id_empresa: req.body.fk_id_empresa,
        fk_id_pais: req.body.fk_id_pais,
        fk_id_moneda: req.body.fk_id_moneda,
    }, {
        where: {
            id_orden_viaticos: req.body.id_orden_viaticos
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

function getOrdenViaticosById(ordenViaticos, req, res) {
    ordenViaticos.findOne({
        where: {
            id_orden_viaticos: req.params.id_orden_viaticos
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de viaticos"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar la orden de viaticos",
            error: err
        });
    });
}

function getAllOrdenViaticos(ordenViaticos, req, res) {
    ordenViaticos.findAll().then(function(response) {
        res.json(response);
    });
}