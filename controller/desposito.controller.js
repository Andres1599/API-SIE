const response = require('../response/response')
module.exports = (app, str) => {
    const depositos = app.get('deposito')
    return {
        create: (req, res) => { newDeposito(req, res, next, str, Deposito) },
        delete: (req, res) => { deleteDeposito(req, res, str, Deposito) },
    }
}

async function newDeposito(req, res, next, str, Deposito) {
    try {
        const deposito = await Deposito.create({
            fecha: req.body.fecha,
            fecha_registro: req.body.fecha_registro,
            monto: req.body.monto,
            comentario: req.body.comentario,
            cambio: req.body.cambio,
            fk_id_subcuenta: req.body.subcuenta,
            fk_id_moneda: req.body.fk_id_moneda
        })
        req.body.deposito = deposito;
        next()
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteDeposito(req, res, str, Deposito) {
    try {

    } catch (error) {
        res.json(new response())
    }
}