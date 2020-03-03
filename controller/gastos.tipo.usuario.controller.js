module.exports = function (app) {
    let gastosTipoUsuario = app.get('gasto_usuario');
    let catalogoSubGasto = app.get('subgasto');
    let gasto = app.get('gasto');
    return {
        create: (req, res) => {
            newGastosTipoUsuario(gastosTipoUsuario, req, res);
        },
        update: (req, res) => {
            updateGastosTipoUsuario(gastosTipoUsuario, req, res);
        },
        delete: (req, res) => {
            deleteGastosTipoUsuario(gastosTipoUsuario, req, res);
        },
        getById: (req, res) => {
            getGastosTipoUsuarioById(gastosTipoUsuario, catalogoSubGasto, gasto, req, res);
        },
        getAll: (req, res) => {
            getAllGastosTipoUsuario(gastosTipoUsuario, req, res);
        }
    }
}

function newGastosTipoUsuario(gastosTipoUsuario, req, res) {
    gastosTipoUsuario.create({
        fk_id_gasto: req.body.fk_id_gasto,
        fk_id_tipo_usuario: req.body.fk_id_tipo_usuario,
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo gasto",
                created: false
            });
        }
    });
}

function deleteGastosTipoUsuario(gastosTipoUsuario, req, res) {
    gastosTipoUsuario.findOne({
        where: {
            id_gasto_usuario: req.body.id_gasto_usuario
        }
    }).then(function (response) {
        if (response) {
            gastosTipoUsuario.destroy({
                where: {
                    id_gasto_usuario: req.body.id_gasto_usuario
                }
            }).then(function (deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el gasto",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el gasto",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el gasto para eliminarlo"
            });
        }
    });
}

function updateGastosTipoUsuario(gastosTipoUsuario, req, res) {
    gastosTipoUsuario.update({
        fk_id_gasto: req.body.fk_id_gasto,
        fk_id_tipo_usuario: req.body.fk_id_tipo_usuario,
    }, {
        where: {
            id_gasto_usuario: req.body.id_gasto_usuario
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

function getGastosTipoUsuarioById(gastosTipoUsuario, catalogoSubGasto, gasto, req, res) {
    gastosTipoUsuario.findAll({
        where: {
            fk_id_tipo_usuario: req.params.id
        },
        include: [{
            model: gasto,
            include: [{
                model: catalogoSubGasto
            }]
        }]
    }).then((response) => {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el gasto"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar el gasto",
            error: err
        });
    });
}

function getAllGastosTipoUsuario(gastosTipoUsuario, req, res) {
    gastosTipoUsuario.findAll().then(function (response) {
        res.json(response);
    });
}