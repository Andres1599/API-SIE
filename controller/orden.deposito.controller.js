const response = require('../response/response')

module.exports = (app, str) => {

    const ordenDeposito = app.get('orden_deposito');
    const deposito = app.get('deposito')

    return {
        create: (req, res, next) => { newOrdenDeposito(req, res, next, str, ordenDeposito, deposito) },
        delete: (req, res) => { deleteOrdenDeposito(req, res, str, ordenDeposito, deposito) }
    }
}

async function newOrdenDeposito(req, res, next, str, ordenDeposito, deposito) {
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
                fk_id_moneda: req.body.fk_id_moneda
            }
        }, {
            include: [{
                model: deposito,
                as: 'deposito'
            }]
        })

        req.body.deposito = dataDeposito.deposito
        next()
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteOrdenDeposito(req, res, str, ordenDeposito, deposito) {
    try {
        await ordenDeposito.destroy({ where: { id_orden_deposito: req.params.id } })
        await deposito.destroy({ where: { id_deposito: req.params.id_deposito } })
        res.json(new response(true, str.delete, null, true))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}