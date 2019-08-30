module.exports = (sequelize, type, assosiation_user, assosiation_type) => {
    var Factura = sequelize.define('facturas', {
        id_factura: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_compra: {
            type: type.DATE,
            allowNull: false,
            default: new Date()
        },
        correlativo_factura: {
            type: type.STRING,
            allowNull: false
        },
        proveedor_factura: {
            type: type.STRING,
            allowNull: true
        },
        total_factura: {
            type: type.DOUBLE,
            allowNull: false
        },
        iva_factura: {
            type: type.DOUBLE,
            allowNull: true,
            default: (this.total_factura / 1.12) * 0.12
        },
        total_siva: {
            type: type.DOUBLE,
            allowNull: true,
            default: (this.total_factura / 1.12)
        },
        total_idp_factura: {
            type: type.DOUBLE,
            allowNull: true,
            default: 0
        },
        total_sidp_factura: {
            type: type.DOUBLE,
            allowNull: true,
            default: 0
        },
        total_inguat_factura: {
            type: type.DOUBLE,
            allowNull: true,
            default: 0
        },
        galones_factura: {
            type: type.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        exceso_factura: {
            type: type.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: type.BOOLEAN,
            default: true
        },
        fecha_registro_factura: {
            type: type.DATE,
            default: new Date()
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Factura.belongsTo(assosiation_user, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    assosiation_user.hasMany(Factura, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    Factura.belongsTo(assosiation_type, {
        foreignKey: 'fk_id_tipo_documento',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    assosiation_type.hasMany(Factura, {
        foreignKey: 'fk_id_tipo_documento',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Factura;
}