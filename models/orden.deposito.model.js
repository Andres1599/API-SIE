module.exports = (sequelize, type, orden, deposito) => {
    var OrdenDeposito = Sequelize.define('orden_deposito', {
        id_orden_deposito: { type: type.INTEGER, primaryKey: true, autoIncrement: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    orden.belongsToMany(deposito, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: OrdenDeposito
    });

    deposito.belongsToMany(orden, {
        foreignKey: 'fk_id_deposito',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: OrdenDeposito
    });

    return OrdenDeposito;
}