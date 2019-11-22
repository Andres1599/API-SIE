module.exports = (app, str) => {

    let usuario = app.get('usuario');
    let datosUsuario = app.get('usuario_datos');

    return {
        create: (req, res) => { createUsuario(usuario, req, res, str) },
        updatePassword: (req, res) => { changePassword(usuario, req, res, str) },
    };
}

/** 
 *@description
 *Verify the user for access to system
 *@params `email`,`password`, `tipo_usuario`
 *@publicApi 
 **/
function createUsuario(usuario, req, res, str) {

    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (!hash) {
        res.json({
            message: str.createErr
        });
    }

    usuario.create({
        email: req.body.email,
        password: hash,
        status: false,
        fk_id_tipo: req.body.tipo_usuario
    }).then(response => {
        if (response)
            res.json({
                message: str.create,
                created: true
            });
        else
            res.json({
                message: str.createErr,
                error: response,
                created: false
            });
    }).catch(err => {
        if (err)
            res.json({
                message: str.createErr,
                error: err,
                created: false
            });
    });
}

/** 
 * @description
 * Update de password to the users on the system
 * @params `email`,`password`
 * @publicApi
 * **/
function changePassword(usuario, req, res, str) {

    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (!hash) {
        res.json({
            message: str.updateErr
        });
    }

    usuario.update({
        password: hash
    }, {
        where: {
            email: req.body.email
        }
    }).then(update => {
        if (update)
            res.json({
                message: str.update,
                updated: true
            });
    }).catch(err => {
        if (err)
            res.json({
                message: str.updateErr,
                error: err,
                updated: false
            });
    });
}