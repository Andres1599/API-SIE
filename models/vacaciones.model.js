module.exports = (sequelize, type, userAssociation) => {
    var Vacaciones = sequelize.define('vacaciones', {
        id_vacaciones: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        year: {
            type: type.INTEGER,
            allowNull: true
        },
        dias_disponibles: {
            type: type.INTEGER,
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Vacaciones.belongsTo(userAssociation, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL' 
    });

    userAssociation.hasMany(Vacaciones, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Vacaciones;
}