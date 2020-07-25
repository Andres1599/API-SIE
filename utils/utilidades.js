const IVA = 0.12

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

module.exports = {
    IVA,
    RANDOM_ID,
    CalculateIva,
    CalculateWithOutIva
}