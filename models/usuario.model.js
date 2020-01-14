module.exports = (sequelize, type, assosiation) => {
    var Usuarios = sequelize.define('usuarios', {
        id_usuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        status: {
            type: type.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Usuarios.belongsTo(assosiation, {
        foreignKey: 'fk_id_tipo',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT' 
    });

    assosiation.hasMany(Usuarios, {
        foreignKey: 'fk_id_tipo',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    return Usuarios;
}