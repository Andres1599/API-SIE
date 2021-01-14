module.exports = (app, str) => {

    const gastosTipoUsuario = app.get('gasto_usuario')
    const catalogoSubGasto = app.get('subgasto')
    const gasto = app.get('gasto')
    const response = require('../response/response')

    return {
        create: (req, res) => { newGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) },
        update: (req, res) => { updateGastosTipoUsuario(gastosTipoUsuario, req, res) },
        delete: (req, res) => { deleteGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) },
        getById: (req, res) => { getGastosTipoUsuarioById(gastosTipoUsuario, catalogoSubGasto, gasto, req, res) },
        getAll: (req, res) => { getAllGastosTipoUsuario(gastosTipoUsuario, req, res) }
    }
}

async function newGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) {
    try {

        const newGastoTipoUsuario = await gastosTipoUsuario.create({
            fk_id_gasto: req.body.fk_id_gasto,
            fk_id_tipo_usuario: req.body.fk_id_tipo_usuario,
        })

        res.json(new response(true, str.create, error, newGastoTipoUsuario))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) {
    try {

        const deleted = await gastosTipoUsuario.destroy({
            where: {
                id_gasto_usuario: req.body.id_gasto_usuario
            }
        })

        res.json(new response(true, str.delete, null, deleted))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateGastosTipoUsuario(req, res, str, response, gastosTipoUsuario) {
    try {
        const updated = await gastosTipoUsuario.update({
            fk_id_gasto: req.body.fk_id_gasto,
            fk_id_tipo_usuario: req.body.fk_id_tipo_usuario,
        }, {
            where: {
                id_gasto_usuario: req.body.id_gasto_usuario
            }
        })

        res.json(new response(true, str.update, null, updated))

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

async function getAllGastosTipoUsuario(gastosTipoUsuario, req, res) {
    gastosTipoUsuario.findAll().then(function (response) {
        res.json(response);
    });
}