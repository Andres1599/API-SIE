module.exports = (sequelize, type) => {
    var Actividad = sequelize.define('catalogo_actividades', {
        id_actividad: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_actividad: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Actividad;
}