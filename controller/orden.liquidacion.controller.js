module.exports = (app, str) => {

    const response = require('../response/response')
    const OrdenLiquidacion = app.get('orden_liquidacion')

    return {
        create: (req, res) => { createOrdenLiquidation(req, res, str, response, OrdenLiquidacion) },
        delete: (req, res) => { deleteOrdenLiquidacion(req, res, str, response, OrdenLiquidacion) },
    }
}

async function createOrdenLiquidation(req, res, str, response, OrdenLiquidacion) {
    try {
        const newOrdenLiquidacion = await OrdenLiquidacion.create({
            fk_id_orden: req.body.fk_id_orden,
            fk_id_liquidacion: req.body.fk_id_liquidacion
        })
        res.json(new response(true, str.create, null, newOrdenLiquidacion))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteOrdenLiquidacion(req, res, str, response, OrdenLiquidacion) {
    try {
        const deleted = await OrdenLiquidacion.destroy({
            where: {
                id_orden_liquidacion: req.params.id
            }
        })
        res.json(new response(true, str.delete, null, deleted))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}
