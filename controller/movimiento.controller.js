const response = require('../response/response')

module.exports = (app, str) => {
    const MovimientoSubCuenta = app.get('movimiento_subcuenta')
    const MovimientoLiquidacion = app.get('movimiento_liquidacion')
    const MovimientoDeposito = app.get('movimiento_deposito')
    const SubCuenta = app.get('subcuenta')
    return {
        getByAccount: (req, res) => { getMovimientoByidCount(req, res, str, MovimientoSubCuenta, SubCuenta) },
        create: (req, res) => { createMovimiento(req, res, str, MovimientoSubCuenta) },
        createAbono: (req, res) => { createMovimientoAbono(req, res, str, MovimientoSubCuenta, MovimientoDeposito) },
        createCargo: (req, res) => { createMovimientoCargo(req, res, str, MovimientoSubCuenta, MovimientoLiquidacion) }
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

async function getSaldoActual(MovimientoSubCuenta, idSubCuenta) {
    try {
        const idMovimiento = await MovimientoSubCuenta.max('id', {
            where: { fk_id_subcuenta: idSubCuenta }
        })
        const movimiento = await MovimientoSubCuenta.findOne({
            where: { id: idMovimiento }
        })
        return movimiento.saldo_actual
    } catch (error) {
        return 0;
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

async function createMovimientoCargo(req, res, str, MovimientoSubCuenta, MovimientoLiquidacion) {
    try {
        const idSubCuenta = req.body.fk_id_subcuenta
        const cargoCuenta = req.body.cargo
        const saldoActual = await getSaldoActual(MovimientoSubCuenta, idSubCuenta)
        const idLiquidacion = req.body.id_liquidacion

        const newMovimientoCargo = await MovimientoSubCuenta.create({
            fecha: new Date(),
            cargo: cargoCuenta,
            abono: 0,
            saldo_actual: (saldoActual - req.body.cargo),
            comentario: str.action,
            movimiento_liquidacion: [
                {
                    fk_id_liquidacion: idLiquidacion
                }
            ]
        }, {
            include: [{ model: MovimientoLiquidacion, as: 'movimiento_liquidacion' }]
        })

        res.json(new response(true, str.create, null, newMovimientoCargo))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function createMovimientoAbono(req, res, str, MovimientoSubCuenta, MovimientoDeposito) {
    try {
        const deposito = req.body.deposito
        const idSubCuenta = deposito.fk_id_subcuenta
        const abonoCuenta = deposito.monto
        const saldoActual = await getSaldoActual(MovimientoSubCuenta, idSubCuenta)
        const idDeposito = deposito.id_deposito

        const newMovimientoAbono = await MovimientoSubCuenta.create({
            fecha: new Date(),
            cargo: 0,
            abono: abonoCuenta,
            saldo_actual: (saldoActual + abonoCuenta),
            comentario: str.action,
            fk_id_subcuenta: idSubCuenta,
            movimiento_depositos:
            {
                fk_id_deposito: idDeposito
            }
        }, {
            include: [{ model: MovimientoDeposito, as: 'movimiento_depositos' }]
        })

        res.json(new response(true, str.create, null, newMovimientoAbono))

    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, error, null))
    }
}