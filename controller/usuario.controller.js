const jwt = require('jsonwebtoken');
const response = require('../response/response');
const config = require('../config/config');
const utiles = require('../utils/utilidades');

module.exports = (app, str) => {

    let usuario = app.get('usuario')
    let datosUsuario = app.get('usuario_datos')

    return {
        create: (req, res) => {
            createUsuario(usuario, datosUsuario, req, res, str)
        },
        updatePassword: (req, res) => {
            changePassword(usuario, req, res, str)
        },
        findByEmail: (req, res, next) => {
            findUserByEmail(req, res, next, str, usuario, datosUsuario)
        },
        login: (req, res) => {
            login(req, res, str)
        },
        forgetPass: (req, res) => {
            forgetPass(usuario, datosUsuario, req, res);
        },
        password: (req, res) => {
            updatePasswordAdmin(usuario, req, res);
        }
    }
}

async function createUsuario(usuario, datosUsuario, req, res, str) {

    try {
        const password = req.body.password;

        if (!password) {
            res.status(400).json(new response(false, str.errCreate, null, null))
        }

        const hash = utiles.encrypt(password)

        if (hash) {

            const newUser = await usuario.create({
                email: req.body.email,
                password: hash,
                status: true,
                fk_id_tipo: req.body.tipo_usuario
            })

            if (newUser) {

                const dataUsuario = await datosUsuario.create({
                    fk_id_usuario: newUser.id_usuario,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido
                })

                res.json(new response(true, str.create, null, newUser))

            } else {
                res.json(new response(false, str.createErr, null, newUser))
            }

        } else {
            res.json(new response(false, str.createErr, null, null))
        }

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

function changePassword(usuario, req, res, str) {

    const hash = utiles.encrypt(req.body.new_pass)

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
            let pass = utiles.decrypt(req.body.old_pass, user.password)
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

function findUserByEmail(req, res, next, str, usuario, datosUsuario) {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    if (!user.email && !user.password) {
        res.status(400).json(new response(false, str.error400, null, null))
    }

    usuario.findOne({
        where: {
            email: req.body.email
        },
        include: [{
            model: datosUsuario,
            attributes: ['nombre', 'apellido', 'dpi', 'TEL']
        }]
    }).then(userResponse => {
        if (userResponse) {
            req.body.userResponse = userResponse
            req.body.userSend = user
            next();
        } else {
            res.status(401).json(new response(false, str.error401, null, null))
        }
    }).catch(error => {
        res.status(500).json(new response(false, str.errCatch, error, null))
    })


}

function login(req, res, str) {

    try {

        const userSend = req.body.userSend
        const userResponse = req.body.userResponse;

        const options = {
            expiresIn: '24h'
        }

        let validPassword = utiles.decrypt(userSend.password, userResponse.password)

        if (validPassword) {

            const token = jwt.sign(userResponse.toJSON(), config.seed, options);

            res.status(200).json(new response(true, str.getAll, null, {
                token,
                expiresIn: options.expiresIn,
                user: userResponse
            }))

        } else {
            res.status(401).json(new response(false, str.error401, null, null))
        }

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null));
    }

}

async function updateWithOutOldPass(usuario, id_usuario, newPassRandom) {

    const hash = utiles.encrypt(newPassRandom)

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

    const hash = utiles.encrypt(req.body.password)

    if (!hash) {
        res.json({
            message: str.createErr
        })
    }

    usuario.update({
        status: req.body.status,
        password: hash
    }, {
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