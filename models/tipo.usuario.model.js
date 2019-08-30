module.exports = (sequelize, type) => {
    var TipoUsuario = sequelize.define('tipo_usuarios', {
        id_tipo_usuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_usuario: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return TipoUsuario;
}