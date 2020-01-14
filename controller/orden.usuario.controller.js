module.exports = function(app) {
    let ordenUsuario = app.get('orden_usuario');
    return {
        create: (req, res) => { newOrdenUsuario(ordenUsuario, req, res); },
        update: (req, res) => { updateOrdenUsuario(ordenUsuario, req, res); },
        delete: (req, res) => { deleteOrdenUsuario(ordenUsuario, req, res); },
        getById: (req, res) => { getOrdenUsuarioById(ordenUsuario, req, res); },
        getAll: (req, res) => { getAllOrdenUsuario(ordenUsuario, req, res); }
    }
}

function newOrdenUsuario(ordenUsuario, req, res) {
    ordenUsuario.create({
        encargado_orden: req.body.encargado_orden,
        fk_id_orden: req.body.fk_id_orden,
        fk_id_usuario: req.body.fk_id_usuario,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva orden de usuario",
                created: false
            });
        }
    });
}

function deleteOrdenUsuario(ordenUsuario, req, res) {
    ordenUsuario.findOne({
        where: {
            id_orden_usuario: req.body.id_orden_usuario
        }
    }).then(function(response) {
        if (response) {
            ordenUsuario.destroy({
                where: {
                    id_orden_usuario: req.body.id_orden_usuario
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la orden de usuario",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la orden de usuario",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de usuario para eliminarlo"
            });
        }
    });
}

function updateOrdenUsuario(ordenUsuario, req, res) {
    ordenUsuario.update({
        encargado_orden: req.body.encargado_orden,
        fk_id_orden: req.body.fk_id_orden,
        fk_id_usuario: req.body.fk_id_usuario,
    }, {
        where: {
            id_orden_usuario: req.body.id_orden_usuario
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

function getOrdenUsuarioById(ordenUsuario, req, res) {
    ordenUsuario.findOne({
        where: {
            id_orden_usuario: req.params.id_orden_usuario
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la orden de usuario"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar la orden de usuario",
            error: err
        });
    });
}

function getAllOrdenUsuario(ordenUsuario, req, res) {
    ordenUsuario.findAll().then(function(response) {
        res.json(response);
    });
}