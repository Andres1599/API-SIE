module.exports = (sequelize, type, orden, liquidacion) => {
    var OrdenLiquidacion = sequelize.define('orden_liquidacion', {
        id_orden_liquidacion: { type: type.INTEGER, primaryKey: true, autoIncrement: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    OrdenLiquidacion.belongsTo(orden, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });
    OrdenLiquidacion.belongsTo(liquidacion, {
        foreignKey: 'fk_id_liquidacion',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });
    
    orden.hasMany(OrdenLiquidacion, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });

    liquidacion.hasMany(OrdenLiquidacion, {
        foreignKey: 'fk_id_liquidacion',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });

    return OrdenLiquidacion;
}