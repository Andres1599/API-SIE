const strings = require('../utils/strings.res');

module.exports = (app) => {

    let tipoUsuario = app.get('tipo_usuario');

    return {
        create: (req, res) => {
            createTipoUsuario(tipoUsuario, req, res);
        },
        get: (req, res) => {
            getAll(tipoUsuario, res);
        },
        delete: (req, res) => {
            deleteTipoUsuario(tipoUsuario, req, res);
        }
    };
}

function createTipoUsuario(tipoUsuario, req, res) {
    tipoUsuario.create({
        tipo_usuario: req.body.tipo_usuario
    }).then(response => {
        if (response)
            res.json({
                message: strings.create,
                tipoUsuario: response
            });
    }).catch(err => {
        if (err)
            res.status(500).send({
                message: strings.createErr,
                error: err
            });
    });
}

function getAll(tipoUsuario, res) {
    tipoUsuario.findAll().then(response => {
        if (response)
            res.json({
                tipoUsuarios: res
            });
        else
            res.json({
                tipoUsuarios: res
            });
    }).catch(err => {
        if (err)
            res.status(500).send({
                message: strings.getErr,
                error: err
            });
    });
}

function deleteTipoUsuario(tipoUsuario, req, res) {
    tipoUsuario.destroy({
        where: {
            id_tipo_usuario: req.body.id_tipo_usuario
        }
    }).then(deleted => {
        if (deleted)
            res.json({
                message: strings.delete,
                deleted: deleted
            });
        else
            res.json({
                message: strings.deleteErr,
                deleted: deleted
            });
    }).catch(err => {
        if (err)
            res.status(500).send({
                message: strings.deleteErr,
                error: err
            });
    });
}