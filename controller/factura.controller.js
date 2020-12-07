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
            deleteFactura(req, res, facturas, str)
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

async function getById(id, facturas) {
    try {
        bill = await facturas.findOne({ where: { id_factura: id } })
        if (bill) {
            return bill
        } else {
            return null
        }
    } catch (error) {
        res.json(new response(false, string.errCatch, error, null))
    }
}

async function deleteFactura(req, res, facturas, string) {
    try {
        const idBill = req.params.id
        const bill = await getById(idBill, facturas)
        if (bill != null) {
            const deleted = await facturas.destroy({ where: { id_factura: idBill } })
            if (deleted) {
                res.json(new response(true, string.delete, null, bill))
            } else {
                res.json(new response(false, string.deleteErr, null, bill))
            }
        } else {
            res.json(new response(false, string.deleteErr, null, bill))
        }
    } catch (error) {
        res.json(new response(false, string.errCatch, error, null))
    }
}

function updateFactura(req, res, str, facturas) {
    facturas.update({
        fecha_compra: req.body.fecha_compra,
        correlativo_factura: req.body.correlativo_factura,
        proveedor_factura: req.body.proveedor_factura,
        total_factura: req.body.total_factura,
        total_siva: req.body.total_siva,
        iva_factura: req.body.iva_factura,
        total_idp_factura: req.body.total_idp_factura,
        total_sidp_factura: req.body.total_sidp_factura,
        total_inguat_factura: req.body.total_inguat_factura,
        galones_factura: req.body.galones_factura,
        exceso_factura: req.body.exceso_factura,
        status: req.body.status,
        fk_id_usuario: req.body.fk_id_usuario,
        fk_id_tipo_documento: req.body.fk_id_tipo_documento,
        fk_id_subgasto: req.body.fk_id_subgasto
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
            fecha_compra: { [Op.between]: [req.body.start, req.body.end] },
            status: false
        },
        include: [moneda, tipoDocumento, gasto]
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