module.exports = (sequelize, type, assosiation_liquidation, assosiation_factura) => {
    var LiquidacionFactura = sequelize.define('liquidacion_factura', {
        id_liquidacion_factura: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    assosiation_liquidation.belongsToMany(assosiation_factura, {
        foreignKey: 'fk_id_liquidacion',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: LiquidacionFactura
    });
    assosiation_factura.belongsToMany(assosiation_liquidation, {
        foreignKey: 'fk_id_factura',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: LiquidacionFactura
    });

    return LiquidacionFactura;
}