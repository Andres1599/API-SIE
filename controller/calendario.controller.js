const response = require('../response/response')
module.exports = (app, string) => {

    const Calendario = app.get('calendario');
    const CalendarioUsuario = app.get('calendario_usuario');
    const sequelize = app.get('sequelize')

    return {
        getAll: (req, res) => {
            getAllEvent(req, res, string, Calendario)
        },
        getById: (req, res) => {
            getAllEventById(req, res, string, Calendario, CalendarioUsuario)
        },
        create: (req, res) => {
            createEvent(req, res, string, Calendario)
        },
        delete: (req, res) => {
            deleteEvent(req, res, string, Calendario)
        },
        createUser: (req, res) => {
            createCalendarUser(req, res, CalendarioUsuario, string)
        },
        accept: (req, res) => {
            acceptEvent(req, res, CalendarioUsuario, string)
        },
        getByIdToBeAccept: (req, res) => {
            getAllEventToAcceptById(req, res, string, Calendario, CalendarioUsuario)
        },
        refuse: (req, res) => {
            refuseEvent(req, res, CalendarioUsuario, string)
        },
        close: (req, res) => {
            closeCalendar(req, res, string, sequelize)
        }
    }
}

function createEvent(req, res, string, Calendario) {
    Calendario.create({
        draggable: req.body.draggable,
        resizable: req.body.resizable,
        allDay: req.body.allDay,
        actions: req.body.actions,
        color: req.body.color,
        title: req.body.title,
        end: req.body.end,
        start: req.body.start,
        fk_id_usuario: req.body.fk_id_usuario,
        status: false,
        fk_id_ensayo: req.body.fk_id_ensayo,
        fk_id_actividad: req.body.fk_id_actividad
    }).then(created => {
        if (created)
            res.json({
                message: string.create,
                event: created
            });
        else {
            res.json({
                message: string.createErr,
                event: created
            });
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    });
}

function deleteEvent(req, res, string, Calendario) {
    Calendario.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleted => {
        if (deleted) {
            res.json({
                message: string.delete,
                deleted
            })
        } else {
            res.json({
                message: string.deleteErr,
                deleted
            })
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

function getAllEvent(req, res, string, Calendario) {
    Calendario.findAll().then(events => {
        res.json(events)
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

function getAllEventById(req, res, string, Calendario, CalendarioUsuario) {
    CalendarioUsuario.findAll({
        where: {
            fk_id_usuario: req.params.fk_id_usuario,
            statusAccept: true,
            cierre_calendario: true
        },
        include: [{
            model: Calendario
        }]
    }).then(events => {
        res.json(events)
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

function createCalendarUser(req, res, CalendarioUsuario, string) {
    const records = req.body.data;

    if (!records) {
        res.json(new response(false, string.errEmpty, null, null))
    }

    CalendarioUsuario.bulkCreate(records, {}).then((status) => {
        if (status) {
            res.json(new response(true, string.create, null, status))
        } else {
            res.json(new response(false, string.createErr, null, status))
        }
    }).catch((err) => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

function acceptEvent(req, res, CalendarioUsuario, string) {
    CalendarioUsuario.update({
        statusAccept: true,
        cierre_calendario: true
    }, {
        where: {
            id_calendario_usuario: req.body.id_calendario_usuario
        }
    }).then(updated => {
        if (updated) {
            res.json(new response(true, string.createErr, null, updated))
        } else {
            res.json(new response(false, string.createErr, null, updated))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

/**
 * @description when refuse a event the combination is status: false and close: true. Status means user refuse event
 * and close means the event has been refused and do not to be shown
 * @param {*} req 
 * @param {*} res 
 * @param {*} CalendarioUsuario 
 * @param {*} string 
 */
function refuseEvent(req, res, CalendarioUsuario, string) {
    CalendarioUsuario.update({
        statusAccept: false,
        cierre_calendario: true
    }, {
        where: {
            id_calendario_usuario: req.body.id_calendario_usuario
        }
    }).then(updated => {
        if (updated) {
            res.json(new response(true, string.createErr, null, updated))
        } else {
            res.json(new response(false, string.createErr, null, updated))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

/**
 * @description All the events that need to be accepted has the combination status: true, close: false. If the 
 * status is false and the close is true, that means the event is al ready refuse and do not need to be showed
 */
function getAllEventToAcceptById(req, res, string, Calendario, CalendarioUsuario) {
    CalendarioUsuario.findAll({
        where: {
            fk_id_usuario: req.params.id,
            statusAccept: false,
            cierre_calendario: false
        },
        include: [{
            model: Calendario
        }]
    }).then(events => {
        if (events) {
            res.json(new response(true, string.getAll, null, events))
        } else {
            res.json(new response(false, string.getErr, null, events))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

/**
 * @description close all events by date range. If the status is true on the event, thats means the event has been closed
 * @param {*} req 
 * @param {*} res 
 * @param {*} string 
 * @param {*} Calendario 
 */
function closeCalendar(req, res, string, sequelize) {
    sequelize.query("UPDATE calendario SET status=true WHERE (end >= '" +
        req.body.start + "' AND end <= '" +
        req.body.end + "')").then((updated) => {
        if (updated) {
            res.json(new response(true, string.update, null, updated))
        } else {
            res.json(new response(false, string.updateErr, null, updated))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}