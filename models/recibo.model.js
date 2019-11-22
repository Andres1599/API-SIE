module.exports = (sequelize, type, usuario) => {
    var CuentaEmpresa = sequelize.define('recibos', {
        id_recibo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        planilla: {
            type: type.FLOAT(10, 2),
            allowNull: true
        },
        isss: {
            type: type.FLOAT(10, 2),
            allowNull: true
        },
        honorario: {
            type: type.FLOAT(10, 2),
            allowNull: true
        },
        prestamos: {
            type: type.FLOAT(10, 2),
            allowNull: true
        },
        liquido: {
            type: type.FLOAT(10, 2),
            allowNull: true
        },
        fecha: {
            type: type.DATE,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return CuentaEmpresa;
}