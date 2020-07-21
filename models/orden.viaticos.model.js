module.exports = (sequelize, type, empresa, pais, moneda) => {
    var OrdenViaticos = sequelize.define('orden_viaticos', {
        id_orden_viaticos: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        fecha: { type: type.DATE, allowNull: true },
        fecha_salida: { type: type.DATE, allowNull: true },
        fecha_regreso: { type: type.DATE, allowNull: true },
        cliente: { type: type.STRING, allowNull: true },
        correlativo: { type: type.INTEGER },
        status: { type: type.BOOLEAN }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    OrdenViaticos.belongsTo(empresa, { foreignKey: 'fk_id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    empresa.hasMany(OrdenViaticos, { foreignKey: 'fk_id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    OrdenViaticos.belongsTo(pais, { foreignKey: 'fk_id_pais', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    pais.hasMany(OrdenViaticos, { foreignKey: 'fk_id_pais', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    OrdenViaticos.belongsTo(moneda, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    moneda.hasMany(OrdenViaticos, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return OrdenViaticos;
}