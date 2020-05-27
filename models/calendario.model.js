module.exports = (sequelize, type, userAssociation, essayAssociation, activityAssociation) => {
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
        },
        client: {
            type: type.STRING,
            allowNull: true
        },
        noOrder: {
            type: type.INTEGER,
            allowNull: true 
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Calendario.belongsTo(essayAssociation, {
        foreignKey: 'fk_id_ensayo',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    essayAssociation.hasMany(Calendario, {
        foreignKey: 'fk_id_ensayo',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    Calendario.belongsTo(activityAssociation, {
        foreignKey: 'fk_id_actividad',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    activityAssociation.hasMany(Calendario, {
        foreignKey: 'fk_id_actividad',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Calendario;
}