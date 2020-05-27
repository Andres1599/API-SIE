module.exports = (app) => {

    const Vacaciones = app.get('vacaciones')
    const VacacionesItem = app.get('item_vacaciones')
    const Calendario = app.get('calendario')
    const Usuario = app.get('usuario')
    const DatosUsuario = app.get('usuario_datos')

    return {
        getAllVacation: (req, res) => {},
        getVacationItem: (req, res) => {},
        createVacation: (req, res) => {},
        createVacationItem: (req, res) => {},
        deleteVacation: (req, res) => {},
        deleteVacationItem: (req, res) => {},
    }
}