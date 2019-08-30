module.exports = (sequelize, type, usuario) => {
    var UserData = sequelize.define('usuarios_datos', {
        nombre: { type: type.STRING(30), allowNull: true },
        apellido: { type: type.STRING(30), allowNull: true },
        dpi: { type: type.STRING(30), allowNull: true },
        puesto: { type: type.STRING(50), allowNull: true },
        NACIONALIDAD: { type: type.STRING(50), allowNull: true },
        EC: { type: type.STRING(50), allowNull: true },
        LNA: { type: type.TEXT, allowNull: true },
        NIT: { type: type.STRING(30), allowNull: true },
        NAIGSS: { type: type.STRING(30), allowNull: true },
        HIJOS: { type: type.INTEGER, allowNull: true },
        PROFESION: { type: type.STRING(30), allowNull: true },
        ETNIA: { type: type.STRING(30), allowNull: true },
        LOCALIZAR: { type: type.TEXT, allogiwNull: true },
        DIRECCION: { type: type.TEXT, allowNull: true },
        TEL: { type: type.INTEGER, allowNull: true },
        MOVIL: { type: type.INTEGER, allowNull: true }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    UserData.belongsTo(usuario, { foreignKey: 'fk_id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    usuario.hasMany(UserData, { foreignKey: 'fk_id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return UserData;
}