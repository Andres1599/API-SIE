const response = require('../response/response')

module.exports = (app, str) => {

    const ordenDeposito = app.get('orden_liquidacion');
    const deposito = app.get('deposito')

    return {
        create: (req, res) => { newOrdenDeposito(req, res, str, ordenDeposito, deposito) },
        delete: (req, res) => { deleteOrdenDeposito(req, res, str, ordenDeposito, deposito) }
    }
}

async function newOrdenDeposito(req, res, str, ordenDeposito, deposito) {
    try {
        const dataDeposito = await ordenDeposito.create({
            fk_id_orden: req.body.fk_id_orden,
            deposito: {
                fecha: req.body.fecha,
                fecha_registro: new Date(),
                monto: req.body.monto,
                comentario: req.body.comentario,
                cambio: req.body.cambio,
                fk_id_subcuenta: req.body.fk_id_subcuenta,
            }
        }, {
            include: [{
                model: deposito,
                as: 'deposito'
            }]
        })

        res.json(new response(false, str.create, null, dataDeposito))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}

async function deleteOrdenDeposito(req, res, str, ordenDeposito, deposito) {
    try {
        await ordenDeposito.destroy({ where: { id_orden_deposito: req.body.id_orden_deposito } })
        await deposito.destroy({ where: { id_deposito: req.body.id_deposito } })
        res.json(new response(false, str.delete, null, true))
    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}