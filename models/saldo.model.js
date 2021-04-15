module.exports = (sequelize, type, cuenta, moneda, tipoCuenta, empresa) => {
    var Saldos = sequelize.define('saldo_cuentas', {
        id_saldo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        fecha_registro: {
            type: type.STRING,
            allowNull: true
        },
        saldo_anterior: {
            type: type.FLOAT,
            allowNull: false
        },
        saldo_entra: {
            type: type.FLOAT,
            allowNull: false
        },
        saldo_salida: {
            type: type.FLOAT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });



    return Saldos;
}