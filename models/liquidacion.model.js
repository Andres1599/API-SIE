module.exports = (sequelize, type, assosiation_user, assosiation_coin) => {
    var Liquidacion = sequelize.define('liquidaciones', {
        id_liquidacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_creacion: {
            type: type.DATE,
            dafault: new Date()
        },
        fecha_cierre: {
            type: type.DATE,
            default: null
        },
        correlativo_liquidacion: {
            type: type.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Liquidacion.belongsTo(assosiation_user, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    assosiation_user.hasMany(Liquidacion, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    Liquidacion.belongsTo(assosiation_coin, {
        foreignKey: 'fk_id_moneda',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    assosiation_coin.hasMany(Liquidacion, {
        foreignKey: 'fk_id_moneda',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Liquidacion;
}