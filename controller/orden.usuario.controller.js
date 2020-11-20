const response = require('../response/response')

module.exports = (app, str) => {
    const ordenUsuario = app.get('orden_usuario');
    return {
        create: (req, res) => { newOrdenUsuario(ordenUsuario, req, res, str) },
        delete: (req, res) => { deleteOrdenUsuario(ordenUsuario, req, res, str) }
    }
}

async function newOrdenUsuario(ordenUsuario, req, res, str) {
    try {
        const dataOrder = await ordenUsuario.create({
            encargado_orden: req.body.encargado_orden,
            fk_id_orden: req.body.fk_id_orden,
            fk_id_usuario: req.body.fk_id_usuario,
        });

        res.status(200).json(new response(true, str.delete, null, dataOrder))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}

async function deleteOrdenUsuario(ordenUsuario, req, res, str) {
    try {
        await ordenUsuario.destroy({
            where: {
                id_orden_usuario: req.params.id
            }
        })

        res.status(200).json(new response(true, str.delete, null, true))

    } catch (error) {
        res.status(500).json(new response(false, str.errCatch, error, null))
    }
}