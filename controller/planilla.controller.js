module.exports = function(app) {
    let planilla = app.get('planilla');
    return {
        create: (req, res) => { newPlanilla(planilla, req, res); },
        delete: (req, res) => { deletePlanilla(planilla, req, res); },
        getById: (req, res) => { getPlanillaId(planilla, req, res); },
        getAll: (req, res) => { getAll(planilla, req, res); }
    }
}

function newPlanilla(planilla, req, res) {
    let data = {
        fecha_emision_planilla: req.body.fecha_emision,
        fecha_creacion_planilla: new Date(),
        periodo_fiscal_planilla: req.body.periodo,
        periodo_pago_planilla: req.body.pago,
        tipo_planilla: req.body.tipo_planilla,
        fk_id_empresa: req.body.empresa,
        fk_id_moneda: req.body.moneda,
        fk_id_pais: req.body.pais
    };

    planilla.create(data).then(response => {
        if (response) {
            res.json({
                message: 'Planilla agregada',
                created: true
            });
        } else {
            res.json({
                message: 'Planilla denegada',
                created: false
            });
        }
    }).catch(err => {
        if (err) {
            res.json({
                message: 'Error al crear una nueva planilla',
                error: err
            });
        }
    })
}