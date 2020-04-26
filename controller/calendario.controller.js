module.exports = (app) => {

    const Usuario = app.get('usuario');
    const DatosUsuario = app.get('usuario_datos');
    const Calendario = app.get('calendario');

    return {
        getAll: (req, res) => {
            getAllEvent(req, res, Calendario, Usuario, DatosUsuario)
        },
        getById: (req, res) => {
            getAllEventById(req, res, Calendario, Usuario, DatosUsuario)
        },
        create: (req, res) => {
            createEvent(req, res, Calendario)
        },
        delete: (req, res) => {
            deleteEvent(req, res, Calendario)
        },
    }
}

function createEvent(req, res, Calendario) {}

function deleteEvent(req, res, Calendario) {}

function getAllEvent(req, res, Calendario, Usuario, DatosUsuario){}

function getAllEventById(req, res, Calendario, Usuario, DatosUsuario){}