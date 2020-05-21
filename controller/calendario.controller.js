module.exports = (app, string) => {

    const Calendario = app.get('calendario');
    const CalendarioUsuario = app.get('calendario_usuario');

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
        res.send({
            message: string.errCatch,
            error: err
        });
    });
}

function deleteEvent(req, res, string, Calendario) {
    Calendario.destroy({
        where: {
            id: req.params.id
        }
    }).then( deleted => {
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
    }).catch( err => {
        res.json({
            message: string.errCatch,
            error: err
        })
    })
}

function getAllEvent(req, res, string, Calendario) {
    Calendario.findAll().then(events => {
        res.json(events)
    }).catch(err => {
        res.json({
            message: string.errCatch,
            error: err
        })
    })
}

function getAllEventById(req, res, string, Calendario, CalendarioUsuario) {
    CalendarioUsuario.findAll({
        where: {
            fk_id_usuario: req.params.fk_id_usuario
        },
        include: [
            {
                model: Calendario
            }
        ]
    }).then(events => {
        res.json(events)
    }).catch(err => {
        res.json({
            message: string.errCatch,
            error: err
        })
    })
}