module.exports = function (app) {

    const liquidacionFactura = app.get('liquidacion_factura');
    const factura = app.get('factura');

    return {
        create: (req, res) => { newLiquidacionFactura(liquidacionFactura, req, res); },
        update: (req, res) => { updateLiquidacionFactura(liquidacionFactura, req, res); },
        delete: (req, res) => { deleteLiquidacionFactura(liquidacionFactura, req, res); },
        getById: (req, res) => { getLiquidacionFacturaById(liquidacionFactura, req, res); },
        getAll: (req, res) => { getAllLiquidacionFactura(liquidacionFactura, req, res); }
    }
}

async function newLiquidacionFactura(liquidacionFactura, req, res, factura) {
    try {
        const facturaUpdate = await factura.update({ status: true }, { id_factura: req.body.id_factura })

        const item = await liquidacionFactura.create({
            id_liquidacion: req.body.id_liquidacion,
            id_factura: req.body.id_factura,
        })

        res.json(item);

    } catch (error) {
        res.json({
            message: "Error al crear una nueva liquidacion",
            created: false
        });
    }
}

function deleteLiquidacionFactura(liquidacionFactura, req, res) {
    liquidacionFactura.findOne({
        where: {
            id_item: req.body.id_item
        }
    }).then(function (response) {
        if (response) {
            liquidacionFactura.destroy({
                where: {
                    id_item: req.body.id_item
                }
            }).then(function (deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la liquidacion",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la liquidacion",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el gasto para eliminarlo"
            });
        }
    });
}

function updateLiquidacionFactura(liquidacionFactura, req, res) {
    liquidacionFactura.update({
        id_liquidacion: req.body.id_liquidacion,
        id_factura: req.body.id_factura,
    }, {
        where: {
            id_item: req.body.id_item
        }
    }).then(function (update) {
        res.json(update);
    }).catch(function (err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getLiquidacionFacturaById(liquidacionFactura, req, res) {
    liquidacionFactura.findOne({
        where: {
            id_item: req.params.id_item
        }
    }).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la liquidacion"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar la liquidacion",
            error: err
        });
    });
}

function getAllLiquidacionFactura(liquidacionFactura, req, res) {
    liquidacionFactura.findAll().then(function (response) {
        res.json(response);
    });
}