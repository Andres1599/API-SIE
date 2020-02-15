module.exports = function (app) {
    
    let empresa = app.get('empresa');
    let empresaMoneda = app.get('empresa_moneda');

    return {
        create: function (req, res) { CreateEmpresa(empresa, req, res); },
        update: function (req, res) { UpdateEmpresa(empresa, req, res); },
        delete: function (req, res) { DeleteEmpresa(empresa, req, res); },
        getEM: (req, res) => { getEmpresaMoneda(empresa, empresaMoneda, req, res); }
    }
}

function CreateEmpresa(empresa, req, res) {
    empresa.create({
        nombre_empresa: req.body.nombre_empresa,
        nit_empresa: req.body.nit_empresa,
        serie_empresa: req.body.serie_empresa,
        alias_empresa: req.body.alias_empresa
    }).then(function (response) {
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
        nombre_empresa: req.body.nombre_empresa,
        nit_empresa: req.body.nit_empresa,
        serie_empresa: req.body.serie_empresa,
        alias_empresa: req.body.alias_empresa
    }, {
        where: {
            id_empresa: req.body.id_empresa
        }
    }).then(function (update) {
        res.json(update);
    }).catch(function (err) {
        res.json({
            message: 'Error al procesar la petición',
            error: err
        });
    });
}

function DeleteEmpresa(empresa, req, res) {
    empresa.destroy({
        where: {
            id_empresa: req.params.id
        }
    }).then(function (response) {
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

function getEmpresaMoneda(empresa, empresaMoneda, req, res) {
    empresa.findAll({
            include: [{
                model: empresaMoneda
            }]
        }).then(empresas => {
            if (empresas) {
                res.status(200).send(empresas)
            }
        })
        .catch( err => {
            res.status(400).send({
                error: err
            })
        })
}