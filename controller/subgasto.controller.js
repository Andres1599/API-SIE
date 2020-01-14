module.exports = function(app) {
    let catalogoSubGasto = app.get('catalogo_subgasto');
    return {
        create: (req, res) => { newCatalogoSubGasto(catalogoSubGasto, req, res); },
        update: (req, res) => { updateCatalogoSubGasto(catalogoSubGasto, req, res); },
        delete: (req, res) => { deleteCatalogoSubGasto(catalogoSubGasto, req, res); },
        getById: (req, res) => { getCatalogoSubGastoById(catalogoSubGasto, req, res); },
        getAll: (req, res) => { getAllCatalogoSubGasto(catalogoSubGasto, req, res); }
    }
}

function newCatalogoSubGasto(catalogoSubGasto, req, res) {
    catalogoSubGasto.create({
        nombre_subgasto: req.body.nombre_subgasto,
        gasto_max: req.body.gasto_max,
        fk_id_gasto: req.body.fk_id_gasto,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo subgasto",
                created: false
            });
        }
    });
}

function deleteCatalogoSubGasto(catalogoSubGasto, req, res) {
    catalogoSubGasto.findOne({
        where: {
            id_subgasto: req.body.id_subgasto
        }
    }).then(function(response) {
        if (response) {
            catalogoSubGasto.destroy({
                where: {
                    id_subgasto: req.body.id_subgasto
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el subgasto",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el subgasto",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el subgasto para eliminarlo"
            });
        }
    });
}

function updateCatalogoSubGasto(catalogoSubGasto, req, res) {
    catalogoSubGasto.update({
        nombre_subgasto: req.body.nombre_subgasto,
        gasto_max: req.body.gasto_max,
        fk_id_gasto: req.body.fk_id_gasto,
    }, {
        where: {
            id_subgasto: req.body.id_subgasto
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

function getCatalogoSubGastoById(catalogoSubGasto, req, res) {
    catalogoSubGasto.findOne({
        where: {
            id_subgasto: req.params.id_subgasto
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el subgasto"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el subgasto",
            error: err
        });
    });
}

function getAllCatalogoSubGasto(catalogoSubGasto, req, res) {
    catalogoSubGasto.findAll().then(function(response) {
        res.json(response);
    });
}