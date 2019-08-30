module.exports = (sequelize, type, orden, usuario) => {
    var OrdenUsuario = Sequelize.define('orden_usuario', {
        id_orden_usuario: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        encargado_orden: { type: type.BOOLEAN, allowNull: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    orden.belongsToMany(usuario, {
        foreignKey: 'fk_id_orden',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: OrdenUsuario
    });

    usuario.belongsToMany(orden, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        through: OrdenUsuario
    });

    return OrdenUsuario;
}