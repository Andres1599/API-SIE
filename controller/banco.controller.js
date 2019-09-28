module.exports = function(app) {
    let bancos = app.get('banco');
    return {
        create: (req, res) => { newBanco(bancos, req, res); },
        update: (req, res) => { updateBanco(bancos, req, res); },
        delete: (req, res) => { deleteBanco(bancos, req, res); },
        getById: (req, res) => { getBancosById(bancos, req, res); },
        getAll: (req, res) => { getAllBancos(bancos, req, res); }
    }
}

function newBanco(bancos, req, res) {
    bancos.create({
        nombre_banco: req.body.nombre_banco,
        region_banco: req.body.region_banco
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo banco",
                created: false
            });
        }
    });
}

function deleteBanco(bancos, req, res) {
    bancos.findOne({
        where: {
            id_banco: req.body.id_banco
        }
    }).then(function(response) {
        if (response) {
            bancos.destroy({
                where: {
                    id_banco: req.body.id_banco
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el banco",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el banco",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el banco para eliminarlo"
            });
        }
    });
}

function updateBanco(bancos, req, res) {
    bancos.findOne({
        where: {
            id_banco: req.body.id_banco
        }
    }).then(function(response) {
        if (response) {
            response.updateAttributes({
                nombre_banco: req.body.nombre_banco,
                region_banco: req.body.region_banco
            }).then(function(update) {
                if (update) {
                    res.json(update);
                } else {
                    res.json({
                        message: "Error al actualizar el banco"
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar al banco"
            });
        }
    });
}

function getBancosById(bancos, req, res) {
    bancos.findOne({
        where: {
            id_banco: req.body.id_banco
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar al banco"
            });
        }
    });
}

function getAllBancos(bancos, req, res) {
    bancos.findAll().then(function(response) {
        res.json(response);
    });
}