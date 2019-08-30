module.exports = (sequelize, type, assosiation) => {
    var SubGasto = sequelize.define('catalogo_subgasto', {
        id_subgasto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_subgasto: {
            type: type.STRING,
            allowNull: false
        },
        gasto_max: {
            type: type.DOUBLE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    SubGasto.belongsTo(assosiation, {
        foreignKey: 'fk_id_gasto',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    assosiation.hasMany(SubGasto, {
        foreignKey: 'fk_id_gasto',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return SubGasto;
}