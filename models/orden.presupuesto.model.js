module.exports = (sequelize, type, orden) => {
    var PresupuestoOrden = sequelize.define('orden_presupuestos', {
        id_presupuesto_orde: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        gasto: { type: type.STRING, allowNull: true },
        dias: { type: type.INTEGER, allowNull: true },
        valor: { type: type.DOUBLE, allowNull: true },
        total: { type: type.DOUBLE, allowNull: true },
        observaciones: { type: type.STRING, allowNull: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    PresupuestoOrden.belongsTo(orden, { foreignKey: 'fk_id_orden_viaticos', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    orden.hasMany(PresupuestoOrden, { foreignKey: 'fk_id_orden_viaticos', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return PresupuestoOrden;
}