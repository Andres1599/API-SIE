module.exports = (sequelize, type, assosiationUser, assosiationCompany, assosiationCoin, assosiationTypeLiquidation, subCuenta) => {
    var Liquidacion = sequelize.define('liquidacion', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_liquidacion: {
            type: type.INTEGER,
            allowNull: false
        },
        fecha: {
            type: type.DATE,
            allowNull: true
        },
        fecha_cierra: {
            type: type.DATE,
            allowNull: true
        },
        estado: {
            type: type.INTEGER,
            allowNull: true
        },
        cambio: {
            type: type.FLOAT,
            allowNull: true
        },
        total: {
            type: type.FLOAT,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Liquidacion.belongsTo(assosiationUser, { foreignKey: 'id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiationUser.hasMany(Liquidacion, { foreignKey: 'id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    Liquidacion.belongsTo(assosiationCompany, { foreignKey: 'id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiationCompany.hasMany(Liquidacion, { foreignKey: 'id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    Liquidacion.belongsTo(assosiationCoin, { foreignKey: 'id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiationCoin.hasMany(Liquidacion, { foreignKey: 'id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    Liquidacion.belongsTo(assosiationTypeLiquidation, { foreignKey: 'id_tipo_liquidacion', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiationTypeLiquidation.hasMany(Liquidacion, { foreignKey: 'id_tipo_liquidacion', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    Liquidacion.belongsTo(subCuenta, { foreignKey: 'fk_id_subcuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL', allowNull: true });
    subCuenta.hasMany(Liquidacion, { foreignKey: 'fk_id_subcuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL', allowNull: true });

    return Liquidacion;
}