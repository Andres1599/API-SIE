const bcrypt = require('bcryptjs');

const IVA = 0.12
const IDP_SUPER = 4.7
const IDP_DIESEL = 1.3
const IDP_REGULAR = 4.6
const IDP_GAS = 0.5

const RANDOM_ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const CalculateIva = (total) => {
    if (typeof total === 'number') {
        return (total / 1.12) * IVA
    } else {
        return 0
    }
}

const CalculateWithOutIva = (total) => {
    if (typeof total === 'number') {
        return (total / 1.12)
    } else {
        return 0
    }
}

const CalculateIdp = (total, idp) => {
    return total * idp
}

const isArray = (data) => {
    return Array.isArray(data)
}

const changeTypeBill = (type = '') => {

    if (type === '' || type === 'Factura') {
        return 1
    }

    if (type === 'Recibo') {
        return 3
    }

    if (type === 'Factura PC') {
        return 2
    }

}

const changeTypeGas = (type = 0) => {
    if (type === 19 || type === 60) {
        return IDP_SUPER
    }

    if (type === 20 || type === 61) {
        return IDP_DIESEL
    }

    if (type === 22 || type === 62) {
        return IDP_REGULAR
    }

    return 0
}

const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const encrypt = (text) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(text, salt);
        return hash
    } catch (error) {
        return null
    }
}

const decrypt = (text, hash) => {
    try {
        return bcrypt.compareSync(text, hash)
    } catch (error) {
        return false
    }
}

module.exports = {
    IVA,
    IDP_SUPER,
    IDP_DIESEL,
    IDP_REGULAR,
    IDP_GAS,
    RANDOM_ID,
    CalculateIva,
    CalculateWithOutIva,
    CalculateIdp,
    changeTypeBill,
    changeTypeGas,
    isArray,
    groupBy,
    encrypt,
    decrypt
}