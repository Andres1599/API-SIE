module.exports = (sequelize, type, orden, usuario) => {
    var OrdenUsuario = sequelize.define('orden_usuario', {
        id_orden_usuario: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        encargado_orden: { type: type.BOOLEAN, allowNull: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    OrdenUsuario.belongsTo(orden, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });

    orden.hasMany(OrdenUsuario, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    OrdenUsuario.belongsTo(usuario, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    });

    usuario.hasMany(OrdenUsuario, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return OrdenUsuario;
}