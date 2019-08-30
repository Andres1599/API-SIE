module.exports = (sequelize, type) => {
    var Empresa = sequelize.define('empresas', {
        id_empresa: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_empresa: {
            type: type.STRING,
            allowNull: false
        },
        nit_empresa: {
            type: type.STRING,
            allowNull: false
        },
        serie_empresa: {
            type: type.STRING,
            allowNull: false
        },
        alias_empresa: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Empresa;
}