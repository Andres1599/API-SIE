module.exports = function(app) {
    let empresaMonedas = app.get('empresa_moneda');
    return {
        create: (req, res) => { newEmpresaMoneda(empresaMonedas, req, res); },
        update: (req, res) => { updateEmpresaMoneda(empresaMonedas, req, res); },
        delete: (req, res) => { deleteEmpresaMoneda(empresaMonedas, req, res); },
        getById: (req, res) => { getEmpresaMonedasById(empresaMonedas, req, res); },
        getAll: (req, res) => { getAllEmpresaMonedas(empresaMonedas, req, res); }
    }
}

function newEmpresaMoneda(empresaMonedas, req, res) {
    empresaMonedas.create({
        fk_id_empresa: req.body.id_empresa,
        fk_id_moneda: req.body.id_moneda,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva empresaMoneda",
                created: false
            });
        }
    });
}

function deleteEmpresaMoneda(empresaMonedas, req, res) {
    empresaMonedas.findOne({
        where: {
            id_empresa_moneda: req.body.id_empresa_moneda
        }
    }).then(function(response) {
        if (response) {
            empresaMonedas.destroy({
                where: {
                    id_empresa_moneda: req.body.id_empresa_moneda
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la empresaMoneda",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la empresaMoneda",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el empresaMoneda para eliminarlo"
            });
        }
    });
}

function updateEmpresaMoneda(empresaMonedas, req, res) {
    empresaMonedas.update({
        fk_id_usuario: req.body.id_usuario,
    }, {
        where: {
            id_empresaMoneda: req.body.id_empresaMoneda
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

function getEmpresaMonedasById(empresaMonedas, req, res) {
    empresaMonedas.findOne({
        where: {
            id_empresaMoneda: req.params.id_empresaMoneda
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar al empresaMoneda"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar al empresaMoneda",
            error: err
        });
    });
}

function getAllEmpresaMonedas(empresaMonedas, req, res) {
    empresaMonedas.findAll().then(function(response) {
        res.json(response);
    });
}