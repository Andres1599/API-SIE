const bcrypt = require('bcryptjs')
module.exports = (app, str) => {

    let usuario = app.get('usuario')
    let datosUsuario = app.get('usuario_datos')

    return {
        /** 
         *@description
         *Verify the user for access to system
         *@params `email`,`password`, `tipo_usuario`
         *@publicApi 
         **/
        create: (req, res) => {
            createUsuario(usuario, req, res, str)
        },
        /** 
         * @description
         * Update de password to the users on the system
         * @params `email`,`password`
         * @publicApi
         * **/
        updatePassword: (req, res) => {
            changePassword(usuario, req, res, str)
        },
        /**
         * @description
         * Log in to access on the system
         * @params `email`, `password`
         * @publicApi
         */
        login: (req, res) => {
            login(usuario, datosUsuario, req, res, str)
        },
        forgetPass: (req, res) => {
            forgetPass(usuario, datosUsuario, req, res);
        },
        password: (req, res) => {
            updatePasswordAdmin(usuario, req, res);
        }
    }
}

function createUsuario(usuario, req, res, str) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (!hash) {
        res.json({
            message: str.createErr
        })
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
            })
        else
            res.json({
                message: str.createErr,
                error: response,
                created: false
            })
    }).catch(err => {
        if (err)
            res.json({
                message: str.createErr,
                error: err,
                created: false
            })
    })
}

function changePassword(usuario, req, res, str) {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.new_pass, salt)

    if (!hash) {
        res.json({
            message: str.updateErr
        })
    }

    usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                console.log(user.password)
                let pass = bcrypt.compareSync(req.body.old_pass, user.password)
                if (pass) {
                    return usuario.update({
                        password: hash
                    }, {
                        where: {
                            id_usuario: user.id_usuario
                        }
                    })
                } else {
                    res.json({
                        message: 'El password antiguo no es correcto',
                        update: false
                    })
                }
            }
        })
        .then(update => {
            if (update) {
                res.json({
                    message: str.update,
                    update: true
                })
            }
        })
        .catch(err => {
            if (err)
                res.json({
                    message: str.updateErr,
                    error: err,
                    updated: false
                })
        })
}

function login(usuario, datosUsuario, req, res, str) {
    usuario.findOne({
        where: {
            email: req.body.email
        },
        include: [{
            model: datosUsuario,
            attributes: ['nombre', 'apellido', 'dpi', 'TEL']
        }]
    }).then(rest => {
        const passworUser = rest.password
        let pass = bcrypt.compareSync(req.body.password, passworUser)

        if (pass) {
            res.json({
                message: str.get,
                usuario: rest,
                logged: true
            })
        } else {
            res.json({
                message: str.getErr,
                usuario: null,
                logged: false
            })
        }
    }).catch(err => {
        if (err)
            res.json({
                message: str.getErr,
                error: err,
                logged: false
            })
    })
}

async function updateWithOutOldPass(usuario, id_usuario, newPassRandom) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassRandom, salt);

    usuario.update({
        password: hash
    }, {
        where: {
            id_usuario: id_usuario
        }
    }).then(updated => {
        if (updated) {
            return true;
        }
    }).catch(err => {
        if (err) {
            return false;
        }
    });
}

function RANDOM_PASS() {
    return Math.random().toString(36).substr(2, 9);
}

function forgetPass(usuario, datosUsuario, req, res) {
    usuario.findOne({
        where: {
            email: req.body.email,
            status: true
        },
        attributes: ['id_usuario', 'email', 'status'],
        include: [{
            model: datosUsuario,
            attributes: ['id', 'nombre', 'apellido', 'tel', 'dpi'],
            where: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dpi: req.body.dpi
            }
        }]
    }).then(async (response) => {
        if (response) {
            const newPass = RANDOM_PASS();
            await updateWithOutOldPass(usuario, response.id_usuario, newPass);

            res.status(200).send({
                password: newPass
            });
        } else {
            res.status(200).send({
                message: 'Usuario no encontrado.'
            })
        }
    }).catch(err => {
        if (err) {
            res.status(400).send({
                message: 'Error al encontrar al usuario.',
                err
            });
        }
    });
}

function updatePasswordAdmin(usuario, req, res) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (!hash) {
        res.json({
            message: str.createErr
        })
    }

    usuario.update({
        status: req.body.status,
        password: hash
    },{
        where: {
            id_usuario: req.body.id_usuario
        }
    }).then((update) => {
        if (update) {
            res.json({
                updated: true,
                usuario: update
            })
        }
    })
    .catch(err => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        }
    })
}