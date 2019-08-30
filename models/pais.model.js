module.exports = (sequelize, type) => {
    var Pais = sequelize.define('paises', {
        id_pais: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_pais: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Pais;
}