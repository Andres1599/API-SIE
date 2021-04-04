module.exports = (app, str) => {

    const response = require('../response/response')
    const OrdenLiquidacion = app.get('orden_liquidacion')
    const sequelize = app.get('op')
    const Liquidaciones = app.get('liquidacion')
    const Monedas = app.get('moneda')
    const Usuario = app.get('usuario')
    const datosUsuarios = app.get('usuario_datos')

    return {
        create: (req, res) => { createOrdenLiquidation(req, res, str, response, OrdenLiquidacion) },
        delete: (req, res) => { deleteOrdenLiquidacion(req, res, str, response, OrdenLiquidacion) },
        getByUserOrder: (req, res) => { getLiquidationsToAdd(req, res, str, response, Liquidaciones, Monedas, Usuario, datosUsuarios, sequelize) }
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

async function getLiquidationsToAdd(req, res, str, response, Liquidaciones, Monedas, Usuario, datosUsuarios, sequelize) {
    try {
        const Op = sequelize.Op
        const users = req.body.users

        const liquidations = await Liquidaciones.findAll({
            where: {
                id_usuario: {
                    [Op.or]: users
                },
                estado: true
            },
            include: [Monedas, { model: Usuario, include: [datosUsuarios] }]
        })

        res.json(new response(true, str.getAll, null, liquidations))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}
