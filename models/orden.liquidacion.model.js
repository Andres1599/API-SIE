module.exports = (sequelize, type, orden, liquidacion) => {
    var OrdenLiquidacion = Sequelize.define('orden_liquidacion', {
        id_orden_liquidacion: { type: type.INTEGER, primaryKey: true, autoIncrement: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    orden.belongsToMany(liquidacion, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: OrdenLiquidacion
    });

    liquidacion.belongsToMany(orden, {
        foreignKey: 'fk_id_liquidacion',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: OrdenLiquidacion
    });
}