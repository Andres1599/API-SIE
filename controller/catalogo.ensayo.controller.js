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
        res.json(essays)
    }).catch(err => {
        res.json({
            message: string.errCatch,
            error: err
        })
    })
}

function createEssay(req, res, string, Essay) {
    Essay.create({
        nombre_ensayo: req.body.nombre_ensayo,
        iniciales_ensayo: req.body.iniciales_ensayo
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

function deleteEssay(req, res, string, Essay) {
    Essay.destroy({
        where: {
            id_ensayo: req.params.id
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
        res.json({
            message: string.errCatch,
            error: err
        })
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
            res.json({
                message: string.update,
                update: updated
            })
        }
    }).catch(function (err) {
        res.json({
            message: string.errCatch,
            error: err
        });
    })
}