module.exports = (app, str) => {
    const response = require('../response/response')
    const calendarEssay = app.get('calendario_ensayo');
    return {
        create: (req, res) => { createEssayEvent(req, res, str, response, calendarEssay) },
        delete: (req, res) => { deleteEssayEvent(req, res, str, response, calendarEssay) }
    }
}

async function createEssayEvent(req, res, str, response, calendarEssay) {
    try {
        const newCalendarEssay = await calendarEssay.create({
            fk_id_ensayo: req.body.fk_id_ensayo,
            fk_id_evento: req.body.fk_id_evento
        })

        res.json(new response(true, str.delete, null, newCalendarEssay))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteEssayEvent(req, res, str, response, calendarEssay) {
    try {
        const idEssayEvent = req.params.id

        const deleteEventEssay = await calendarEssay.destroy({ where: { id: idEssayEvent } })

        res.json(new response(true, str.delete, null, deleteEventEssay))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}



