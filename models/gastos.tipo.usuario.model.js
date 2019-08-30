module.exports = (sequelize, type, gasto, usuario) => {
    var GastoUsuario = sequelize.define('gasto_usuario', {
        id_gasto_usuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    gasto.belongsToMany(usuario, {
        foreignKey: 'fk_id_gasto',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: GastoUsuario
    });
    usuario.belongsToMany(gasto, {
        foreignKey: 'fk_id_tipo_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: GastoUsuario
    });

    return GastoUsuario;
}