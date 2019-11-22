module.exports = function(app) {
    let liquidacion = app.get('liquidacion');
    let liquidacionFactura = app.get('liquidacion_factura');
    return {
        create: (req, res) => { newLiquidacion(liquidacion, req, res); },
        update: (req, res) => { updateLiquidacion(liquidacion, req, res); },
        delete: (req, res) => { deleteLiquidacion(liquidacion, req, res); },
        getByUsuario: (req, res) => { getLiquidacionByUsuario(liquidacion, liquidacionFactura, req, res); },
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

function getLiquidacionByUsuario(liquidacion, liquidacionFactura, req, res) {
    liquidacion.findAll({
            where: {
                id_usuario: req.body.id_usuario
            },
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