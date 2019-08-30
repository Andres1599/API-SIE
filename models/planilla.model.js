module.exports = (sequelize, type, assosiation_pais, assosiation_moneda, assosiation_empresa) => {
    var Planilla = sequelize.define('planillas', {
        id_planilla: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_planilla: {
            type: type.STRING,
            defaultValue: 'Nueva Planilla'
        },
        fecha_emision_planilla: {
            type: type.DATE,
            defaultValue: new Date()
        },
        fecha_creacion_planilla: {
            type: type.DATE,
            defaultValue: new Date()
        },
        periodo_fiscal_planilla: {
            type: type.STRING,
            allowNull: true
        },
        periodo_pago_planilla: {
            type: type.STRING,
            allowNull: true
        },
        tipo_planilla: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Planilla.belongsTo(assosiation_empresa, { foreignKey: 'fk_id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiation_empresa.hasMany(Planilla, { foreignKey: 'fk_id_empresa', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    Planilla.belongsTo(assosiation_moneda, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiation_moneda.hasMany(Planilla, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    Planilla.belongsTo(assosiation_pais, { foreignKey: 'fk_id_pais', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    assosiation_pais.hasMany(Planilla, { foreignKey: 'fk_id_pais', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return Planilla;
}