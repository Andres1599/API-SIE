const response = require('../response/response')

module.exports = (app, str) => {

    const PeriodoVacaciones = app.get('periodos_vacaciones');
    const DiasVacaciones = app.get('dias_vacaciones');
    const Usuario = app.get('usuario');
    const DatosUsuario = app.get('usuario_datos');

    return {
        getByUser: (req, res) => { getAllByUserPeriodoVacaciones(req, res, str, PeriodoVacaciones, DiasVacaciones) },
        update: (req, res) => { updatePeriodoVacaciones(req, res, str, PeriodoVacaciones) },
        create: (req, res) => { createPeriodoVacaciones(req, res, str, PeriodoVacaciones) },
        delete: (req, res) => { deletePeriodoVacaciones(req, res, str, PeriodoVacaciones) },
        close: (req, res) => { closePeriodoVacaciones(req, res, str, PeriodoVacaciones) }
    }
}

async function getAllByUserPeriodoVacaciones(req, res, str, PeriodoVacaciones, DiasVacaciones) {
    try {
        const idUsuario = req.params.id
        const periodosVacaciones = await PeriodoVacaciones.findAll({
            where: {
                fk_id_usuario: idUsuario
            },
            include: [DiasVacaciones]
        })
        res.json(new response(true, str.getAll, null, periodosVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function createPeriodoVacaciones(req, res, str, PeriodoVacaciones) {
    try {
        const periodoVacaciones = req.body
        const newPeriodosVacaciones = await PeriodoVacaciones.create({
            del: periodoVacaciones.del,
            al: periodoVacaciones.al,
            anno: periodoVacaciones.anno,
            dias_disponibles: periodoVacaciones.dias_disponibles,
            liquidado: false,
            fk_id_usuario: periodoVacaciones.fk_id_usuario
        })
        res.json(new response(true, str.create, null, newPeriodosVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updatePeriodoVacaciones(req, res, str, PeriodoVacaciones) {
    try {
        const periodoVacaciones = req.body
        const updatePeriodosVacaciones = await PeriodoVacaciones.update({
            del: periodoVacaciones.del,
            al: periodoVacaciones.al,
            anno: periodoVacaciones.anno,
            fecha_firma: periodoVacaciones.fecha_firma,
            dias_disponibles: periodoVacaciones.dias_disponibles,
            liquidado: false
        }, {
            where: {
                id: periodoVacaciones.id
            }
        })
        res.json(new response(true, str.update, null, updatePeriodosVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deletePeriodoVacaciones(req, res, str, PeriodoVacaciones) {
    try {
        const idPerdiodo = req.params.id
        const updatePeriodosVacaciones = await PeriodoVacaciones.destroy({
            where: {
                id: idPerdiodo
            }
        })
        res.json(new response(true, str.delete, null, updatePeriodosVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function closePeriodoVacaciones(req, res, str, PeriodoVacaciones) {
    try {
        const idPerdiodo = req.params.id
        const updatePeriodosVacaciones = await PeriodoVacaciones.update({
            liquidado: true,
            fecha_firma: new Date()
        }, {
            where: {
                id: idPerdiodo
            }
        })
        res.json(new response(true, str.update, null, updatePeriodosVacaciones))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}