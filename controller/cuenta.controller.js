module.exports = (app, str) => {
    const Cuentas = app.get('cuenta');
    const Usuarios = app.get('usuario');
    const DatosUsuarios = app.get('usuario_datos');
    const SubCuentas = app.get('subcuenta');
    const Empresa = app.get('empresa')
    const Moneda = app.get('moneda')
    const TipoCuenta = app.get('tipo_cuenta')
    const response = require('../response/response')

    return {
        create: (req, res) => { newCuenta(Cuentas, req, res) },
        delete: (req, res) => { deleteCuenta(Cuentas, req, res) },
        getAll: (req, res) => { getAllCuentas(req, res, str, response, Cuentas, Usuarios, DatosUsuarios) },
        getById: (req, res) => { getCuentasById(req, res, str, response, Cuentas, SubCuentas, Empresa, Moneda, TipoCuenta, Usuarios, DatosUsuarios) },
    }
}

async function newCuenta(Cuentas, req, res) {
    Cuentas.create({
        fk_id_Usuarios: req.body.id_Usuarios,
    }).then(function (response) {
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

function deleteCuenta(Cuentas, req, res) {
    Cuentas.findOne({
        where: {
            id_cuenta: req.body.id_cuenta
        }
    }).then(function (response) {
        if (response) {
            Cuentas.destroy({
                where: {
                    id_cuenta: req.body.id_cuenta
                }
            }).then(function (deleted) {
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

async function getAllCuentas(req, res, str, response, Cuentas, Usuarios, DatosUsuarios) {
    try {
        const cuentas = await Cuentas.findAll({ include: [{ model: Usuarios, include: [DatosUsuarios] }] })
        res.json(new response(true, str.get, null, cuentas))
    } catch (error) {
        res.json(new response(false, str.errCatch, null, error))
    }
}

async function getCuentasById(req, res, str, response, Cuentas, SubCuentas, Empresa, Moneda, TipoCuenta, Usuario, DatosUsuario) {
    try {
        const idCuenta = req.params.id
        const cuenta = await Cuentas.findByPk(idCuenta, {
            include: [
                { model: SubCuentas, include: [Empresa, Moneda, TipoCuenta] },
                { model: Usuario, include: [DatosUsuario] }
            ]
        })
        res.json(new response(true, str.get, null, cuenta))
    } catch (error) {
        res.json(new response(false, str.errCatch, null, error))
    }
}
