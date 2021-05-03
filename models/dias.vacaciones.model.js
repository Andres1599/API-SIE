module.exports = (sequelize, type, periodos) => {
    var DiasVacaciones = sequelize.define('dias_vacaciones', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        del: {
            type: type.DATE,
            allowNull: false
        },
        al: {
            type: type.DATE,
            allowNull: false
        },
        fecha_retorno: {
            type: type.DATE,
            allowNull: false
        },
        dias_consumidos: {
            type: type.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    DiasVacaciones.belongsTo(periodos, { foreignKey: 'fk_id_periodo' });

    periodos.hasMany(DiasVacaciones, { foreignKey: 'fk_id_periodo' })

    return DiasVacaciones;
}