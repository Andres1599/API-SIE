module.exports = (sequelize, type, orden) => {
    var OrdenOrdenes = sequelize.define('orden_ordenes', {
        id_orden_orden: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        orden: {
            type: type.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    OrdenOrdenes.belongsTo(orden, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    })

    orden.hasMany(OrdenOrdenes, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    })

    return OrdenOrdenes
}