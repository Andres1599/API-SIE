module.exports = function(app) {
    let usuarioDatos = app.get('usuarios_datos');
    return {
        create: (req, res) => { newUsuarioDatos(usuarioDatos, req, res); },
        update: (req, res) => { updateUsuarioDatos(usuarioDatos, req, res); },
        delete: (req, res) => { deleteUsuarioDatos(usuarioDatos, req, res); },
        getById: (req, res) => { getUsuarioDatosById(usuarioDatos, req, res); },
        getAll: (req, res) => { getAllUsuarioDatos(usuarioDatos, req, res); }
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
    }).then(function(response) {
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
    }).then(function(response) {
        if (response) {
            usuarioDatos.destroy({
                where: {
                    fk_id_usuario: req.body.fk_id_usuario
                }
            }).then(function(deleted) {
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
        nombre_documento: req.body.nombre_documento,
    }, {
        where: {
            fk_id_usuario: req.body.fk_id_usuario
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getUsuarioDatosById(usuarioDatos, req, res) {
    usuarioDatos.findOne({
        where: {
            fk_id_usuario: req.params.fk_id_usuario
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el dato de usuario"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el dato de usuario",
            error: err
        });
    });
}

function getAllUsuarioDatos(usuarioDatos, req, res) {
    usuarioDatos.findAll().then(function(response) {
        res.json(response);
    });
}