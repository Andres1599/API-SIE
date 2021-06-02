module.exports = (sequelize, type, SubCuenta) => {
    const MovimientoSubcuenta = sequelize.define('movimiento_cuenta', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: type.DATE,
            allowNull: false,
            default: new Date()
        },
        cargo: {
            type: type.FLOAT,
            allowNull: false,
            default: 0
        },
        abono: {
            type: type.FLOAT,
            allowNull: false,
            default: 0
        },
        saldo_actual: {
            type: type.FLOAT,
            allowNull: false,
            default: 0
        },
        comentario: {
            type: type.TEXT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    MovimientoSubcuenta.belongsTo(SubCuenta, { foreignKey: 'fk_id_subcuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    SubCuenta.hasMany(MovimientoSubcuenta, { foreignKey: 'fk_id_subcuenta', onDelete: 'SET NULL', onUpdate: 'SET NULL' })

    return MovimientoSubcuenta;
}