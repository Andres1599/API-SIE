module.exports = (app, str) => {

    const gastosTipoUsuario = app.get('gasto_usuario')
    const tipoUsuario = app.get('tipo_usuario')
    const catalogoSubGasto = app.get('subgasto')
    const gasto = app.get('gasto')
    const response = require('../response/response')

    return {
        create: (req, res) => { newGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) },
        delete: (req, res) => { deleteGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) },
        getById: (req, res) => { getGastosTipoUsuarioById(gastosTipoUsuario, catalogoSubGasto, gasto, req, res) },
        getByGasto: (req, res) => { getGastosTipoUsuarioByIdGasto(req, res, str, response, gastosTipoUsuario, tipoUsuario) }
    }
}

async function newGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) {
    try {

        const newGastoTipoUsuario = await gastosTipoUsuario.create({
            fk_id_gasto: req.body.fk_id_gasto,
            fk_id_tipo_usuario: req.body.fk_id_tipo_usuario,
        })

        res.json(new response(true, str.create, null, newGastoTipoUsuario))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) {
    try {

        const deleted = await gastosTipoUsuario.destroy({
            where: {
                id_gasto_usuario: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleted))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getGastosTipoUsuarioByIdGasto(req, res, str, response, gastosTipoUsuario, tipoUsuario) {
    try {
        const data = await gastosTipoUsuario.findAll({
            where: {
                fk_id_gasto: req.params.id
            },
            include: [tipoUsuario]
        })
        res.json(new response(true, str.get, null, data))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getGastosTipoUsuarioById(gastosTipoUsuario, catalogoSubGasto, gasto, req, res) {
    gastosTipoUsuario.findAll({
        where: {
            fk_id_tipo_usuario: req.params.id
        },
        include: [{
            model: gasto,
            include: [{
                model: catalogoSubGasto
            }]
        }]
    }).then((response) => {
        if (response) {
            res.json(response);
        } else {
            res.json({
                message: "No hemos podido encontrar el gasto"
            });
        }
    }).catch(function (err) {
        res.json({
            message: "No hemos podido encontrar el gasto",
            error: err
        });
    });
}