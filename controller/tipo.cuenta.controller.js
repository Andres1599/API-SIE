module.exports = function(app) {
    let tipoCuentas = app.get('tipo_cuenta');
    return {
        create: (req, res) => { newTipoCuentas(tipoCuentas, req, res); },
        update: (req, res) => { updateTipoCuentas(tipoCuentas, req, res); },
        delete: (req, res) => { deleteTipoCuentas(tipoCuentas, req, res); },
        getById: (req, res) => { getTipoCuentasById(tipoCuentas, req, res); },
        getAll: (req, res) => { getAllTipoCuentas(tipoCuentas, req, res); }
    }
}

function newTipoCuentas(tipoCuentas, req, res) {
    tipoCuentas.create({
        nombre_cuenta: req.body.nombre_cuenta,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo tipo de cuenta",
                created: false
            });
        }
    });
}

function deleteTipoCuentas(tipoCuentas, req, res) {
    tipoCuentas.findOne({
        where: {
            id_tipo_cuenta: req.params.id_tipo_cuenta
        }
    }).then(function(response) {
        if (response) {
            tipoCuentas.destroy({
                where: {
                    id_tipo_cuenta: req.params.id_tipo_cuenta
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el tipo de cuenta",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el tipo de cuenta",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el tipo de cuenta para eliminarlo"
            });
        }
    });
}

function updateTipoCuentas(tipoCuentas, req, res) {
    tipoCuentas.update({
        nombre_cuenta: req.body.nombre_cuenta,
    }, {
        where: {
            id_tipo_cuenta: req.body.id_tipo_cuenta
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

function getTipoCuentasById(tipoCuentas, req, res) {
    tipoCuentas.findOne({
        where: {
            id_tipo_cuenta: req.params.id_tipo_cuenta
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el tipo de cuenta"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el tipo de cuenta",
            error: err
        });
    });
}

function getAllTipoCuentas(tipoCuentas, req, res) {
    tipoCuentas.findAll().then(function(response) {
        res.json(response);
    });
}