module.exports = function(app) {
    let facturas = app.get('facturas');
    return {
        create: (req, res) => { newFactura(facturas, req, res); },
        update: (req, res) => { updateFactura(facturas, req, res); },
        delete: (req, res) => { deleteFactura(facturas, req, res); },
        getById: (req, res) => { getFacturasById(facturas, req, res); },
        getAll: (req, res) => { getAllFacturas(facturas, req, res); }
    }
}

function newFactura(facturas, req, res) {
    facturas.create({
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
    }).then(function(response) {
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
    }).then(function(response) {
        if (response) {
            facturas.destroy({
                where: {
                    id_factura: req.body.id_factura
                }
            }).then(function(deleted) {
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

function updateFactura(facturas, req, res) {
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
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getFacturasById(facturas, req, res) {
    facturas.findOne({
        where: {
            id_factura: req.params.id_factura
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar al factura"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar al factura",
            error: err
        });
    });
}

function getAllFacturas(facturas, req, res) {
    facturas.findAll().then(function(response) {
        res.json(response);
    });
}