module.exports = (sequelize, type, empresa, moneda) => {
    var EmpresaMoneda = sequelize.define('empresa_moneda', {
        id_empresa_moneda: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        fk_id_empresa: { type: type.STRING, allowNull: false },
        fk_id_moneda: { type: type.STRING, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    EmpresaMoneda.belongsTo(empresa, {
        foreignKey: 'fk_id_empresa'
    });

    EmpresaMoneda.belongsTo(moneda, {
        foreignKey: 'fk_id_moneda'
    });

    empresa.hasMany(EmpresaMoneda, {
        foreignKey: 'fk_id_empresa'
    });

    moneda.hasMany(EmpresaMoneda, {
        foreignKey: 'fk_id_moneda'
    });
    return EmpresaMoneda;
}