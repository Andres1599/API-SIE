module.exports = function(app) {
    let gastos = app.get('catalogo_gastos');
    return {
        create: (req, res) => { newGastos(gastos, req, res); },
        update: (req, res) => { updateGastos(gastos, req, res); },
        delete: (req, res) => { deleteGastos(gastos, req, res); },
        getById: (req, res) => { getGastosById(gastos, req, res); },
        getAll: (req, res) => { getAllGastos(gastos, req, res); }
    }
}

function newGastos(gastos, req, res) {
    gastos.create({
        nombre_gasto: req.body.nombre_gasto,
        cuenta_contable: req.body.cuenta_contable,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo gasto",
                created: false
            });
        }
    });
}

function deleteGastos(gastos, req, res) {
    gastos.findOne({
        where: {
            id_gasto: req.body.id_gasto
        }
    }).then(function(response) {
        if (response) {
            gastos.destroy({
                where: {
                    id_gasto: req.body.id_gasto
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el gasto",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el gasto",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el gasto para eliminarlo"
            });
        }
    });
}

function updateGastos(gastos, req, res) {
    gastos.update({
        nombre_gasto: req.body.nombre_gasto,
        cuenta_contable: req.body.cuenta_contable,
    }, {
        where: {
            id_gasto: req.body.id_gasto
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

function getGastosById(gastos, req, res) {
    gastos.findOne({
        where: {
            id_gasto: req.params.id_gasto
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el gasto"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el gasto",
            error: err
        });
    });
}

function getAllGastos(gastos, req, res) {
    gastos.findAll().then(function(response) {
        res.json(response);
    });
}