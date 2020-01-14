module.exports = function(app) {
    let recibos = app.get('recibos');
    return {
        create: (req, res) => { newRecibos(recibos, req, res); },
        update: (req, res) => { updateRecibos(recibos, req, res); },
        delete: (req, res) => { deleteRecibos(recibos, req, res); },
        getById: (req, res) => { getRecibosById(recibos, req, res); },
        getAll: (req, res) => { getAllRecibos(recibos, req, res); }
    }
}

function newRecibos(recibos, req, res) {
    recibos.create({
        planilla: req.body.planilla,
        isss: req.body.isss,
        honorario: req.body.honorario,
        prestamos: req.body.prestamos,
        liquido: req.body.liquido,
        fecha: req.body.fecha,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo recibo",
                created: false
            });
        }
    });
}

function deleteRecibos(recibos, req, res) {
    recibos.findOne({
        where: {
            id_recibo: req.body.id_recibo
        }
    }).then(function(response) {
        if (response) {
            recibos.destroy({
                where: {
                    id_recibo: req.body.id_recibo
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el recibo",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el recibo",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el recibo para eliminarlo"
            });
        }
    });
}

function updateRecibos(recibos, req, res) {
    recibos.update({
        planilla: req.body.planilla,
        isss: req.body.isss,
        honorario: req.body.honorario,
        prestamos: req.body.prestamos,
        liquido: req.body.liquido,
        fecha: req.body.fecha,
    }, {
        where: {
            id_recibo: req.body.id_recibo
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

function getRecibosById(recibos, req, res) {
    recibos.findOne({
        where: {
            id_recibo: req.params.id_recibo
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el recibo"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el recibo",
            error: err
        });
    });
}

function getAllRecibos(recibos, req, res) {
    recibos.findAll().then(function(response) {
        res.json(response);
    });
}