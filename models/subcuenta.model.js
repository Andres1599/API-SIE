module.exports = (sequelize, type, cuenta, moneda, tipoCuenta, empresa) => {
    var CuentaEmpresa = sequelize.define('subcuentas', {
        id_cuenta_empresa: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cuenta_contable: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    CuentaEmpresa.belongsTo(cuenta, { foreignKey: 'fk_id_cuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    CuentaEmpresa.belongsTo(moneda, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    CuentaEmpresa.belongsTo(tipoCuenta, { foreignKey: 'fk_id_tipo_cuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL', allowNull: true });
    CuentaEmpresa.belongsTo(empresa, { foreignKey: 'fk_id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    cuenta.hasMany(CuentaEmpresa, { foreignKey: 'fk_id_cuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    moneda.hasMany(CuentaEmpresa, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    tipoCuenta.hasMany(CuentaEmpresa, { foreignKey: 'fk_id_tipo_cuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL', allowNull: true });
    empresa.hasMany(CuentaEmpresa, { foreignKey: 'fk_id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return CuentaEmpresa;
}