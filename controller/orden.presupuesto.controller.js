const response = require('../response/response')

module.exports = function (app, str) {
    const ordenPresupuesto = app.get('orden_presupuesto');
    return {
        create: (req, res) => { newOrdenPresupuesto(ordenPresupuesto, req, res, str) },
        delete: (req, res) => { deleteOrdenPresupuesto(ordenPresupuesto, req, res, str) },
    }
}

function newOrdenPresupuesto(ordenPresupuesto, req, res, str) {
    ordenPresupuesto.create({
        gasto: req.body.gasto,
        dias: req.body.dias,
        valor: req.body.valor,
        total: req.body.total,
        observaciones: req.body.observaciones,
        fk_id_orden_viaticos: req.body.fk_id_orden_viaticos,
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva orden de presupuesto",
                created: false
            });
        }
    });
}

async function deleteOrdenPresupuesto(ordenPresupuesto, req, res, str) {
    try {
        await ordenPresupuesto.destroy({
            where: {
                id_presupuesto_orden: req.params.id
            }
        })

        res.status(200).json(new response(true, str.delete, null, true))

    } catch (error) {
        console.log(error)
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}