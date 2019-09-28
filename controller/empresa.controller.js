module.exports = function(app) {
    return {
        create: function(req, res) {
            var empresa = app.get('empresa');
            CreateEmpresa(empresa, req, res);
        },
        update: function(req, res) {
            var empresa = app.get('empresa');
            UpdateEmpresa(empresa, req, res);
        },
        delete: function(req, res) {
            var empresa = app.get('empresa');
            DeleteEmpresa(empresa, req, res);
        }
    }
}

function CreateEmpresa(empresa, req, res) {
    empresa.create({
        nombre_empresa: req.body.nombre,
        nit_empresa: req.body.nit,
        serie_empresa: req.body.serie,
        alias_empresa: req.body.alias
    }).then(function(response) {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "Error al crear la empresa en el sistema",
                created: false
            });
        }
    });
}

function UpdateEmpresa(empresa, req, res) {
    empresa.update({
        nombre_empresa: req.body.nombre,
        nit_empresa: req.body.nit,
        serie_empresa: req.body.serie,
        alias_empresa: req.body.alias
    }, {
        where: {
            id_empresa: req.body.id_empresa
        }
    }).then(function(update) {
        res.json(update);
    }).catch(function(err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    });
}

function DeleteEmpresa(empresa, req, res) {
    empresa.destroy({
        where: {
            id_empresa: req.body.id_empresa
        }
    }).then(function(response) {
        if (response === 1) {
            res.json({
                message: "Empresa eliminada correctamente.",
                deleted: true
            });
        } else {
            res.json({
                message: "Error al eliminar la empresa.",
                deleted: false
            });
        }
    });
}