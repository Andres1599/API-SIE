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

    GastoUsuario.belongsTo(gasto, {
        foreignKey: 'fk_id_gasto',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    gasto.hasMany(GastoUsuario, {
        foreignKey: 'fk_id_gasto',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    GastoUsuario.belongsTo(usuario, {
        foreignKey: 'fk_id_tipo_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    usuario.hasMany(GastoUsuario, {
        foreignKey: 'fk_id_tipo_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    })

    return GastoUsuario;
}