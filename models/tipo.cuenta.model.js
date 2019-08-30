module.exports = (sequelize, type) => {
    var TipoCuenta = sequelize.define('tipo_cuentas', {
        id_tipo_cuenta: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_cuenta: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return TipoCuenta;
}