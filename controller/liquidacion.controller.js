module.exports = function (app) {
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
        delete: (req, res) => {
            deleteLiquidacion(liquidacion, req, res);
        },
        getByUsuario: (req, res) => {
            getLiquidationByUsuario(liquidacion, moneda, tipoCuenta, empresa, req, res);
        },
        getAll: (req, res) => {
            getAllLiquidacion(user, userData, liquidacion, liquidacionFactura, moneda, tipoCuenta, empresa, factura, subgasto, tipoDocumento, req, res);
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

function getLiquidationByUsuario(liquidacion, moneda, tipoCuenta, empresa, req, res) {
    liquidacion.findAll({
            where: {
                id_usuario: req.params.id
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
        .then(response => {
            if (response) {
                res.json(response);
            } else {
                res.json({
                    message: 'Error',
                    error: response
                });
            }
        })
        .catch(error => {
            if (error) {
                res.json({
                    message: 'Error al obtener la liquidacion',
                    error
                });
            }
        });
}

function newLiquidacion(liquidacion, req, res) {
    try {
        liquidacion.create({
            id_usuario: req.body.id_usuario,
            id_empresa: req.body.id_empresa,
            id_moneda: req.body.id_moneda,
            id_tipo_liquidacion: req.body.id_tipo_liquidacion,
            id_liquidacion: 0,
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