module.exports = (app, str) => {

    const depositos = app.get('deposito')
    const cuenta = app.get('cuenta')
    const subCuenta = app.get('subcuenta')

    return {
        create: (req, res) => { newDeposito(depositos, req, res) },
        delete: (req, res) => { deleteDeposito(depositos, req, res) },
        getById: (req, res) => { getDepositosById(depositos, req, res) },
        getAll: (req, res) => { getAllDepositos(depositos, req, res) }
    }
}

async function newDeposito(depositos, req, res) {
    depositos.create({
        fecha: req.body.fecha,
        fecha_registro: req.body.fecha_registro,
        monto: req.body.monto,
        comentario: req.body.comentario,
        cambio: req.body.cambio,
        fk_id_subcuenta: req.body.subcuenta,
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo deposito",
                created: false
            });
        }
    });
}

function deleteDeposito(depositos, req, res) {
    depositos.findOne({
        where: {
            id_deposito: req.body.id_deposito
        }
    }).then(function (response) {
        if (response) {
            depositos.destroy({
                where: {
                    id_deposito: req.body.id_deposito
                }
            }).then(function (deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el deposito",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el deposito",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el deposito para eliminarlo"
            });
        }
    });
}

function updateDeposito(depositos, req, res) {
    depositos.update({
        fecha: req.body.fecha,
        fecha_registro: req.body.fecha_registro,
        monto: req.body.monto,
        comentario: req.body.comentario,
        cambio: req.body.cambio,
        fk_id_subcuenta: req.body.subcuenta,
    }, {
        where: {
            id_deposito: req.body.id_deposito
        }
    }).then(function (update) {
        res.json(update);
    }).catch(function (err) {
        res.json({
            message: 'Error al procesar el petición',
            error: err
        });
    })
}

function getDepositosById(depositos, req, res) {
    depositos.findOne({
        where: {
            id_deposito: req.params.id_deposito
        }
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el deposito"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar el deposito",
            error: err
        });
    });
}

function getAllDepositos(depositos, req, res) {
    depositos.findAll().then(function (response) {
        res.json(response);
    });
}