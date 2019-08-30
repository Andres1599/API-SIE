module.exports = (sequelize, type, usuario) => {
    var Cuenta = sequelize.define('cuentas', {
        id_cuenta: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Cuenta.belongsTo(usuario, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    usuario.hasMany(Cuenta, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Cuenta;
}