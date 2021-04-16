module.exports = (app, str) => {
    const Factura = app.get('factura')
    const moneda = app.get('moneda')
    const tipoDocumento = app.get('tipo_documento')
    const gasto = app.get('subgasto')
    const op = app.get('op')
    const response = require('../response/response')
    return {
        create: (req, res) => { newFactura(Factura, req, res) },
        bulkCreate: (req, res) => { bulkCreateFactura(req, res, str, response, Factura) },
        update: (req, res) => { updateFactura(req, res, str, response, Factura) },
        delete: (req, res) => { deleteFactura(req, res, str, response, Factura) },
        getByIdUser: (req, res) => { getAllByUsuario(Factura, moneda, tipoDocumento, gasto, req, res) },
        getByDate: (req, res) => { getAllFacturaPerDates(req, res, str, response, Factura, Moneda, tipoDocumento, gasto, op) }
    }
}

function newFactura(Factura, req, res) {
    Factura.create({
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

async function bulkCreateFactura(req, res, str, response, Factura) {
    try {

        const arrayFactura = req.body.data
        const newFactura = await Factura.bulkCreate(arrayFactura)

        res.json(new response(true, str.create, null, newFactura))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteFactura(req, res, str, response, Factura) {
    try {
        const idBill = req.params.id
        const deletedFactura = await Factura.destroy({ where: { id_factura: idBill } })
        res.json(new response(true, str.delete, null, deletedFactura))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateFactura(req, res, str, response, Factura) {
    try {
        const updateFactua = await Factura.update({
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
        })

        res.json(new response(true, str.update, null, updateFactua))

    } catch (error) {
        res.json(new response(false, str.errCatch, err, null))
    }
}

function getAllByUsuario(Factura, moneda, tipoDocumento, gasto, req, res) {
    Factura.findAll({
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
                message: 'No hay Factura asociadas a ese usuario'
            })
        }
    }).catch(err => {
        res.json({
            message: 'Error al buscar las Factura',
            err
        })
    })
}

async function getAllFacturaPerDates(req, res, str, response, Factura, Moneda, tipoDocumento, gasto, sequelize) {
    try {
        const Op = sequelize.Op
        const facturas = await Factura.findAll({
            where: {
                fk_id_usuario: req.body.id_usuario,
                fk_id_moneda: req.body.fk_id_moneda,
                fecha_compra: { [Op.between]: [req.body.start, req.body.end] },
                status: false
            },
            include: [Moneda, tipoDocumento, gasto]
        })

        res.json(new response(true, str.getAll, null, facturas))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}