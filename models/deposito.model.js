module.exports = (sequelize, type, subcuenta, moneda) => {
    const Deposito = sequelize.define('deposito', {
        id_deposito: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        fecha: { type: type.DATE, allowNull: true },
        fecha_registro: { type: type.DATE, allowNull: true },
        monto: { type: type.DOUBLE, allowNull: true },
        comentario: { type: type.STRING },
        cambio: { type: type.DOUBLE, allowNull: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Deposito.belongsTo(subcuenta, {
        foreignKey: 'fk_id_subcuenta',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    
    subcuenta.hasMany(Deposito, {
        foreignKey: 'fk_id_subcuenta',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    Deposito.belongsTo(moneda, {
        foreignKey: 'fk_id_moneda',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    moneda.hasMany(Deposito, {
        foreignKey: 'fk_id_moneda',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Deposito;
}