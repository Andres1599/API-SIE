module.exports = function(app) {
    let moneda = app.get('moneda');
    let sequelize = app.get('sequelize');
    return {
        create: function(req, res) {
            CreateMoneda(moneda, req, res);
        },
        update: function(req, res) {
            UpdateMoneda(moneda, req, res);
        },
        delete: function(req, res) {
            DeleteMoneda(moneda, req, res);
        },
        get: function(req, res) {
            GetMonedas(moneda, req, res);
        },
        getIso: function(req, res) {

            GetIso(sequelize, req, res);
        },
        updateImpuesto: function(req, res) {
            updateMonedaImpuesto(moneda, req, res);
        },
        getByIso: function(req, res) {
            getMonedasByIso(moneda, req, res);
        }
    }
};

function CreateMoneda(moneda, req, res) {
    moneda.create({
        tipo_moneda: req.body.tipo_moneda,
        cmb_dolar: req.body.impuesto,
        simbolo: req.body.simbolo
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear el nuevo tipo de moneda",
                created: false
            });
        }
    });
}

function GetMonedas(moneda, req, res) {
    moneda.findAll().then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al obtener las monedas"
            });
        }
    });
}

function UpdateMoneda(moneda, req, res) {
    moneda.update({
        tipo_moneda: req.body.tipo_moneda,
        cmb_dolar: req.body.impuesto,
        simbolo: req.body.simbolo
    }, {
        where: {
            id_moneda: req.body.id_moneda
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al realizar la peticion',
            error: err
        });
    });
}

function DeleteMoneda(moneda, req, res) {
    moneda.destroy({
        where: {
            id_moneda: req.body.id_moneda
        }
    }).then(function(deleted) {
        if (deleted === 1) {
            res.json({
                message: "Moneda eliminda exitosamente",
                deleted: true
            });
        } else {
            res.json({
                message: "Error al eliminar la moneda",
                delete: false
            });
        }
    }).catch(function(err) {
        res.json({
            message: 'Error al realizar la peticion',
            error: err
        });
    });
}

function GetIso(sequelize, req, res) {
    sequelize.query("SELECT DISTINCT simbolo FROM `monedas` WHERE simbolo != 'USD'").then((response) => {
        if (response) {
            res.json(response[0]);
        }
    }).catch((err) => {
        res.status(402).send({
            message: "Error al obtener la petición",
            err: err
        });
    });
}

function updateMonedaImpuesto(moneda, req, res) {
    moneda.update({
        cmb_dolar: req.body.impuesto
    }, {
        where: {
            id_moneda: req.body.id_moneda
        }
    }).then((update) => {
        res.json({
            message: "Se ha actualizado el impuesto",
            update
        });
    }).catch((err) => {
        res.status(402).send({
            message: "Error al actualizar el impuesto de la moneda",
            err: err
        });
    });
}

function getMonedasByIso(moneda, req, res) {
    moneda.findAll({
        where: {
            simbolo: req.params.simbolo
        },
        attributes: ['id_moneda']
    }).then((response) => {
        if (response) {
            res.json(response);
        }
    }).catch((err) => {
        res.status(402).send({
            message: "Error al obtener las monedas",
            error: err
        })
    })
}