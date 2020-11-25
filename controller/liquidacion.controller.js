const response = require('../response/response')
module.exports = function (app, string) {
    let liquidacion = app.get('liquidacion');
    let liquidacionFactura = app.get('liquidacion_factura');
    let moneda = app.get('moneda');
    let tipoCuenta = app.get('tipo_cuenta');
    let empresa = app.get('empresa');
    let user = app.get('usuario');
    let userData = app.get('usuario_datos');
    let factura = app.get('factura');
    let subgasto = app.get('subgasto');
    let tipoDocumento = app.get('tipo_documento');

    return {
        create: (req, res) => {
            newLiquidacion(liquidacion, req, res);
        },
        update: (req, res) => {
            updateLiquidacion(liquidacion, req, res);
        },
        updateId: (req, res) => {
            updateCorrelativo(req, res, liquidacion, string)
        },
        delete: (req, res) => {
            deleteLiquidation(req, res, liquidacion, string)
        },
        deleteItem: (req, res) => {
            deleteItemLiquidation(req, res, string, liquidacionFactura)
        },
        deleteItemFull: (req, res) => {
            deleteItemLiquidationFull(req, res, string, liquidacionFactura)
        },
        getByUsuarioNotClose: (req, res) => {
            getLiquidationByUsuarioNotClose(liquidacion, moneda, tipoCuenta, empresa, req, res, string)
        },
        getAll: (req, res) => {
            getAllLiquidacion(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res);
        },
        getById: (req, res) => {
            getLiquidacionById(user, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res, string)
        },
        close: (req, res) => {
            closeLiquidation(req, res, liquidacion, string)
        }
    }
}

function getAllLiquidacion(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res) {
    user.findAll({
        attributes: ['id_usuario', 'email'],
        include: [{
            model: userData,
            attributes: ['nombre', 'apellido']
        },
        {
            model: liquidacion,
            attributes: ['id', 'id_liquidacion', 'fecha', 'fecha_cierra', 'estado'],
            include: [{
                model: moneda
            },
            {
                model: empresa
            },
            {
                model: tipoCuenta
            },
            {
                model: user,
                include: [{
                    model: userData,
                    attributes: ['nombre', 'apellido', 'dpi']
                }]
            },
            {
                model: liquidacionFactura,
                attributes: ['id_item'],
                include: [{
                    model: factura,
                    attributes: ["id_factura", "fecha_compra", "correlativo_factura", "proveedor_factura", "ordenes_trabajo", "total_factura", "iva_factura", "total_siva", "total_idp_factura", "total_sidp_factura", "total_inguat_factura", "galones_factura", "exceso_factura", "status", "fecha_registro_factura"],
                    include: [tipoDocumento, subgasto]
                }]
            }
            ]
        }
        ]
    }).then(response => {
        res.json(response);
    }).catch(error => {
        if (error) {
            res.json({
                message: 'Error al obtener las liquidaciones.',
                error
            })
        }
    })
}

function getLiquidationByUsuarioNotClose(liquidacion, moneda, tipoCuenta, empresa, req, res, string) {
    liquidacion.findAll({
        where: {
            id_usuario: req.params.id,
            estado: false
        },
        include: [{
            model: moneda
        },
        {
            model: tipoCuenta
        },
        {
            model: empresa
        },
        ]
    })
        .then(liquidations => {
            if (liquidations) {
                res.json(new response(true, string.get, null, liquidations));
            } else {
                res.json(new response(false, string.getErr, null, liquidations));
            }
        })
        .catch(error => {
            if (error) {
                res.json(new response(false, string.errCatch, error, null));
            }
        });
}

async function getMaxId(liquidacion, id) {
    try {
        const data = liquidacion.max('id_liquidacion', {
            where: {
                id_usuario: id
            }
        })

        if (data) {
            return data + 1;
        } else {
            return 1
        }
    } catch (error) {
        return null
    }
}

