const response = require('../response/response')
module.exports = function (app, str) {
    const ordenViaticos = app.get('orden_viaticos');
    const ordenDepositos = app.get('orden_deposito')
    const ordenLiquidaciones = app.get('orden_liquidacion')
    const ordenUsuarios = app.get('orden_usuario')
    const ordenOrdenes = app.get('orden_orden')
    const ordenPresupuesto = app.get('orden_presupuesto')

    return {
        create: (req, res) => {
            createOrden(req, res, str, ordenViaticos)
        },
        update: (req, res) => {},
        delete: (req, res) => {},
        getById: (req, res) => {},
        getAll: (req, res) => {
            getAll(req, res, str, ordenViaticos, ordenDepositos, ordenLiquidaciones, ordenUsuarios, ordenOrdenes, ordenPresupuesto)
        },
        getAllClient: (req, res) => {
            getAllClientName(req, res, str, ordenViaticos)
        }
    }
}

function createOrden(req, res, str, ordenViaticos) {
    ordenViaticos.create({
            id_orden_viaticos: req.body.id_orden_viaticos,
            fecha: new Date(),
            fecha_salia: req.body.fecha_salia,
            fecha_regreso: req.body.fecha_regreso,
            cliente: req.body.cliente,
            status: false
        }).then(orden => {
            if (orden) {
                res.json(new response(true, str.create, null, orden))
            } else {
                res.json(new response(false, str.createErr, null, orden))
            }
        })
        .catch(err => {
            res.json(new response(false, str.errCatch, err.message, null))
        })
}

function getAll(req, res, str, ordenViaticos, ordenDepositos, ordenLiquidaciones, ordenUsuarios, ordenOrdenes, ordenPresupuesto) {
    ordenViaticos.findAll({
            include: [{
                    model: ordenOrdenes
                },
                {
                    model: ordenDepositos
                },
                {
                    model: ordenUsuarios
                },
                {
                    model: ordenPresupuesto
                },
                {
                    model: ordenLiquidaciones
                },
            ]
        }).then((ordenes) => {
            if (ordenes) {
                res.json(new response(true, str.get, null, ordenes))
            } else {
                res.json(new response(false, str.getErr, null, ordenes))
            }
        })
        .catch(err => {
            res.json(new response(false, str.errCatch, err.message, null))
        })
}

function getAllClientName(req, res, str, ordenViaticos) {
    ordenViaticos.aggregate('cliente', 'DISTINCT', {
            plain: false
        }).then((names) => {
            if (names) {
                res.json(new response(true, str.get, null, names))
            } else {
                res.json(new response(false, str.getErr, null, names))
            }
        })
        .catch(err => {
            console.error(err)
            res.json(new response(false, str.errCatch, err.message, null))
        })
}