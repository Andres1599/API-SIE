module.exports = function (app, str) {

    const subgasto = app.get('subgasto');
    const response = require('../response/response');

    return {
        create: (req, res) => { newCatalogoSubGasto(catalogoSubGasto, req, res); },
        update: (req, res) => { updateCatalogoSubGasto(catalogoSubGasto, req, res); },
        delete: (req, res) => { deleteCatalogoSubGasto(catalogoSubGasto, req, res); },
        getById: (req, res) => { getSubGastoByIdGasto(req, res, str, response, subgasto) },
    }
}

function newCatalogoSubGasto(req, req, str, response, subgasto) {
    catalogoSubGasto.create({
        nombre_subgasto: req.body.nombre_subgasto,
        gasto_max: req.body.gasto_max,
        fk_id_gasto: req.body.fk_id_gasto,
    }).then(function (response) {
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

function deleteCatalogoSubGasto(req, req, str, response, subgasto) {
    catalogoSubGasto.findOne({
        where: {
            id_subgasto: req.body.id_subgasto
        }
    }).then(function (response) {
        if (response) {
            catalogoSubGasto.destroy({
                where: {
                    id_subgasto: req.body.id_subgasto
                }
            }).then(function (deleted) {
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

function updateCatalogoSubGasto(req, req, str, response, subgasto) {
    catalogoSubGasto.update({
        nombre_subgasto: req.body.nombre_subgasto,
        gasto_max: req.body.gasto_max,
        fk_id_gasto: req.body.fk_id_gasto,
    }, {
        where: {
            id_subgasto: req.body.id_subgasto
        }
    }).then(function (update) {
        res.json(update);
    }).catch(function (err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

async function getSubGastoByIdGasto(req, res, str, response, subgasto) {
    try {
        const subGastos = await subgasto.findAll({
            where: {
                fk_id_gasto: req.params.id
            }
        })

        res.json(new response(true, str.get, null, subGastos));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}