module.exports = (sequelize, type, empresa, moneda) => {
    var EmpresaMoneda = sequelize.define('empresa_moneda', {
        id_empresa_moneda: { type: type.INTEGER, primaryKey: true, autoIncrement: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    EmpresaMoneda.belongsTo(empresa, {
        foreignKey: 'fk_id_empresa',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    EmpresaMoneda.belongsTo(moneda, {
        foreignKey: 'fk_id_moneda',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    empresa.hasMany(EmpresaMoneda, {
        foreignKey: 'fk_id_empresa',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    moneda.hasMany(EmpresaMoneda, {
        foreignKey: 'fk_id_moneda',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    return EmpresaMoneda;
}