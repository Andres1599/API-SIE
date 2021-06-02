const response = require('../response/response')
module.exports = (app, str) => {
    const MovimientoSubCuenta = app.get('movimiento_subcuenta')
    const MovimientoLiquidacion = app.get('movimiento_liquidacion')
    const MovimientoDeposito = app.get('movimiento_deposito')
    const Sequelize = app.get('op')
    const SubCuenta = app.get('subcuenta')
    return {
        getByAccount: (req, res) => { getMovimientoByidCount(req, res, str, MovimientoSubCuenta, SubCuenta, Sequelize) },
        createAbono: (req, res, next) => { },
        createCargo: (req, res, next) => { createMovimientoCargo(req, res, next, str, MovimientoSubCuenta, MovimientoLiquidacion) }
    }
}

async function getMovimientoByidCount(req, res, str, MovimientoSubCuenta, SubCuenta, Sequelize) {
    try {
        const op = Sequelize.Op
        const idCuentaContable = req.params.id
        const movimientosSubCuenta = await MovimientoSubCuenta.findAll({
            include: [{ model: SubCuenta, where: { cuenta_contable: idCuentaContable } }],
            order: ['fecha', 'ASC'],
        })
        res.json(new response(true, str.getAll, null, movimientosSubCuenta))
    } catch (error) {
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