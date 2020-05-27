module.exports = (sequelize, type, vacationAssociation) => {
    var VacacionesItem = sequelize.define('item_vacaciones', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start: {
            type: type.DATE,
            allowNull: false
        },
        end: {
            type: type.DATE,
            allowNull: false
        },
        dias_tomados: {
            type: type.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    VacacionesItem.belongsTo(vacationAssociation, {
        foreignKey: 'fk_id_vacaciones',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL' 
    });

    vacationAssociation.hasMany(VacacionesItem, {
        foreignKey: 'fk_id_vacaciones',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return VacacionesItem;
}