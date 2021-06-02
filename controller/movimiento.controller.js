const response = require('../response/response')

module.exports = (app, str) => {
    const MovimientoSubCuenta = app.get('movimiento_subcuenta')
    const MovimientoLiquidacion = app.get('movimiento_liquidacion')
    const MovimientoDeposito = app.get('movimiento_deposito')
    const SubCuenta = app.get('subcuenta')
    return {
        getByAccount: (req, res) => { getMovimientoByidCount(req, res, str, MovimientoSubCuenta, SubCuenta) },
        create: (req, res) => { createMovimiento(req, res, str, MovimientoSubCuenta) },
        createAbono: (req, res, next) => { createMovimientoAbono(req, res, next, str, MovimientoSubCuenta, MovimientoDeposito) },
        createCargo: (req, res, next) => { createMovimientoCargo(req, res, next, str, MovimientoSubCuenta, MovimientoLiquidacion) }
    }
}

async function createMovimiento(req, res, str, MovimientoSubCuenta) {
    try {
        const newMovimiento = await MovimientoSubCuenta.create({
            fecha: new Date(),
            cargo: req.body.cargo,
            abono: req.body.abono,
            saldo_actual: req.body.saldo_actual,
            comentario: req.body.comentario,
            fk_id_subcuenta: req.body.fk_id_subcuenta
        })
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getMovimientoByidCount(req, res, str, MovimientoSubCuenta, SubCuenta) {
    try {
        const idCuentaContable = req.params.cuenta
        const idSubCuenta = req.params.id

        const movimientosSubCuenta = await MovimientoSubCuenta.findAll({
            where: { fk_id_subcuenta: idSubCuenta },
            include: [{ model: SubCuenta, where: { cuenta_contable: idCuentaContable } }],
            order: [['fecha', 'ASC']],
        })
        res.json(new response(true, str.getAll, null, movimientosSubCuenta))
    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function createMovimientoCargo(req, res, next, str, MovimientoSubCuenta, MovimientoLiquidacion) {
    try {
        const newMovimientoCargo = await MovimientoSubCuenta.create({

        }, {
            include: [MovimientoLiquidacion]
        })
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function createMovimientoAbono(req, res, next, str, MovimientoSubCuenta, MovimientoDeposito) {
    try {
        const newMovimientoAbono = await MovimientoSubCuenta.create({

        }, {
            include: [MovimientoDeposito]
        })
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}