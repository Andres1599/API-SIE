const response = require('../response/response')

module.exports = (app, string) => {

    const Essay = app.get('catalogo_ensayo');

    return {
        getAll: (req, res) => {
            getAllEssay(req, res, string, Essay)
        },
        update: (req, res) => {
            updateEssay(req, res, string, Essay)
        },
        create: (req, res) => {
            createEssay(req, res, string, Essay)
        },
        delete: (req, res) => {
            deleteEssay(req, res, string, Essay)
        },
    }
}

function getAllEssay(req, res, string, Essay) {
    Essay.findAll().then(essays => {
        if (essays) {
            res.json(new response(true, string.getAll, null, essays))
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null))
    })
}

function createEssay(req, res, string, Essay) {
    Essay.create({
        nombre_ensayo: req.body.nombre_ensayo,
        iniciales_ensayo: req.body.iniciales_ensayo
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

function deleteEssay(req, res, string, Essay) {
    Essay.destroy({
        where: {
            id_ensayo: req.params.id
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

function updateEssay(req, res, string, Essay) {
    Essay.update({
        nombre_ensayo: req.body.nombre_ensayo,
        iniciales_ensayo: req.body.iniciales_ensayo
    }, {
        where: {
            id_ensayo: req.body.id_ensayo
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