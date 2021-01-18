module.exports = (app, str) => {

    const usuarioDatos = app.get('usuario_datos')
    const usuarios = app.get('usuario')
    const response = require('../response/response')

    return {
        create: (req, res) => {
            newUsuarioDatos(usuarioDatos, req, res);
        },
        update: (req, res) => {
            updateUsuarioDatos(usuarioDatos, req, res);
        },
        delete: (req, res) => {
            deleteUsuarioDatos(usuarioDatos, req, res);
        },
        getById: (req, res) => {
            getUsuarioDatosById(usuarioDatos, req, res);
        },
        getAll: (req, res) => {
            getAllUsuarioDatos(usuarioDatos, req, res);
        },
        getReport: (req, res) => {
            getReportEmployees(req, res, str, response, usuarioDatos, usuarios)
        }
    }
}

function newUsuarioDatos(usuarioDatos, req, res) {
    usuarioDatos.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dpi: req.body.dpi,
        puesto: req.body.puesto,
        nacionalidad: req.body.nacionalidad,
        ec: req.body.ec,
        lna: req.body.lna,
        nit: req.body.nit,
        naigss: req.body.naigss,
        hijos: req.body.hijos,
        profesion: req.body.profesion,
        etnia: req.body.etnia,
        localizar: req.body.localizar,
        direccion: req.body.direccion,
        tel: req.body.tel,
        movil: req.body.movil,
        fk_id_usuario: req.body.fk_id_usuario
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo dato de usuario",
                created: false
            });
        }
    });
}

function deleteUsuarioDatos(usuarioDatos, req, res) {
    usuarioDatos.findOne({
        where: {
            fk_id_usuario: req.body.fk_id_usuario
        }
    }).then(function (response) {
        if (response) {
            usuarioDatos.destroy({
                where: {
                    fk_id_usuario: req.body.fk_id_usuario
                }
            }).then(function (deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el dato de usuario",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el dato de usuario",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el dato de usuario para eliminarlo"
            });
        }
    });
}

function updateUsuarioDatos(usuarioDatos, req, res) {
    usuarioDatos.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dpi: req.body.dpi,
        puesto: req.body.puesto,
        NACIONALIDAD: req.body.NACIONALIDAD,
        EC: req.body.EC,
        LNA: req.body.LNA,
        NIT: req.body.NIT,
        NAIGSS: req.body.NAIGSS,
        HIJOS: req.body.HIJOS,
        PROFESION: req.body.PROFESION,
        ETNIA: req.body.ETNIA,
        LOCALIZAR: req.body.LOCALIZAR,
        DIRECCION: req.body.DIRECCION,
        TEL: req.body.TEL,
        MOVIL: req.body.MOVIL
    }, {
        where: {
            id: req.body.id
        }
    }).then(update => {
        if (update) {
            res.json(update);
        } else {
            res.json({
                message: 'Error al actualizar la informacion del usuario.',
                error: err
            });
        }
    }).catch(err => {
        res.json({
            message: 'Error al actualizar la informacion del usuario.',
            error: err
        });
    })
}

function getUsuarioDatosById(usuarioDatos, req, res) {
    usuarioDatos.findOne({
        where: {
            fk_id_usuario: req.params.id
        }
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el dato de usuario"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar el dato de usuario",
            error: err
        });
    });
}

function getAllUsuarioDatos(usuarioDatos, req, res) {
    usuarioDatos.findAll().then(function (response) {
        res.json(response);
    });
}

async function getReportEmployees(req, res, str, response, usuarioDatos, usuarios) {
    try {

        const datosUsuarios = await usuarioDatos.findAll({
            include: [
                {
                    model: usuarios,
                    where: {
                        status: true
                    }
                }
            ]
        })

        res.json(new response(true, str.get, null, datosUsuarios));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}