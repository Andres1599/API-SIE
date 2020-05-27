module.exports = (sequelize, type) => {
    var CatalogoEnsayos = sequelize.define('catalogo_ensayos', {
        id_ensayo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_ensayo: {
            type: type.STRING,
            allowNull: false
        },
        iniciales_ensayo: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return CatalogoEnsayos;
}