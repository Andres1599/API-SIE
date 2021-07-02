const response = require('../response/response')
module.exports = (app, str) => {
    const Deposito = app.get('deposito')
    return {
        create: (req, res, next) => { newDeposito(req, res, next, str, Deposito) },
    }
}

async function newDeposito(req, res, next, str, Deposito) {
    try {
        const deposito = await Deposito.create({
            fecha: req.body.fecha,
            fecha_registro: new Date(),
            monto: req.body.monto,
            comentario: req.body.comentario,
            cambio: req.body.cambio,
            fk_id_subcuenta: req.body.fk_id_subcuenta,
            fk_id_moneda: req.body.fk_id_moneda
        })
        req.body.deposito = deposito;
        next()
    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, error, null))
    }
}