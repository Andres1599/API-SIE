module.exports = (sequelize, type, liquidacion, factura) => {
    var LiquidacionFactura = sequelize.define('item_liquidacion', {
        id_item: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    LiquidacionFactura.belongsTo(liquidacion, {
        foreignKey: 'id_liquidacion',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    liquidacion.hasMany(LiquidacionFactura, {
        foreignKey: 'id_liquidacion',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    LiquidacionFactura.belongsTo(factura, {
        foreignKey: 'id_factura',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    factura.hasMany(LiquidacionFactura, {
        foreignKey: 'id_factura',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return LiquidacionFactura;
}