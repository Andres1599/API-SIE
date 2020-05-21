const response = require('../response/response')

module.exports = (app, string) => {

    const Activity = app.get('catalogo_actividad');

    return {
        getAll: (req, res) => {
            getAllActivity(req, res, string, Activity)
        },
        update: (req, res) => {
            updateActivity(req, res, string, Activity)
        },
        create: (req, res) => {
            createActivity(req, res, string, Activity)
        },
        delete: (req, res) => {
            deleteActivity(req, res, string, Activity)
        },
    }
}

function getAllActivity(req, res, string, Activity) {
    Activity.findAll().then(Activitys => {
        if (Activitys) {
            res.json(new response(true, string.getAll, null, Activitys))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null))
    })
}

function createActivity(req, res, string, Activity) {
    Activity.create({
        nombre_actividad: req.body.nombre_actividad
    }).then(created => {
        if (created){
            res.json(new response(true, string.create, null, created))
        }
        else {
            res.json(new response(false, string.createErr, null, created))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null))
    });
}

function deleteActivity(req, res, string, Activity) {
    Activity.destroy({
        where: {
            id_actividad: req.params.id
        }
    }).then(deleted => {
        if (deleted) {
            res.json(new response(true, string.delete, null, deleted))
        } else {
            res.json(new response(false, string.deleteErr, null, deleted))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null))
    })
}

function updateActivity(req, res, string, Activity) {
    Activity.update({
        nombre_actividad: req.body.nombre_actividad
    }, {
        where: {
            id_actividad: req.body.id_actividad
        }
    }).then(updated => {
        if (updated) {
            res.json(new response(true, string.update, null, updated))
        } else {
            res.json(new response(false, string.updateErr, null, updated))
        }
    }).catch(function (err) {
        res.json(new response(false, string.errCatch, err, null))
    })
}