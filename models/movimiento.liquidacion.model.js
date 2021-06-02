module.exports = (sequelize, type, Movimiento, Liquidacion) => {
    const MovimientoLiquidacion = sequelize.define('movimiento_liquidacion', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    MovimientoLiquidacion.belongsTo(Movimiento, { foreignKey: 'fk_id_movimiento', onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    Movimiento.hasMany(MovimientoLiquidacion, { foreignKey: 'fk_id_movimiento', onDelete: 'SET NULL', onUpdate: 'SET NULL' })

    MovimientoLiquidacion.belongsTo(Liquidacion, { foreignKey: 'fk_id_liquidacion', onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    Liquidacion.hasMany(MovimientoLiquidacion, { foreignKey: 'fk_id_liquidacion', onDelete: 'SET NULL', onUpdate: 'SET NULL' })

    return MovimientoLiquidacion;
}