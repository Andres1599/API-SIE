module.exports = (sequelize, type, userAssociation) => {
    var Calendario = sequelize.define('calendario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        draggable: {
            type: type.BOOLEAN,
            allowNull: true,
            default: false
        },
        resizable: {
            type: type.TEXT,
            allowNull: true
        },
        allDay: {
            type: type.BOOLEAN,
            allowNull: false,
            default: true
        },
        actions: {
            type: type.TEXT,
            allowNull: true
        },
        color: {
            type: type.STRING,
            allowNull: true
        },
        title: {
            type: type.TEXT,
            allowNull: true
        },
        end: {
            type: type.DATE,
            allowNull: true
        },
        start: {
            type: type.DATE,
            allowNull: true
        },
        status: {
            type: type.BOOLEAN,
            allowNull: false,
            default: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Calendario.belongsTo(userAssociation, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    userAssociation.hasMany(Calendario, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Calendario;
}