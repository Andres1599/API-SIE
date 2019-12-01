/**
 * @description
 * strings return values default
 * @publicApi
 */
const STR = {
    create: 'Se ha creado exitosamente.',
    update: 'Se ha actualizado exitosamente.',
    delete: 'Se ha eliminado exitosamente.',
    createErr: 'No se ha podido crear.',
    updateErr: 'No se ha podido actualizar.',
    deleteErr: 'No se ha podido eliminar.',
    getErr: 'Error al obtener el elemento.',
    getAll: 'Se a obtenido exitosamente los registros.',
    get: 'Consulta exitosa.',
    /**
     * @description
     * Check if object is empty like this {}
     * @returns `boolean`
     * @publicApi
     */
    isEmpty: (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },
    /**
     * @description
     * Push a new attribute on object
     * @params `{key:'name',value:'value'}`
     * @publicApi
     */
    pushItem: (items) => {
        let obj = {};
        for (var key in items) {
            obj[items[key].key] = items[key].value
        }
        return obj;
    }
}

module.exports = STR;