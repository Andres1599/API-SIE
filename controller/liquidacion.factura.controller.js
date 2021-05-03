module.exports = (app, str) => {

    const liquidacionFactura = app.get('liquidacion_factura');
    const factura = app.get('factura');

    return {
        create: (req, res) => { newLiquidacionFactura(liquidacionFactura, req, res, factura); },
        delete: (req, res) => { deleteLiquidacionFactura(liquidacionFactura, req, res); }
    }

}

async function newLiquidacionFactura(liquidacionFactura, req, res, factura) {
    try {

        const facturaUpdate = await factura.update({ status: true }, { where: { id_factura: req.body.id_factura } })

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
