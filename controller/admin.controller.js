module.exports = (app) => {

    let Usuario = app.get('usuario');
    let DatosUsuario = app.get('usuario_datos');
    let TipoUsuario = app.get('tipo_usuario');
    let Bancos = app.get('banco');
    let Empresa = app.get('empresa');
    let EmpresaMoneda = app.get('empresa_moneda');
    let Moneda = app.get('moneda');

    return {
        getUsuarios: (req, res) => { getU(Usuario, DatosUsuario, TipoUsuario, req, res); },
        getBancos: (req, res) => { getB(Bancos, req, res); },
        getTipoUsuario: (req, res) => { getTU(TipoUsuario, req, res); },
        getCatalogo: (req, res) => {},
        getEmpresas: (req, res) => { getE(Empresa, EmpresaMoneda, req, res); },
        getMoneda: (req, res) => { getM(Moneda, req, res); }
    }
}

function getU(Usuario, DatosUsuario, TipoUsuario, req, res) {
    Usuario.findAll({
        include: [{ model: DatosUsuario, attributes: ['nombre', 'apellido', 'dpi'] },
            { model: TipoUsuario, attributes: ['tipo_usuario'] }
        ],
        attributes: ['email', 'status']
    }).then(rest => {
        if (rest) {
            res.json(rest);
        } else {
            res.json({
                message: 'No se ha encontrado ni un usuario.'
            });
        }
    }).catch(err => {
        res.status(404).send({
            message: 'Error al realizar la petición.',
            error: err
        });
    });
}

function getB(Bancos, req, res) {
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

function getTU(TipoUsuario, req, res) {
    TipoUsuario.findAll().then(rest => {
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