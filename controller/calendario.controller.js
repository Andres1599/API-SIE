const response = require('../response/response')
module.exports = (app, string) => {

    const Calendario = app.get('calendario');
    const CalendarioUsuario = app.get('calendario_usuario');
    const Actividad = app.get('catalogo_actividad')
    const Ensayo = app.get('catalogo_ensayo')
    const op = app.get('op')
    const Usuario = app.get('usuario');
    const DatosUsuario = app.get('usuario_datos');
    const CalendarioEnsayo = app.get('calendario_ensayo');

    return {
        getAll: (req, res) => { getAllEvent(req, res, string, Calendario) },
        getById: (req, res) => { getEventById(req, res, string, response, Calendario, CalendarioUsuario, Usuario, DatosUsuario, Actividad, CalendarioEnsayo, Ensayo) },
        getUserEventsById: (req, res) => { getAllEventUserById(req, res, string, Calendario, CalendarioUsuario, CalendarioEnsayo) },
        create: (req, res) => { createEvent(req, res, string, response, Calendario, CalendarioUsuario, CalendarioEnsayo) },
        update: (req, res) => { updateEvent(req, res, string, response, Calendario) },
        delete: (req, res) => { deleteEvent(req, res, string, response, Calendario, CalendarioUsuario) },
        deleteUser: (req, res) => { deleteUserEvent(req, res, string, response, CalendarioUsuario) },
        deleteEssay: (req, res) => { deleteEssayEvent(req, res, string, response, CalendarioEnsayo) },
        createUser: (req, res) => { createCalendarUser(req, res, CalendarioUsuario, string) },
        accept: (req, res) => { acceptEvent(req, res, CalendarioUsuario, string) },
        getByIdToBeAccept: (req, res) => { getAllEventToAcceptById(req, res, string, Calendario, CalendarioUsuario) },
        refuse: (req, res) => { refuseEvent(req, res, CalendarioUsuario, string) },
        close: (req, res) => { closeCalendar(req, res, string, Calendario) },
        search: (req, res) => { searchCalendar(req, res, Calendario, Actividad, Ensayo, string, op, CalendarioUsuario) },
        searchUser: (req, res) => { getEventToBeClosePerUser(req, res, Calendario, Actividad, Ensayo, string, op, CalendarioUsuario, Usuario, DatosUsuario, CalendarioEnsayo) },
        full: (req, res) => { fullSearchCalendar(req, res, Calendario, Actividad, Ensayo, string, op, CalendarioUsuario, Usuario, DatosUsuario) }
    }
}

async function createEvent(req, res, string, response, Calendario, CalendarioUsuario, CalendarioEnsayo) {
    try {

        const event = req.body;

        const newEvent = await Calendario.create(event, { include: [CalendarioUsuario, CalendarioEnsayo] })

        res.json(new response(true, string.create, null, newEvent))


    } catch (error) {
        res.json(new response(false, string.errCatch, error, null))
    }
}

