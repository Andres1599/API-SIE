const response = require('../response/response')
module.exports = (app, str) => {

    const liquidacion = app.get('liquidacion');
    const liquidacionFactura = app.get('liquidacion_factura');
    const moneda = app.get('moneda');
    const tipoCuenta = app.get('tipo_cuenta');
    const empresa = app.get('empresa');
    const user = app.get('usuario');
    const userData = app.get('usuario_datos');
    const factura = app.get('factura');
    const subgasto = app.get('subgasto');
    const tipoDocumento = app.get('tipo_documento');

    return {
        create: (req, res) => {
            newLiquidacion(liquidacion, req, res);
        },
        update: (req, res) => {
            updateLiquidacion(liquidacion, req, res);
        },
        updateId: (req, res) => {
            updateCorrelativo(req, res, liquidacion, str)
        },
        updateFecha: (req, res) => {
            updateFechaLiquidacion(req, res, str, liquidacion)
        },
        delete: (req, res) => {
            deleteLiquidation(req, res, liquidacion, str)
        },
        deleteItem: (req, res) => {
            deleteItemLiquidation(req, res, str, liquidacionFactura)
        },
        deleteItemFull: (req, res) => {
            deleteItemLiquidationFull(req, res, str, liquidacionFactura)
        },
        getByUsuarioNotClose: (req, res) => {
            getLiquidationByUsuarioNotClose(liquidacion, moneda, tipoCuenta, empresa, req, res, str)
        },
        getByUsuario: (req, res) => {
            getLiquidationByUsuario(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res, str)
        },
        getAll: (req, res) => {
            getAllLiquidacion(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res);
        },
        getById: (req, res) => {
            getLiquidacionById(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res, str)
        },
        close: (req, res) => {
            closeLiquidation(req, res, liquidacion, str)
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

function getLiquidationByUsuarioNotClose(liquidacion, moneda, tipoCuenta, empresa, req, res, str) {
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
                res.json(new response(true, str.get, null, liquidations));
            } else {
                res.json(new response(false, str.getErr, null, liquidations));
            }
        })
        .catch(error => {
            if (error) {
                res.json(new response(false, str.errCatch, error, null));
            }
        });
}

async function getLiquidationByUsuario(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res, str) {
    try {
        const liquidationUser = await liquidacion.findAll({
            where: { id_usuario: req.params.id },
            include: [
                moneda,
                empresa,
                tipoCuenta,
                {
                    model: liquidacionFactura,
                    include: [{
                        model: factura,
                        include: [tipoDocumento, subgasto]
                    }]
                },
                {
                    model: user,
                    include: [{
                        model: userData,
                        attributes: ['nombre', 'apellido', 'dpi']
                    }]
                }
            ],
            order: [['fecha', 'ASC']]
        })

        res.json(new response(true, str.get, null, liquidationUser));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function getMaxId(liquidacion, id) {
    try {
        const data = liquidacion.max('id_liquidacion', {
            where: {
                id_usuario: id
            }
        })

        if (data) {
            return data;
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
            id_liquidacion: (idMax * 1 + 1),
            fecha: new Date(),
            estado: false,
            cambio: 0
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

async function getLiquidacionById(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res, str) {
    try {
        const idLiquidation = req.params.id || 0;

        const liquidation = await liquidacion.findOne({
            where: { id: idLiquidation },
            include: [
                moneda,
                empresa,
                tipoCuenta,
                {
                    model: liquidacionFactura,
                    include: [{
                        model: factura,
                        include: [tipoDocumento, subgasto]
                    }]
                },
                {
                    model: user,
                    include: [{
                        model: userData,
                        attributes: ['nombre', 'apellido', 'dpi']
                    }]
                }
            ]
        })

        res.json(new response(true, str.get, null, liquidation))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function deleteLiquidation(req, res, liquidation, str) {
    try {
        const idLiquidation = req.params.id
        const deleted = await liquidation.destroy({
            where: {
                id: idLiquidation
            }
        })

        if (deleted) {
            res.json(new response(true, str.delete, null, deleted))
        } else {
            res.json(new response(false, str.deleteErr, null, deleted))
        }

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function deleteItemLiquidation(req, res, str, item_liquidation) {
    try {
        const id = req.params.id
        const deleted = await item_liquidation.destroy({
            where: {
                id_item: id
            }
        })

        if (deleted) {
            res.json(new response(true, str.delete, null, deleted))
        } else {
            res.json(new response(false, str.deleteErr, null, deleted))
        }
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function deleteItemLiquidationFull(req, res, str, item_liquidation) {
    try {
        const id = req.params.id
        const deleted = await item_liquidation.destroy({
            where: {
                id_liquidacion: id
            }
        })

        if (deleted) {
            res.json(new response(true, str.delete, null, deleted))
        } else {
            res.json(new response(false, str.deleteErr, null, deleted))
        }
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function closeLiquidation(req, res, liquidation, str) {
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
            res.json(new response(true, str.update, null, updated))
        } else {
            res.json(new response(false, str.updateErr, null, updated))
        }
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}

async function updateCorrelativo(req, res, liquidacion, str) {
    try {
        let pivote = 0
        const userId = req.body.id_usuario
        const liquidacionesUsuario = await liquidacion.findAll({
            attributes: ['id', 'id_liquidacion',],
            where: { id_usuario: userId },
            order: [['fecha', 'ASC']],
        }).map(value => {
            pivote += 1
            return {
                id: value.id,
                id_liquidacion: pivote
            }
        })

        let lista = [];
        liquidacionesUsuario.forEach(async (value) => {

            const data = await updateIdLiquidacion(liquidacion, value)
            lista.push(data)
        })

        res.json(new response(true, str.update, null, true));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
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

async function updateFechaLiquidacion(req, res, str, liquidacion) {
    try {

        const liquidationUpdate = await liquidacion.update(
            { fecha: req.body.fecha },
            { where: { id: req.body.id } }
        )

        res.json(new response(true, str.update, null, liquidationUpdate));

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null));
    }
}