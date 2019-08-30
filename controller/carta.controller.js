module.exports = (app) => {

    let carta = app.get('carta');
    const strings = require('../utils/strings.res');

    return {
        create: (req, res) => { createCarta(carta, req, res, strings); },
        delete: (req, res) => { deleteCarta(carta, req, res, strings); },
        getAll: (req, res) => { getAllCartas(carta, req, res, strings); }
    }
}

function createCarta(carta, req, res, strings) {
    carta.create({
        titulo_carta: req.body.titulo_carta,
        texto_carta: req.body.texto_carta,
        status: true
    }).then(created => {
        if (created)
            res.json({
                message: strings.create,
                carta: created
            });
    }).catch(err => {
        res.send({
            message: strings.createErr,
            error: err
        });
    });
}

function deleteCarta(carta, req, res, strings) {
    carta.findAll().then(cartas => {
        if (cartas)
            res.json({
                message: 'No podemos eliminar el elemento, tiene datos asociados.'
            });
        else
            carta.destroy({
                where: {
                    id_carta: req.body.id_carta
                }
            }).then(deleted => {
                if (deleted)
                    res.json({
                        message: strings.delete,
                        delete: deleted
                    });
                else
                    res.json({
                        message: strings.deleteErr,
                        delete: deleted
                    });
            }).catch(err => {
                res.send({
                    message: strings.deleteErr,
                    error: err
                });
            });
    }).catch(err => {
        res.send({
            message: strings.getErr,
            error: err
        });
    });
}

function getAllCartas(carta, req, res, strings) {
    carta.findAll().then(cartas => {
        if (cartas)
            res.json(cartas)
        else
            res.json({
                message: strings.getErr
            });
    }).catch(err => {
        res.send({
            message: strings.getErr,
            error: err
        });
    });
}