async function deleteEvent(req, res, string, response, Calendario, CalendarioUsuario) {
    try {

        const idEvent = req.params.id

        const deleteEventUser = await CalendarioUsuario.destroy({ where: { fk_id_calendario: idEvent } })
        const deleteEvent = await Calendario.destroy({ where: { id: idEvent } })

        res.json(new response(true, string.delete, null, deleteEvent));

    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function deleteUserEvent(req, res, string, response, CalendarioUsuario) {
    try {
        const idUserEvent = req.params.id

        const deleteEventUser = await CalendarioUsuario.destroy({ where: { id_calendario_usuario: idUserEvent } })

        res.json(new response(true, string.delete, null, deleteEventUser));

    } catch (error) {
        console.log(error);
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function deleteEssayEvent(req, res, string, response, CalendarioEnsayo) {
    try {
        const idEssayEvent = req.params.id

        const deleteEventEssay = await CalendarioEnsayo.destroy({ where: { id: idEssayEvent } })

        res.json(new response(true, string.delete, null, deleteEventEssay));

    } catch (error) {
        console.log(error);
        res.json(new response(false, string.errCatch, error, null));
    }
}

async function updateEvent(req, res, string, response, Calendario) {
    try {

        const event = req.body;

        const updateEvent = await Calendario.update({
            title: event.title,
            start: event.start,
            end: event.end,
            client: event.client,
            noOrder: event.noOrder,
            fk_id_actividad: event.fk_id_actividad
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json(new response(true, string.update, null, updateEvent))

    } catch (error) {
        res.json(new response(false, string.errCatch, error, null))
    }
}

function getAllEvent(req, res, string, Calendario) {
    Calendario.findAll().then(events => {
        res.json(events)
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

async function getEventById(req, res, string, response, Calendario, CalendarioUsuario, Usuario, DatosUsuario, Actividad, CalendarioEnsayo, Ensayo) {
    try {
        const event = await Calendario.findByPk(req.params.id, {
            include: [
                {
                    model: CalendarioUsuario,
                    include: [{ model: Usuario, attributes: ['id_usuario'], include: [{ model: DatosUsuario, attributes: ['nombre', 'apellido'] }] }]
                },
                Actividad,
                {
                    model: CalendarioEnsayo,
                    include: [Ensayo]
                }
            ]
        })

        res.json(new response(true, string.get, null, event));

    } catch (error) {
        res.json(new response(false, string.errCatch, error, null));
    }
}

function getAllEventUserById(req, res, string, Calendario, CalendarioUsuario) {
    CalendarioUsuario.findAll({
        where: {
            fk_id_usuario: req.params.fk_id_usuario,
            statusAccept: true,
            cierre_calendario: true
        },
        include: [Calendario]
    }).then(events => {
        res.json(events)
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

async function createCalendarUser(req, res, CalendarioUsuario, string) {
    try {

        const calendarioUsuario = await CalendarioUsuario.create({
            cierre_calendario: true,
            fk_id_calendario: req.body.fk_id_calendario,
            fk_id_usuario: req.body.fk_id_usuario,
            statusAccept: false,
        })

        res.json(new response(true, string.create, null, calendarioUsuario))

    } catch (error) {
        res.json(new response(false, string.errCatch, err, null))
    }
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
async function closeCalendar(req, res, string, Calendario) {
    try {
        let events = req.body.activities;
        let count = 0;
        if (Array.isArray(events)) {
            await events.forEach(async (event) => {
                const updateEvent = await Calendario.update({
                    status: true
                }, {
                    where: {
                        id: event.fk_id_calendario
                    }
                })
                count += 1
            })
            res.json(new response(true, string.update, null, true))

        } else {
            res.json(new response(false, string.updateErr, null, null))
        }
    } catch (error) {
        res.json(new response(false, string.errCatch, err, null));
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} Calendario 
 * @param {*} Actividad 
 * @param {*} Ensayo 
 * @param {*} string 
 */
function searchCalendar(req, res, Calendario, Actividad, Ensayo, string, sequelize, CalendarioUsuario) {
    const Op = sequelize.Op

    Calendario.findAll({
        where: {
            [Op.or]: {
                end: {
                    [Op.between]: [req.body.start, req.body.end]
                },
                start: {
                    [Op.between]: [req.body.start, req.body.end]
                }
            },
            fk_id_actividad: req.body.fk_id_actividad,
        },
        include: [{
            model: Actividad
        },
        {
            model: Ensayo
        },
        {
            model: CalendarioUsuario
        },
        ]
    }).then((events) => {
        if (events) {
            let dataResponse = {
                midweek: [],
                weekend: []
            };

            events.forEach(item => {
                if (
                    item.end.getDay() === 6 ||
                    item.end.getDay() === 0
                ) {
                    dataResponse.weekend.push(item)
                } else {
                    dataResponse.midweek.push(item)
                }
            });

            res.json(new response(true, string.getAll, null, dataResponse))
        } else {
            res.json(new response(false, string.getErr, null, events))
        }
    }).catch((err) => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

async function getEventToBeClosePerUser(req, res, Calendario, Actividad, Ensayo, string, op, CalendarioUsuario, Usuario, DatosUsuario, CalendarioEnsayo) {
    try {
        const Op = op.Op
        const events = await CalendarioUsuario.findAll({
            where: {
                fk_id_usuario: req.body.fk_id_usuario,
                statusAccept: true,
                cierre_calendario: true
            },
            include: [{
                model: Calendario,
                where: {
                    [Op.or]: {
                        end: { [Op.between]: [req.body.start, req.body.end] },
                        start: { [Op.between]: [req.body.start, req.body.end] }
                    },
                    status: false
                },
                include: [
                    Actividad,
                    { model: CalendarioEnsayo, include: [Ensayo] },
                    {
                        model: CalendarioUsuario,
                        include: [{ model: Usuario, attributes: ['id_usuario'], include: [{ model: DatosUsuario, attributes: ['nombre', 'apellido'] }] }],
                    }
                ]
            }]
        })

        res.json(new response(true, string.getAll, null, events))

    } catch (error) {
        res.json(new response(false, string.errCatch, error, null))
    }
}

function fullSearchCalendar(req, res, Calendario, Actividad, Ensayo, string, op, CalendarioUsuario, Usuario, DatosUsuario) {
    const Op = op.Op
    Calendario.findAll({
        where: {
            [Op.or]: {
                end: {
                    [Op.between]: [req.body.start, req.body.end]
                },
                start: {
                    [Op.between]: [req.body.start, req.body.end]
                }
            }
        },
        include: [{
            model: Actividad
        },
        {
            model: Ensayo
        },
        {
            model: CalendarioUsuario,
            include: [
                {
                    model: Usuario,
                    attributes: ['id_usuario'],
                    include: [
                        {
                            model: DatosUsuario,
                            attributes: ['nombre', 'apellido']
                        }
                    ]
                }
            ]
        },
        ]
    }).then((events) => {
        if (events) {
            res.json(new response(true, string.getAll, null, events))
        } else {
            res.json(new response(false, string.getErr, null, events))
        }
    }).catch((err) => {
        console.error(err);
        res.json(new response(false, string.errCatch, err, null));
    })
}

