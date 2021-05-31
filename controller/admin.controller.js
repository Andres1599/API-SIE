const response = require('../response/response');
module.exports = (app, str) => {

    const Usuario = app.get('usuario');
    const DatosUsuario = app.get('usuario_datos');
    const TipoUsuario = app.get('tipo_usuario');
    const Bancos = app.get('banco');
    const Empresa = app.get('empresa');
    const EmpresaMoneda = app.get('empresa_moneda');
    const Moneda = app.get('moneda');

    return {
        getUsuarios: (req, res) => { getAllUsuarios(req, res, str, response, Usuario, DatosUsuario, TipoUsuario) },
        getBancos: (req, res) => { getB(req, res, str, Bancos) },
        getTipoUsuario: (req, res) => { getTU(req, res, str, response, TipoUsuario) },
        getEmpresas: (req, res) => { getE(Empresa, EmpresaMoneda, req, res); },
        getMoneda: (req, res) => { getM(Moneda, req, res); }
    }
}

async function getAllUsuarios(req, res, str, response, Usuario, DatosUsuario, TipoUsuario) {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                status: true
            },
            include: [{ model: DatosUsuario }, TipoUsuario],
            order: [[DatosUsuario, 'nombre', 'ASC']]
        })
        res.json(new response(true, str.getAll, null, usuarios))
    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

function getB(req, res, str, Bancos) {
    Bancos.findAll().then(rest => {
        if (rest) {
            res.json(rest);
        } else {
            res.json({ message: 'No se ha encontrado ni un Banco.' });
        }
    }).catch(err => {
        res.status(404).send({
            message: 'Error al realizar la petición.',
            error: err
        });
    });
}

function getTU(req, res, str, response, TipoUsuario) {
    TipoUsuario.findAll().then(tipoUsuarios => {
        if (tipoUsuarios) {
            res.json(new response(true, str.get, null, tipoUsuarios))
        } else {
            res.json(new response(false, str.getErr, null, tipoUsuarios))
        }
    }).catch(err => {
        res.json(new response(true, str.errCatch, null, err))
    });
}

function getE(Empresa, EmpresaMoneda, req, res) {
    Empresa.findAll({
        include: [{ model: EmpresaMoneda }]
    }).then(rest => {
        if (rest) {
            res.json(rest);
        } else {
            res.json({ message: 'No se ha encontrado ni una Empresa.' });
        }
    }).catch(err => {
        res.status(404).send({
            message: 'Error al realizar la petición.',
            error: err
        });
    });
}

function getM(Moneda, req, res) {
    Moneda.findAll().then(rest => {
        if (rest) {
            res.json(rest);
        } else {
            res.json({ message: 'No se ha encontrado ni una Moneda.' });
        }
    }).catch(err => {
        res.status(404).send({
            message: 'Error al realizar la petición.',
            error: err
        });
    });
}