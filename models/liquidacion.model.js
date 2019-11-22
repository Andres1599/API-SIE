module.exports = (sequelize, type) => {
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
        id_usuario: {
            type: type.INTEGER,
            allowNull: true
        },
        id_empresa: {
            type: type.INTEGER,
            allowNull: true
        },
        id_moneda: {
            type: type.INTEGER,
            allowNull: true
        },
        id_tipo_liquidacion: {
            type: type.INTEGER,
            allowNull: true
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
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Liquidacion;
}