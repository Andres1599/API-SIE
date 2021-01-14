module.exports = (app, str) => {

    const gastos = app.get('gasto');
    const response = require('../response/response')

    return {
        create: (req, res) => { newGastos(req, res, str, response, gastos) },
        update: (req, res) => { updateGastos(req, res, str, response, gastos) },
        getAll: (req, res) => { getAllGastos(req, res, str, response, gastos) },
        getById: (req, res) => { getGastosById(req, res, str, response, gastos) }
    }
}

async function newGastos(req, res, str, response, gastos) {
    try {
        const newGasto = await gastos.create({
            nombre_gasto: req.body.nombre_gasto,
            cuenta_contable: req.body.cuenta_contable,
        })

        res.json(new response(true, str.create, null, true));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function updateGastos(req, res, str, response, gastos) {
    try {
        const updateGasto = await gastos.update({
            nombre_gasto: req.body.nombre_gasto,
            cuenta_contable: req.body.cuenta_contable,
        }, {
            where: {
                id_gasto: req.body.id_gasto
            }
        })

        res.json(new response(true, str.create, null, true));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function getAllGastos(req, res, str, response, gastos) {
    try {

        const dataGastos = await gastos.findAll();
        res.json(new response(true, str.get, null, dataGastos));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function getGastosById(req, res, str, response, gastos) {
    try {

        const dataGastos = await gastos.findOne({
            where: {
                id_gasto: req.params.id
            }
        });
        res.json(new response(true, str.get, null, dataGastos));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}