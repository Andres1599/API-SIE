module.exports = (sequelize, type, orden, deposito) => {
    const OrdenDeposito = sequelize.define('orden_deposito', {
        id_orden_deposito: { type: type.INTEGER, primaryKey: true, autoIncrement: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    OrdenDeposito.belongsTo(orden, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    OrdenDeposito.belongsTo(deposito, {
        foreignKey: 'fk_id_deposito',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });

    orden.hasMany(OrdenDeposito, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    deposito.hasMany(OrdenDeposito, {
        foreignKey: 'fk_id_deposito',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });

    return OrdenDeposito;
}