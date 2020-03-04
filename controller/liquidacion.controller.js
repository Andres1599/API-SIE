module.exports = function(app) {
    let liquidacion = app.get('liquidacion');
    let liquidacionFactura = app.get('liquidacion_factura');
    let moneda = app.get('moneda');
    let tipoCuenta = app.get('tipo_cuenta');
    return {
        create: (req, res) => { newLiquidacion(liquidacion, req, res); },
        update: (req, res) => { updateLiquidacion(liquidacion, req, res); },
        delete: (req, res) => { deleteLiquidacion(liquidacion, req, res); },
        getByUsuario: (req, res) => { getLiquidacionByUsuario(liquidacion, liquidacionFactura, moneda, tipoCuenta, req, res); },
        getAll: (req, res) => { getAllLiquidacion(liquidacion, liquidacionFactura, req, res); }
    }
}

function getAllLiquidacion(liquidacion, liquidacionFactura, req, res) {
    liquidacion.findAll({
            include: [
                { model: liquidacionFactura }
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

function getLiquidacionByUsuario(liquidacion, liquidacionFactura, moneda, tipoCuenta, req, res) {
    liquidacion.findAll({
            where: {
                id_usuario: req.body.id_usuario
            },
            include: [
                { model: liquidacionFactura },
                { model: moneda },
                { model: tipoCuenta}
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
        }).then( response => {
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