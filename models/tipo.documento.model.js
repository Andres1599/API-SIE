module.exports = (sequelize, type) => {
    var TipoDocumento = sequelize.define('tipo_documentos', {
        id_tipo_documento: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_documento: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return TipoDocumento;
}