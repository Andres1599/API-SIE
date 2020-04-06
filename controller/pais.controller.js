module.exports = function(app) {
    let paises = app.get('paises');
    return {
        create: (req, res) => { newPaises(paises, req, res); },
        update: (req, res) => { updatePaises(paises, req, res); },
        delete: (req, res) => { deletePaises(paises, req, res); },
        getById: (req, res) => { getPaisesById(paises, req, res); },
        getAll: (req, res) => { getAllPaises(paises, req, res); }
    }
}

function newPaises(paises, req, res) {
    paises.create({
        nombre_pais: req.body.nombre_pais,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo pais",
                created: false
            });
        }
    });
}

function deletePaises(paises, req, res) {
    paises.findOne({
        where: {
            id_pais: req.params.id_pais
        }
    }).then(function(response) {
        if (response) {
            paises.destroy({
                where: {
                    id_pais: req.params.id_pais
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el pais",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el pais",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el pais para eliminarlo"
            });
        }
    });
}

function updatePaises(paises, req, res) {
    paises.update({
        nombre_pais: req.body.nombre_pais,
    }, {
        where: {
            id_pais: req.body.id_pais
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    })
}

function getPaisesById(paises, req, res) {
    paises.findOne({
        where: {
            id_pais: req.params.id_pais
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el pais"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el pais",
            error: err
        });
    });
}

function getAllPaises(paises, req, res) {
    paises.findAll().then(function(response) {
        res.json(response);
    });
}