async function newLiquidacion(liquidacion, req, res) {
    try {

        const idMax = await getMaxId(liquidacion, req.body.id_usuario)

        liquidacion.create({
            id_usuario: req.body.id_usuario,
            id_empresa: req.body.id_empresa,
            id_moneda: req.body.id_moneda,
            id_tipo_liquidacion: req.body.id_tipo_liquidacion,
            id_liquidacion: idMax,
            fecha: new Date(),
            estado: false
        }).then(response => {
            if (response) {
                res.json(response);
            } else {
                res.json({
                    create: false
                });
            }
        });
    } catch (error) {
        res.json(error);
    }
}

function getLiquidacionById(user, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res, string) {
    const idLiquidation = req.params.id || 0;
    user.findAll({
        attributes: ['id_usuario'],
        include: [{
            model: liquidacion,
            where: {
                id: idLiquidation
            },
            attributes: ['id', 'id_liquidacion', 'fecha', 'fecha_cierra', 'estado'],
            include: [{
                model: moneda
            },
            {
                model: empresa
            },
            {
                model: tipoCuenta
            }, {
                model: liquidacionFactura,
                attributes: ['id_item'],
                include: [{
                    model: factura,
                    include: [tipoDocumento, subgasto]
                }]
            }
            ]
        }]
    }).then(liquidation => {
        if (liquidation) {
            res.json(new response(true, string.get, null, liquidation[0].liquidacions[0]));
        } else {
            res.json(new response(false, string.getErr, null, liquidation));
        }
    }).catch(error => {
        res.json(new response(false, string.errCatch, error, null));
    })
}

async function deleteLiquidation(req, res, liquidation, string) {
    try {
        const idLiquidation = req.params.id
        const deleted = await liquidation.destroy({
            where: {
                id: idLiquidation
            }
        })

        if (deleted) {
            res.json(new response(true, string.delete, null, deleted))
        } else {
            res.json(new response(false, string.deleteErr, null, deleted))
        }

    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function deleteItemLiquidation(req, res, string, item_liquidation) {
    try {
        const id = req.params.id
        const deleted = await item_liquidation.destroy({
            where: {
                id_item: id
            }
        })

        if (deleted) {
            res.json(new response(true, string.delete, null, deleted))
        } else {
            res.json(new response(false, string.deleteErr, null, deleted))
        }
    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function deleteItemLiquidationFull(req, res, string, item_liquidation) {
    try {
        const id = req.params.id
        const deleted = await item_liquidation.destroy({
            where: {
                id_liquidacion: id
            }
        })

        if (deleted) {
            res.json(new response(true, string.delete, null, deleted))
        } else {
            res.json(new response(false, string.deleteErr, null, deleted))
        }
    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function closeLiquidation(req, res, liquidation, string) {
    try {
        const currentDay = new Date()
        const idLiquidation = req.body.id
        const updated = await liquidation.update({
            estado: true,
            fecha_cierra: currentDay
        }, {
            where: {
                id: idLiquidation
            }
        })

        if (updated) {
            res.json(new response(true, string.update, null, updated))
        } else {
            res.json(new response(false, string.updateErr, null, updated))
        }
    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function updateCorrelativo(req, res, liquidacion, string) {
    try {
        let pivote = 0
        const userId = req.body.id_usuario
        const liquidacionesUsuario = await liquidacion.findAll({
            attributes: ['id', 'id_liquidacion',],
            where: { id_usuario: userId },
        }).map(value => {
            pivote += 1
            return {
                id: value.id,
                id_liquidacion: pivote
            }
        })

        let lista = [];
        liquidacionesUsuario.forEach( async (value) => {
            
            const data  = await updateIdLiquidacion(liquidacion, value)
            lista.push(data)
        })

        res.json(new response(true, string.update, null, true));

    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function updateIdLiquidacion(liquidation, value) {
    try {
        const data = await liquidation.update({
            id_liquidacion: value.id_liquidacion,
        }, { where: { id: value.id } })
        return data
    } catch (error) {
        return null
    }
}