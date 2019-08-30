module.exports = (sequelize, type, planilla, usuario) => {
    var ReciboPlanilla = sequelize.define('planilla_recibo', {
        id_recibo_planilla: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        num_afili_planilla: { type: type.STRING },
        salario_planilla: { type: type.DOUBLE },
        pago_adicional: { type: type.DOUBLE },
        pago_vacacione: { type: type.DOUBLE },
        horas: { type: type.DOUBLE },
        dias_remu: { type: type.DOUBLE },
        dias_vacaciones: { type: type.DOUBLE },
        cod: { type: type.DOUBLE },
        aporte_labora: { type: type.DOUBLE },
        aporte_patronal: { type: type.DOUBLE },
        aporte_total: { type: type.DOUBLE },
        prestamo: { type: type.DOUBLE },
        anticipo: { type: type.DOUBLE }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    ReciboPlanilla.belongsTo(planilla, {
        foreignKey: 'fk_id_planilla',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    planilla.hasMany(ReciboPlanilla, {
        foreignKey: 'fk_id_planilla',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    ReciboPlanilla.belongsTo(usuario, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });
    usuario.hasMany(ReciboPlanilla, {
        foreignKey: 'fk_id_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return ReciboPlanilla;
}