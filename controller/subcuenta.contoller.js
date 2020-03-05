module.exports = function(app) {
    let subCuentas = app.get('subcuentas');
    return {
        create: (req, res) => { newSubCuentas(subCuentas, req, res); },
        update: (req, res) => { updateSubCuentas(subCuentas, req, res); },
        delete: (req, res) => { deleteSubCuentas(subCuentas, req, res); },
        getById: (req, res) => { getSubCuentasById(subCuentas, req, res); },
        getAll: (req, res) => { getAllSubCuentas(subCuentas, req, res); }
    }
}

function newSubCuentas(subCuentas, req, res) {
    subCuentas.create({
        cuenta_contable: req.body.cuenta_contable,
        fk_id_cuenta: req.body.fk_id_cuenta,
        fk_id_moneda: req.body.fk_id_moneda,
        fk_id_tipo_cuenta: req.body.fk_id_tipo_cuenta,
        fk_id_empresa: req.body.fk_id_empresa,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva subcuenta",
                created: false
            });
        }
    });
}

function deleteSubCuentas(subCuentas, req, res) {
    subCuentas.findOne({
        where: {
            id_cuenta_empresa: req.body.id_cuenta_empresa
        }
    }).then(function(response) {
        if (response) {
            subCuentas.destroy({
                where: {
                    id_cuenta_empresa: req.body.id_cuenta_empresa
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la subcuenta",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la subcuenta",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar la subcuenta para eliminarlo"
            });
        }
    });
}

function updateSubCuentas(subCuentas, req, res) {
    subCuentas.update({
        cuenta_contable: req.body.cuenta_contable,
        fk_id_cuenta: req.body.fk_id_cuenta,
        fk_id_moneda: req.body.fk_id_moneda,
        fk_id_tipo_cuenta: req.body.fk_id_tipo_cuenta,
        fk_id_empresa: req.body.fk_id_empresa,
    }, {
        where: {
            id_cuenta_empresa: req.body.id_cuenta_empresa
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

function getSubCuentasById(subCuentas, req, res) {
    subCuentas.findOne({
        where: {
            id_cuenta_empresa: req.params.id_cuenta_empresa
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la subcuenta"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar la subcuenta",
            error: err
        });
    });
}

function getAllSubCuentas(subCuentas, req, res) {
    subCuentas.findAll().then(function(response) {
        res.json(response);
    });
}