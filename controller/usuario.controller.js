module.exports = (app) => {

    let usuario = app.get('usuario');
    const strings = require('../utils/strings.res');

    return {
        create: (req, res) => { createUsuario(usuario, req, res, strings); },
        update: (req, res) => {},
        delete: (req, res) => {},
        getById: (req, res) => {},
        getAll: (req, res) => {}
    };
}

function createUsuario(usuario, req, res, strings) {
    usuario.create({
        email: req.body.email,
        password: req.body.password,
        status: true
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