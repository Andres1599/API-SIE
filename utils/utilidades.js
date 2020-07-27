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
    isArray
}