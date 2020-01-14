module.exports = function(app) {
    let tipoDocumentos = app.get('tipo_documentos');
    return {
        create: (req, res) => { newTipoDocumentos(tipoDocumentos, req, res); },
        update: (req, res) => { updateTipoDocumentos(tipoDocumentos, req, res); },
        delete: (req, res) => { deleteTipoDocumentos(tipoDocumentos, req, res); },
        getById: (req, res) => { getTipoDocumentosById(tipoDocumentos, req, res); },
        getAll: (req, res) => { getAllTipoDocumentos(tipoDocumentos, req, res); }
    }
}

function newTipoDocumentos(tipoDocumentos, req, res) {
    tipoDocumentos.create({
        nombre_documento: req.body.nombre_documento,
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear un nuevo tipo de documento",
                created: false
            });
        }
    });
}

function deleteTipoDocumentos(tipoDocumentos, req, res) {
    tipoDocumentos.findOne({
        where: {
            id_tipo_documento: req.body.id_tipo_documento
        }
    }).then(function(response) {
        if (response) {
            tipoDocumentos.destroy({
                where: {
                    id_tipo_documento: req.body.id_tipo_documento
                }
            }).then(function(deleted) {
                if (deleted) {
                    res.json({
                        message: "Se ha eliminado con exito el tipo de documento",
                        deleted: true
                    });
                } else {
                    res.json({
                        message: "Error al eliminar el tipo de documento",
                        deleted: false
                    });
                }
            });
        } else {
            res.json({
                message: "No hemos podido encontrar el tipo de documento para eliminarlo"
            });
        }
    });
}

function updateTipoDocumentos(tipoDocumentos, req, res) {
    tipoDocumentos.update({
        nombre_documento: req.body.nombre_documento,
    }, {
        where: {
            id_tipo_documento: req.body.id_tipo_documento
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

function getTipoDocumentosById(tipoDocumentos, req, res) {
    tipoDocumentos.findOne({
        where: {
            id_tipo_documento: req.params.id_tipo_documento
        }
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el tipo de documento"
            });
        }
    }).catch(function(err) {
        res.json({
            message: "No hemos podido encontrar el tipo de documento",
            error: err
        });
    });
}

function getAllTipoDocumentos(tipoDocumentos, req, res) {
    tipoDocumentos.findAll().then(function(response) {
        res.json(response);
    });
}