const response = require('../response/response')
module.exports = (app, str) => {

    const liquidacionFactura = app.get('liquidacion_factura');
    const factura = app.get('factura');

    return {
        create: (req, res) => { newLiquidacionFactura(req, res, str, liquidacionFactura, factura) },
        delete: (req, res) => { deleteLiquidacionFactura(liquidacionFactura, req, res); }
    }

}

async function newLiquidacionFactura(req, res, str, liquidacionFactura, factura) {
    try {

        const facturaUpdate = await factura.update({ status: true }, { where: { id_factura: req.body.id_factura } })

        const item = await liquidacionFactura.create({
            id_liquidacion: req.body.id_liquidacion,
            id_factura: req.body.id_factura,
        })

        res.json(new response(true, str.create, null, item))

    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, error, null))
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
