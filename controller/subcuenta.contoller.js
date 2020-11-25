const response = require('../response/response')

module.exports = (app, str) => {

    const cuenta = app.get('cuenta')
    const subCuentas = app.get('subcuenta')
    const moneda = app.get('moneda')
    const empresa = app.get('empresa')
    const tipoCuenta = app.get('tipo_cuenta')
    const sequelize = app.get('op')

    return {
        create: (req, res) => { newSubCuentas(subCuentas, req, res); },
        update: (req, res) => { updateSubCuentas(subCuentas, req, res); },
        delete: (req, res) => { deleteSubCuentas(subCuentas, req, res); },
        getById: (req, res) => { getSubCuentasById(subCuentas, req, res); },
        getAll: (req, res) => { getAllSubCuentas(subCuentas, req, res); },
        getByOrder: (req, res) => { getCuentasByTecnicos(req, res, str, cuenta, subCuentas, tipoCuenta, moneda, empresa, sequelize) }
    }
}

function newSubCuentas(subCuentas, req, res) {
    subCuentas.create({
        cuenta_contable: req.body.cuenta_contable,
        fk_id_cuenta: req.body.fk_id_cuenta,
        fk_id_moneda: req.body.fk_id_moneda,
        fk_id_tipo_cuenta: req.body.fk_id_tipo_cuenta,
        fk_id_empresa: req.body.fk_id_empresa,
    }).then(function (response) {
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
    }).then(function (response) {
        if (response) {
            subCuentas.destroy({
                where: {
                    id_cuenta_empresa: req.body.id_cuenta_empresa
                }
            }).then(function (deleted) {
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
    }).then(function (update) {
        res.json(update);
    }).catch(function (err) {
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
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la subcuenta"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar la subcuenta",
            error: err
        });
    });
}

function getAllSubCuentas(subCuentas, req, res) {
    subCuentas.findAll().then(function (response) {
        res.json(response);
    });
}

async function getCuentasByTecnicos(req, res, str, cuenta, subCuentas, tipoCuenta, moneda, empresa, sequelize) {
    try {

        const Op = sequelize.Op
        const users = req.body.users

        const cuentasPrincipales = await cuenta.findAll({
            where: {
                fk_id_usuario: {
                    [Op.or]: users
                }
            },
        })

        const cuentasResum = cuentasPrincipales.map(value => value.id_cuenta)

        const subAccounta = await subCuentas.findAll({
            where: {
                fk_id_cuenta: {
                    [Op.or]: cuentasResum
                }
            },
            include: [tipoCuenta, moneda, empresa]
        })

        res.json(new response(true, str.getAll, null, subAccounta))

    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, error, null))
    }
}