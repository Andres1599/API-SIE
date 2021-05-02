const response = require('../response/response')

module.exports = (app, str) => {

    const PeriodoVacaciones = app.get('periodos_vacaciones');
    const DiasVacaciones = app.get('dias_vacaciones');

    return {
        create: (req, res) => { createDiasVacaciones(req, res, str, PeriodoVacaciones, DiasVacaciones) },
        delete: (req, res) => { deleteDiasVacaciones(req, res, str, PeriodoVacaciones, DiasVacaciones) },
    }
}

async function createDiasVacaciones(req, res, str, PeriodoVacaciones, DiasVacaciones) {
    try {
        const periodo = await PeriodoVacaciones.findOne({
            where: {
                id: req.body.fk_id_periodo
            }
        })

        if (!periodo) {
            res.json(new response(false, str.creatErr, null, null))
        }

        const dias = (periodo.dias_disponibles - (req.body.dias_consumidos * 1))

        const updatePeriodo = await PeriodoVacaciones.update({
            dias_disponibles: dias
        }, {
            where: {
                id: req.body.fk_id_periodo
            }
        })

        const newDiasVacaciones = await DiasVacaciones.create({
            del: req.body.del,
            al: req.body.al,
            fecha_retorno: req.body.fecha_retorno,
            dias_consumidos: req.body.dias_consumidos,
            fk_id_periodo: req.body.fk_id_periodo
        })

        res.json(new response(true, str.create, null, newDiasVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteDiasVacaciones(req, res, str, PeriodoVacaciones, DiasVacaciones) {
    try {

        const idPeriodo = req.params.periodo
        const idDias = req.params.dias
        const total = req.body.total

        const periodo = await PeriodoVacaciones.findOne({
            where: {
                id: idPeriodo
            }
        })

        const diasActuales = await DiasVacaciones.findOne({
            where: {
                id: idDias
            }
        })

        if (!periodo && !diasActuales) {
            res.json(new response(false, str.deleteErr, null, null))
        }

        const dias = (periodo.dias_disponibles + diasActuales.dias_consumidos)

        const updatePeriodo = await PeriodoVacaciones.update({
            dias_disponibles: dias
        }, {
            where: {
                id: idPeriodo
            }
        })

        const deleteDiasVacaciones = await DiasVacaciones.destroy({
            where: {
                id: idDias
            }
        })

        res.json(new response(true, str.delete, null, deleteDiasVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}