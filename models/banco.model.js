module.exports = (sequelize, type) => {
    var Bancos = sequelize.define('bancos', {
        id_banco: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_banco: {
            type: type.STRING,
            allowNull: false
        },
        region_banco: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Bancos;
}