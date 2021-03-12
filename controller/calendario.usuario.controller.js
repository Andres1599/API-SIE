module.exports = (app, str) => {

    const response = require('../response/response')
    const CalendarioUsuario = app.get('calendario_usuario');

    return {
        create: (req, res) => { createCalendarUser(req, res, str, response, CalendarioUsuario) },
        delete: (req, res) => { deleteUserEvent(req, res, str, response, CalendarioUsuario) }
    }
}

async function createCalendarUser(req, res, str, response, CalendarioUsuario) {
    try {

        const calendarioUsuario = await CalendarioUsuario.create({
            cierre_calendario: true,
            fk_id_calendario: req.body.fk_id_calendario,
            fk_id_usuario: req.body.fk_id_usuario,
            statusAccept: false,
        })

        res.json(new response(true, str.create, null, calendarioUsuario))

    } catch (error) {
        res.json(new response(false, str.errCatch, err, null))
    }
}

async function deleteUserEvent(req, res, str, response, CalendarioUsuario) {
    try {
        const idUserEvent = req.params.id

        const deleteEventUser = await CalendarioUsuario.destroy({ where: { id_calendario_usuario: idUserEvent } })

        res.json(new response(true, str.delete, null, deleteEventUser));

    } catch (error) {
        console.log(error);
        res.json(new response(false, str.errCatch, error, null));
    }
}