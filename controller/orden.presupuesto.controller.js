const response = require('../response/response')

module.exports = function (app, str) {
    const ordenPresupuesto = app.get('orden_presupuesto');
    return {
        create: (req, res) => { newOrdenPresupuesto(ordenPresupuesto, req, res, str) },
        delete: (req, res) => { deleteOrdenPresupuesto(ordenPresupuesto, req, res, str) },
    }
}

async function newOrdenPresupuesto(ordenPresupuesto, req, res, str) {
    try {
        const total = (req.body.dias * 1) * (req.body.valor * 1)
        const budgetData = await ordenPresupuesto.create({
            gasto: req.body.gasto,
            dias: req.body.dias,
            valor: req.body.valor,
            total: total,
            observaciones: req.body.observaciones,
            fk_id_orden_viaticos: req.body.fk_id_orden_viaticos,
        })

        res.status(200).json(new response(true, str.delete, null, budgetData))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}

async function deleteOrdenPresupuesto(ordenPresupuesto, req, res, str) {
    try {
        await ordenPresupuesto.destroy({
            where: {
                id_presupuesto_orden: req.params.id
            }
        })

        res.status(200).json(new response(true, str.delete, null, true))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}