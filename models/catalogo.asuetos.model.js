module.exports = (sequelize, type) => {
    var CatalogoAsuetos = sequelize.define('catalogo_asuetos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_asueto: {
            type: type.STRING,
            allowNull: false
        },
        dia: {
            type: type.INTEGER,
            allowNull: false
        },
        mes: {
            type: type.INTEGER,
            allowNull: false
        },
        fecha_corrido: {
            type: type.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return CatalogoAsuetos;
}