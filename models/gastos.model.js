module.exports = (sequelize, type) => {
    var CatalogoGastos = sequelize.define('catalogo_gastos', {
        id_gasto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_gasto: {
            type: type.STRING,
            allowNull: false
        },
        cuenta_contable: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return CatalogoGastos;
}