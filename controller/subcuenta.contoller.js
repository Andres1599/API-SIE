const response = require('../response/response')

module.exports = (app, str) => {

    const cuenta = app.get('cuenta')
    const subCuentas = app.get('subcuenta')
    const moneda = app.get('moneda')
    const empresa = app.get('empresa')
    const tipoCuenta = app.get('tipo_cuenta')
    const sequelize = app.get('op')

    return {
        create: (req, res) => { createSubCuentas(req, res, str, subCuentas) },
        update: (req, res) => { updateSubCuentas(req, res, str, subCuentas) },
        getById: (req, res) => { getSubCuentasById(subCuentas, req, res) },
        getByOrder: (req, res) => { getCuentasByTecnicos(req, res, str, cuenta, subCuentas, tipoCuenta, moneda, empresa, sequelize) }
    }
}

async function createSubCuentas(req, res, str, subCuentas) {
    try {
        const newSubAccount = await subCuentas.create({
            cuenta_contable: req.body.cuenta_contable,
            fk_id_cuenta: req.body.fk_id_cuenta,
            fk_id_moneda: req.body.fk_id_moneda,
            fk_id_tipo_cuenta: req.body.fk_id_tipo_cuenta,
            fk_id_empresa: req.body.fk_id_empresa,
        })

        res.json(new response(true, str.create, null, newSubAccount))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateSubCuentas(req, res, str, subCuentas) {
    try {
        const updateSubCuenta = subCuentas.update({
            cuenta_contable: req.body.cuenta_contable,
            fk_id_moneda: req.body.fk_id_moneda,
            fk_id_tipo_cuenta: req.body.fk_id_tipo_cuenta,
            fk_id_empresa: req.body.fk_id_empresa,
        }, {
            where: {
                id_cuenta_empresa: req.body.id_cuenta_empresa
            }
        })
        res.json(new response(true, str.update, null, updateSubCuenta))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
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
        res.json(new response(false, str.errCatch, error, null))
    }
}