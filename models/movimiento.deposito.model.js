module.exports = (sequelize, type, Movimiento, Deposito) => {
    const MovimientoDeposito = sequelize.define('movimiento_deposito', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    MovimientoDeposito.belongsTo(Movimiento, { foreignKey: 'fk_id_movimiento', onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    Movimiento.hasMany(MovimientoDeposito, { foreignKey: 'fk_id_movimiento', onDelete: 'SET NULL', onUpdate: 'SET NULL' })

    MovimientoDeposito.belongsTo(Deposito, { foreignKey: 'fk_id_deposito', onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    Deposito.hasMany(MovimientoDeposito, { foreignKey: 'fk_id_deposito', onDelete: 'SET NULL', onUpdate: 'SET NULL' })

    return MovimientoDeposito;
}