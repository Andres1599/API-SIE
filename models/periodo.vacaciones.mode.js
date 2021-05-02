module.exports = (sequelize, type, usuarios) => {
    var PeriodosVacaciones = sequelize.define('periodos_vacaciones', {
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
        anno: {
            type: type.INTEGER,
            allowNull: false
        },
        fecha_firma: {
            type: type.DATE,
            allowNull: true
        },
        dias_disponibles: {
            type: type.INTEGER,
            defaultValue: 15
        },
        liquidado: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    PeriodosVacaciones.belongsTo(usuarios, { foreignKey: 'fk_id_usuario' });

    usuarios.hasMany(PeriodosVacaciones, { foreignKey: 'fk_id_usuario' })

    return PeriodosVacaciones;
}