module.exports = (app) => {

    const Calendario = app.get('calendario');

    return {
        getAll: (req, res) => {
            getAllEvent(req, res, Calendario)
        },
        getById: (req, res) => {
            getAllEventById(req, res, Calendario)
        },
        create: (req, res) => {
            createEvent(req, res, Calendario)
        },
        delete: (req, res) => {
            deleteEvent(req, res, Calendario)
        },
    }
}

function createEvent(req, res, Calendario) {
    Calendario.create({
        draggable: req.body.draggable,
        resizable: req.body.resizable,
        allDay: req.body.allDay,
        actions: req.body.actions,
        color: req.body.color,
        title: req.body.title,
        end: req.body.end,
        start: req.body.start,
        fk_id_usuario: req.body.fk_id_usuario
    }).then(created => {
        if (created)
            res.json({
                message: 'Se ha creado exitosamente.',
                event: created
            });
    }).catch(err => {
        res.send({
            message: 'No se ha podido crear.',
            error: err
        });
    });
}

function deleteEvent(req, res, Calendario) {
    Calendario.destroy({
        where: {
            id: req.params.id
        }
    }).then( deleted => {
        if (deleted) {
            res.json({
                message: 'Se ha eliminado exitosamente.',
                deleted
            })
        } else {
            res.json({
                message: 'No se ha eliminado exitosamente.',
                deleted
            })
        }
    }).catch( err => {
        res.json({
            message: 'No se ha eliminado exitosamente.',
            error: err
        })
    })
}

function getAllEvent(req, res, Calendario) {
    Calendario.findAll().then(events => {
        res.json(events)
    }).catch(err => {
        res.send({
            message: 'No se ha podido obtener los eventos de calendario.',
            error: err
        });
    })
}

function getAllEventById(req, res, Calendario) {
    Calendario.findAll({
        where: {
            fk_id_usuario: req.params.fk_id_usuario
        }
    }).then(events => {
        res.json(events)
    }).catch(err => {
        res.send({
            message: 'No se ha podido obtener los eventos de calendario.',
            error: err
        });
    })
}