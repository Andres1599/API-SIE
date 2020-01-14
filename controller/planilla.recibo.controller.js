module.exports = function(app) {
    let planillaRecibo = app.get('planilla_recibo');
    return {
        create: (req, res) => { newPlanillaRecibo(planillaRecibo, req, res); },
        update: (req, res) => { updatePlanillaRecibo(planillaRecibo, req, res); },
        delete: (req, res) => { deletePlanillaRecibo(planillaRecibo, req, res); },
        getById: (req, res) => { getPlanillaReciboById(planillaRecibo, req, res); },
        getAll: (req, res) => { getAllPlanillaRecibo(planillaRecibo, req, res); }
    }
}

function newPlanillaRecibo(planillaRecibo, req, res) {
    planillaRecibo.create({
        num_afili_planilla: req.body.num_afili_planilla,
        salario_planilla: req.body.salario_planilla,
        pago_adicional: req.body.pago_adicional,
        pago_vacacione: req.body.pago_vacacione,
        horas: req.body.horas,
        dias_remu: req.body.dias_remu,
        dias_vacaciones: req.body.dias_vacaciones,
        cod: req.body.cod,
        aporte_labora: req.body.aporte_labora,
        aporte_patronal: req.body.aporte_patronal,
        aporte_total: req.body.aporte_total,
        prestamo: req.body.prestamo,
        anticipo: req.body.anticipo,
        fk_id_planilla: req.body.fk_id_planilla,
        fk_id_usuario: req.body.fk_id_usuario,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear una nueva planilla",
                created: false
            });
        }
    });
}

function deletePlanillaRecibo(planillaRecibo, req, res) {
    planillaRecibo.findOne({
        where: {
            id_recibo_planilla: req.body.id_recibo_planilla
        }
    }).then(function(response) {
        if (response) {
            planillaRecibo.destroy({
                where: {
                    id_recibo_planilla: req.body.id_recibo_planilla
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito la planilla",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar la planilla",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar la planilla para eliminarlo"
            });
        }
    });
}

function updatePlanillaRecibo(planillaRecibo, req, res) {
    planillaRecibo.update({
        num_afili_planilla: req.body.num_afili_planilla,
        salario_planilla: req.body.salario_planilla,
        pago_adicional: req.body.pago_adicional,
        pago_vacacione: req.body.pago_vacacione,
        horas: req.body.horas,
        dias_remu: req.body.dias_remu,
        dias_vacaciones: req.body.dias_vacaciones,
        cod: req.body.cod,
        aporte_labora: req.body.aporte_labora,
        aporte_patronal: req.body.aporte_patronal,
        aporte_total: req.body.aporte_total,
        prestamo: req.body.prestamo,
        anticipo: req.body.anticipo,
        fk_id_planilla: req.body.fk_id_planilla,
        fk_id_usuario: req.body.fk_id_usuario,
    }, {
        where: {
            id_recibo_planilla: req.body.id_recibo_planilla
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getPlanillaReciboById(planillaRecibo, req, res) {
    planillaRecibo.findOne({
        where: {
            id_recibo_planilla: req.params.id_recibo_planilla
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar la planilla"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar la planilla",
            error: err
        });
    });
}

function getAllPlanillaRecibo(planillaRecibo, req, res) {
    planillaRecibo.findAll().then(function(response) {
        res.json(response);
    });
}