module.exports = (app) => {

    let usuario = app.get('usuario');
    let datosUsuario = app.get('usuario_datos');
    let tipoUsuario = app.get('tipo_usuario');
    let liquidaciones = app.get('tipo_usuario');
    let cuentas = app.get('cuenta');
    let subcuentas = app.get('subcuenta');
    let facturas = app.get('factura');
    let ordenViaticos = app.get('liquidacion');
    let ordeUsuario = app.get('orden_usuario');
    const strings = require('../utils/strings.res');

    return {
        create: (req, res) => { createUsuario(usuario, req, res, strings); },
        update: (req, res) => {},
        delete: (req, res) => {},
        getById: (req, res) => {},
        getAll: (req, res) => {},
        login: (req, res) => {
            logIn(usuario, datosUsuario, tipoUsuario, req, res, strings);
        },
        get: (req, res) => {
            getAllInfo(usuario, datosUsuario, req, res);
        },
        getLiquidation: (req, res) => {
            getLiquidationUser(usuario, liquidaciones, req, res);
        }
    };
}

function createUsuario(usuario, req, res, strings) {
    usuario.create({
        email: req.body.email,
        password: req.body.password,
        status: true,
        fk_id_tipo_usuario: req.body.tipo_usuario
    }).then(response => {
        if (response)
            res.json({
                message: strings.create
            });
        else
            res.json({
                message: strings.createErr,
                error: response
            });
    }).catch(err => {
        if (err)
            res.json({
                message: strings.createErr,
                error: err
            });
    });
}

function logIn(usuario, datosUsuario, tipoUsuario, req, res, strings) {
    usuario.findOne({
        where: {
            email: req.body.correo,
            password: req.body.password,
            status: true
        },
        include: [{ model: datosUsuario, attributes: ['nombre', 'apellido', 'dpi'] }, { model: tipoUsuario }],
        attributes: ['id_usuario']
    }).then(response => {
        if (response) {
            res.json({
                message: strings.getAll,
                usuario: response,
                logged: true
            });
        } else {
            res.json({
                message: strings.getErr,
                canActive: false
            });
        }
    }).catch(err => {
        if (err) {
            res.json({
                message: strings.getErr,
                error: err
            });
        }
    });
}

function getAllInfo(usuario, datosUsuario, req, res) {
    usuario.findAll({
        where: {
            id_usuario: req.params.id_usuario
        },
        include: [{ model: datosUsuario, attributes: ['nombre', 'apellido', 'dpi'] }],
        attributes: ['id_usuario']
    }).then(response => {
        if (response) {
            res.json(response[0]);
        } else {
            res.json({
                message: 'Error al realizar la peticion',
                res: response
            });
        }
    }).catch(err => {
        if (err)
            res.json({
                message: 'Error al realizar la petición',
                error: err
            });
    });
}

function getLiquidationUser(usuario, liquidaciones, req, res) {
    usuario.findAll({
        where: {
            id_usuario: req.body.id_usuario
        },
        include: [{ model: liquidaciones, attributes: [''] }]
    })
}