module.exports = (sequelize, type) => {
    var Cartas = sequelize.define('cartas', {
        id_carta: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo_carta: {
            type: type.STRING,
            allowNull: false,
            default: "Machote carta"
        },
        texto_carta: {
            type: type.TEXT,
            allowNull: false,
            default: ""
        },
        status: {
            type: type.BOOLEAN,
            allowNull: false,
            default: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Cartas;
}