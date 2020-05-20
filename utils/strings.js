/**
 * @description
 * strings return values default
 * @publicApi
 */
const STR = {
    create: 'Query create successful',
    update: 'Query update successful',
    delete: 'Query delete successful',
    createErr: 'Query create fail',
    updateErr: 'Query update fail',
    deleteErr: 'Query delete fail',
    errCatch: 'Internal server error',
    getErr: 'Query result fail',
    getAll: 'Query result successful',
    get: 'Specific query result successful',
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

module.exports = {
    STR
};