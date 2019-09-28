module.exports = (sequelize, type) => {
    var Moneda = sequelize.define('monedas', {
        id_moneda: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_moneda: {
            type: type.STRING(15),
            allowNull: false
        },
        cmb_dolar: {
            type: type.DOUBLE,
            allowNull: false
        },
        simbolo: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Moneda;
}