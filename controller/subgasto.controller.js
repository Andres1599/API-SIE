module.exports = function (app, str) {

    const subgasto = app.get('subgasto');
    const response = require('../response/response');

    return {
        create: (req, res) => { newSubGasto(req, res, str, response, subgasto) },
        update: (req, res) => { updateSubGasto(req, res, str, response, subgasto) },
        delete: (req, res) => { deleteSubGasto(req, res, str, response, subgasto) },
        getById: (req, res) => { getSubGastoByIdGasto(req, res, str, response, subgasto) },
    }
}

async function newSubGasto(req, res, str, response, subgasto) {
    try {

        const newSubgasto = await subgasto.create({
            nombre_subgasto: req.body.nombre_subgasto,
            gasto_max: req.body.gasto_max,
            fk_id_gasto: req.body.fk_id_gasto,
        });

        res.json(new response(true, str.create, null, true));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function deleteSubGasto(req, res, str, response, subgasto) {
    try {

        const deleted = await subgasto.destroy({
            where: {
                id_subgasto: req.params.id
            }
        })

        res.json(new response(true, str.create, null, true));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function updateSubGasto(req, res, str, response, subgasto) {
    try {

        const updateSubgasto = await subgasto.update({
            nombre_subgasto: req.body.nombre_subgasto,
            gasto_max: req.body.gasto_max,
        }, {
            where: {
                id_subgasto: req.body.id_subgasto
            }
        })

        res.json(new response(true, str.update, null, true));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
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