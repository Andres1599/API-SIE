module.exports = function(app) {
    let cuentas = app.get('cuenta');
    return {
        create: (req, res) => { newCuenta(cuentas, req, res); },
        update: (req, res) => { updateCuenta(cuentas, req, res); },
        delete: (req, res) => { deleteCuenta(cuentas, req, res); },
        getById: (req, res) => { getCuentasById(cuentas, req, res); },
        getAll: (req, res) => { getAllCuentas(cuentas, req, res); }
    }
}

function newCuenta(cuentas, req, res) {
    cuentas.create({
        fk_id_usuario: req.body.id_usuario,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva cuenta",
                created: false
            });
        }
    });
}

function deleteCuenta(cuentas, req, res) {
    cuentas.findOne({
        where: {
            id_cuenta: req.body.id_cuenta
        }
    }).then(function(response) {
        if (response) {
            cuentas.destroy({
                where: {
                    id_cuenta: req.body.id_cuenta
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la cuenta",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la cuenta",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el cuenta para eliminarlo"
            });
        }
    });
}

function updateCuenta(cuentas, req, res) {
    cuentas.update({
        fk_id_usuario: req.body.id_usuario,
    }, {
        where: {
            id_cuenta: req.body.id_cuenta
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getCuentasById(cuentas, req, res) {
    cuentas.findOne({
        where: {
            id_cuenta: req.params.id_cuenta
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar al cuenta"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar al cuenta",
            error: err
        });
    });
}

function getAllCuentas(cuentas, req, res) {
    cuentas.findAll().then(function(response) {
        res.json(response);
    });
}