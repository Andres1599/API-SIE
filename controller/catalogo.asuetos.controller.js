const response = require('../response/response')

module.exports = (app, str) => {

    const CatalogoAsuetos = app.get('catalogo_asuetos');

    return {
        getAll: (req, res) => { getAllCatalogoAsuetos(req, res, str, CatalogoAsuetos) },
        update: (req, res) => { updateCatalogoAsuetos(req, res, str, CatalogoAsuetos) },
        create: (req, res) => { createCatalogoAsuetos(req, res, str, CatalogoAsuetos) },
        delete: (req, res) => { deleteCatalogoAsuetos(req, res, str, CatalogoAsuetos) },
    }
}

async function createCatalogoAsuetos(req, res, str, CatalogoAsuetos) {
    try {
        const newAsueto = await CatalogoAsuetos.create({
            nombre_asueto: req.body.nombre_asueto,
            dia: req.body.dia,
            mes: req.body.mes,
            fecha_corrido: req.body.fecha_corrido
        })
        res.json(new response(true, str.create, null, newAsueto))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateCatalogoAsuetos(req, res, str, CatalogoAsuetos) {
    try {
        const updateAsueto = await CatalogoAsuetos.update({
            nombre_asueto: req.body.nombre_asueto,
            dia: req.body.dia,
            mes: req.body.mes,
            fecha_corrido: req.body.fecha_corrido
        }, {
            where: {
                id: req.body.id
            }
        })
        res.json(new response(true, str.update, null, updateAsueto))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteCatalogoAsuetos(req, res, str, CatalogoAsuetos) {
    try {
        const deleteAsueto = await CatalogoAsuetos.destroy({
            where: { id: req.params.id }
        })
        res.json(new response(true, str.delete, null, deleteAsueto))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllCatalogoAsuetos(req, res, str, CatalogoAsuetos) {
    try {
        const asuetos = await CatalogoAsuetos.findAll();
        res.json(new response(true, str.getAll, null, asuetos))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}