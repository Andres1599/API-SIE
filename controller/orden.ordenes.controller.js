const response = require('../response/response')

module.exports = (app, str) => {
    const ordenOrdenes = app.get('orden_orden');
    return {
        create: (req, res) => { newOrdenOrdenes(ordenOrdenes, req, res, str) },
        delete: (req, res) => { deleteOrdenOrdenes(ordenOrdenes, req, res, str) },
    }
}

async function newOrdenOrdenes(ordenOrdenes, req, res, str) {
    try {
        const dataOrder = await ordenOrdenes.create({
            orden: req.body.orden,
            fk_id_orden: req.body.fk_id_orden
        })
        
        res.status(200).json(new response(true, str.create, null, dataOrder))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}

async function deleteOrdenOrdenes(ordenOrdenes, req, res, str) {
    try {
        await ordenOrdenes.destroy({
            where: {
                id_orden_orden: req.params.id
            }
        })

        res.status(200).json(new response(true, str.delete, null, true))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}