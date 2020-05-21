module.exports = (sequelize, type, userAssociation, calendarAssociation) => {
    var CalendarioUsuario = sequelize.define('calendario_usuario', {
        id_calendario_usuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        statusAccept: {
            type: type.BOOLEAN,
            allowNull: false,
            default: false
        },
        cierre_calendario: {
            type: type.BOOLEAN,
            allowNull: false,
            default: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    CalendarioUsuario.belongsTo(userAssociation, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    userAssociation.hasMany(CalendarioUsuario, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    CalendarioUsuario.belongsTo(calendarAssociation, {
        foreignKey: 'fk_id_calendario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    calendarAssociation.hasMany(CalendarioUsuario, {
        foreignKey: 'fk_id_calendario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return CalendarioUsuario;
}