const response = require('../response/response')
module.exports = (app, string) => {
    const paises = app.get('pais');
    return {
        create: (req, res) => {
            newPaises(paises, req, res, string);
        },
        update: (req, res) => {
            updatePaises(paises, req, res);
        },
        delete: (req, res) => {
            deletePaises(paises, req, res);
        },
        getAll: (req, res) => {
            getAllPaises(paises, req, res, string);
        }
    }
}

function newPaises(paises, req, res, string) {
    paises.create({
        nombre_pais: req.body.nombre_pais,
    }).then((country) => {
        if (country) {
            res.json(new response(true, string.create, null, country));
        } else {
            res.json(new response(false, string.createErr, null, country));
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    });
}

function deletePaises(paises, req, res) {
    paises.destroy({
        where: {
            id_pais: req.params.id_pais
        }
    }).then(deleted => {
        if (deleted) {
            res.json(new response(true, string.delete, null, deleted));
        } else {
            res.json(new response(false, string.deleteErr, null, deleted));
        }
    }).catch(err => {
        res.json(new response(false, string.errCatch, err, null));
    })
}

function updatePaises(paises, req, res) {
    paises.update({
        nombre_pais: req.body.nombre_pais,
    }, {
        where: {
            id_pais: req.body.id_pais
        }
    }).then(function (updated) {
        if (updated) { 
            res.json(new response(true, string.update, null, updated));
        } else {
            res.json(new response(false, string.updateErr, null, updated));
        }
    }).catch(function (err) {
        res.json(new response(false, string.errCatch, err, null));
    })
}  
 
function getAllPaises(paises, req, res, string) {
    paises.findAll().then((countries) => {
        if (countries) {
            res.json(new response(true, string.get, null, countries));
        } else {
            res.json(new response(false, string.getErr, null, countries));
        }
    }).catch( err => {
        res.json(new response(false, string.errCatch, err, null));
    });
}