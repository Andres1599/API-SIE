module.exports = (sequelize, type, ensayo, calendario) => {
    const CalendarioEnsayo = sequelize.define('calendario_ensayo', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    CalendarioEnsayo.belongsTo(ensayo, { foreignKey: 'fk_id_ensayo', });
    ensayo.hasMany(CalendarioEnsayo, { foreignKey: 'fk_id_ensayo' });

    CalendarioEnsayo.belongsTo(calendario, { foreignKey: 'fk_id_evento', });
    calendario.hasMany(CalendarioEnsayo, { foreignKey: 'fk_id_evento', });

    return CalendarioEnsayo;
}