const _axios = require('axios');
const {
    isArray
} = require('../utils/utilidades');

module.exports = (app, str) => {
    return {
        migrateBills: (req, res) => {
            getBills(req, res, str, _axios, null)
        }
    }
}
/* 
const mapBills = (bills) => {
    try {
        let mapBills = []

        return {
            bills: mapBills,
            error: null
        }
    } catch (error) {
        return {
            bills: [],
            error
        }
    }
} */

function getBills(req, res, str, axios, bills) {
    axios.get('http://190.113.91.36:3000/api/eventos/factura/')
        .then((response) => {
            const data = response.data
            if (isArray(data)) {
                res.json(data.length)
            }
        })
        .catch((error) => {
            res.json(error)
        })
}