const response = require('../response/response')
module.exports = (app, str) => {
    const facturas = app.get('factura');
    const moneda = app.get('moneda');
    const tipoDocumento = app.get('tipo_documento');
    const gasto = app.get('subgasto');
    const op = app.get('op')
    return {
        create: (req, res) => {
            newFactura(facturas, req, res);
        },
        update: (req, res) => {
            updateFactura(req, res, str, facturas);
        },
        delete: (req, res) => {
            deleteFactura(facturas, req, res);
        },
        getById: (req, res) => {
            getFacturasById(facturas, req, res);
        },
        getAll: (req, res) => {
            getAllFacturas(facturas, req, res);
        },
        getByIdUser: (req, res) => {
            getAllByUsuario(facturas, moneda, tipoDocumento, gasto, req, res);
        },
        getByDate: (req, res) => {
            getAllFacturasPerDates(facturas, moneda, tipoDocumento, gasto, req, res, op);
        }
    }
}

function newFactura(facturas, req, res) {
    facturas.create({
        fecha_compra: req.body.fecha_compra,
        correlativo_factura: req.body.correlativo_factura,
        proveedor_factura: req.body.proveedor_factura,
        ordenes_trabajo: req.body.ordenes_trabajo,
        total_factura: req.body.total_factura,
        total_idp_factura: req.body.total_idp_factura,
        total_sidp_factura: req.body.total_sidp_factura,
        iva_factura: req.body.iva_factura,
        total_siva: req.body.total_siva,
        total_inguat_factura: 0,
        galones_factura: req.body.galones_factura,
        exceso_factura: req.body.exceso_factura,
        status: false,
        fk_id_usuario: req.body.fk_id_usuario,
        fk_id_tipo_documento: req.body.fk_id_tipo_documento,
        fecha_registro_factura: new Date(),
        fk_id_moneda: req.body.fk_id_moneda,
        fk_id_subgasto: req.body.fk_id_subgasto
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva factura",
                created: false
            });
        }
    });
}

function deleteFactura(facturas, req, res) {
    facturas.findOne({
        where: {
            id_factura: req.body.id_factura
        }
    }).then(function (response) {
        if (response) {
            facturas.destroy({
                where: {
                    id_factura: req.body.id_factura
                }
            }).then(function (deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la factura",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la factura",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el factura para eliminarlo"
            });
        }
    });
}

function updateFactura(req, res, str, facturas) {
    facturas.update({
        fecha_compra: req.body.fecha_compra,
        correlativo_factura: req.body.correlativo_factura,
        proveedor_factura: req.body.proveedor_factura,
        total_factura: req.body.total_factura,
        total_idp_factura: req.body.total_idp_factura,
        total_sidp_factura: req.body.total_sidp_factura,
        total_inguat_factura: req.body.total_inguat_factura,
        galones_factura: req.body.galones_factura,
        exceso_factura: req.body.exceso_factura,
        status: req.body.status,
        fk_id_usuario: req.body.fk_id_usuario,
        fk_id_tipo_documento: req.body.fk_id_tipo_documento,
    }, {
        where: {
            id_factura: req.body.id_factura
        }
    }).then((updated) => {
        if (updated) {
            res.json(new response(true, str.update, null, updated))
        } else {
            res.json(new response(false, str.updateErr, null, updated))
        }
        res.json(updated)
    }).catch(function (err) {
        res.json(new response(false, str.errCatch, err, null))
    })
}

function getFacturasById(facturas, req, res) {
    facturas.findOne({
        where: {
            id_factura: req.params.id_factura
        }
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar al factura"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar al factura",
            error: err
        });
    });
}

function getAllFacturas(facturas, req, res) {
    facturas.findAll().then(function (response) {
        res.json(response);
    });
}

function getAllByUsuario(facturas, moneda, tipoDocumento, gasto, req, res) {
    facturas.findAll({
        where: {
            fk_id_usuario: req.body.id_usuario
        },
        include: [{
                model: moneda
            },
            {
                model: tipoDocumento
            },
            {
                model: gasto
            },
        ]
    }).then(value => {
        if (value) {
            res.json(value)
        } else {
            res.json({
                find: false,
                message: 'No hay facturas asociadas a ese usuario'
            })
        }
    }).catch(err => {
        res.json({
            message: 'Error al buscar las facturas',
            err
        })
    })
}

function getAllFacturasPerDates(facturas, moneda, tipoDocumento, gasto, req, res, sequelize) {
    const Op = sequelize.Op
    facturas.findAll({
        where: {
            fk_id_usuario: req.body.id_usuario,
            fk_id_moneda: req.body.fk_id_moneda,
            fecha_compra: {[Op.between]: [req.body.start, req.body.end]},
        },
        include: [{
                model: moneda
            },
            {
                model: tipoDocumento
            },
            {
                model: gasto
            },
        ]
    }).then(value => {
        if (value) {
            res.json(value)
        } else {
            res.json({
                find: false,
                message: 'No hay facturas asociadas a ese usuario'
            })
        }
    }).catch(err => {
        console.error(err);
        res.json({
            message: 'Error al buscar las facturas',
            err
        })
    })
}