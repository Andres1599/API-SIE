module.exports = (app, str) => {
    const Cuentas = app.get('cuenta');
    const Usuarios = app.get('usuario');
    const DatosUsuarios = app.get('usuarios_datos');
    const SubCuentas = app.get('subcuenta');
    const Empresa = app.get('empresa')
    const Moneda = app.get('moneda')
    const TipoCuenta = app.get('tipo_cuenta')
    const response = require('../response/response')

    return {
        create: (req, res) => { newCuenta(Cuentas, req, res) },
        update: (req, res) => { updateCuenta(Cuentas, req, res) },
        delete: (req, res) => { deleteCuenta(Cuentas, req, res) },
        getAll: (req, res) => { getAllCuentas(Cuentas, Usuarios, DatosUsuarios, SubCuentas, req, res) },
        getById: (req, res) => { getCuentasById(req, res, str, response, Cuentas, SubCuentas, Empresa, Moneda, TipoCuenta, Usuarios, DatosUsuarios) },
    }
}

function newCuenta(Cuentas, req, res) {
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

function updateCuenta(Cuentas, req, res) {
    Cuentas.update({
        fk_id_Usuarios: req.body.id_Usuarios,
    }, {
        where: {
            id_cuenta: req.body.id_cuenta
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

function getAllCuentas(Cuentas, Usuarios, DatosUsuarios, SubCuentas, req, res) {
    Cuentas.findAll({
        include: [
            {
                model: Usuarios,
                include: [DatosUsuarios]
            },
            {
                model: SubCuentas
            }
        ]
    }).then(function (response) {
        res.json(response);
    });
}

async function getCuentasById(req, res, str, response, Cuentas, SubCuentas, Empresa, Moneda, TipoCuenta, Usuario, DatosUsuario) {
    try {
        const idCuenta = req.params.id
        const cuenta = await Cuentas.findByPk(idCuenta, {
            include: [
                { model: SubCuentas, include: [Empresa, Moneda, TipoCuenta] },
                { model: Usuario }
            ]
        })
        res.json(new response(true, str.get, null, cuenta))
    } catch (error) {
        console.log(error);
        res.json(new response(false, str.errCatch, null, error))
    }
}
