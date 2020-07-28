const _axios = require('axios');
const {
    isArray,
    changeTypeBill,
    CalculateIva,
    CalculateWithOutIva,
    changeTypeGas,
    CalculateIdp
} = require('../utils/utilidades');

module.exports = (app, str) => {
    const bills = app.get('factura')
    return {
        migrateBills: (req, res) => {
            getBills(res, str, _axios, bills)
        }
    }
}

const mapBillsIva = (bills = []) => {
    try {
        return bills.map((value) => {
            return {
                id_factura: value.id_factura,
                fecha_compra: value.fecha,
                correlativo_factura: value.no_factura,
                proveedor_factura: value.proveedor,
                ordenes_trabajo: value.orden,
                total_factura: value.total,
                iva_factura: CalculateIva(value.total),
                total_siva: CalculateWithOutIva(value.total),
                total_idp_factura: 0,
                total_sidp_factura: 0,
                total_inguat_factura: 0,
                galones_factura: value.galones,
                exceso_factura: value.sobreGasto,
                status: true,
                fecha_registro_factura: new Date(),
                fk_id_usuario: value.id_usuario,
                fk_id_tipo_documento: changeTypeBill(value.tipo),
                fk_id_moneda: value.id_moneda,
                fk_id_subgasto: value.id_gasto
            }
        });
    } catch (error) {
        return null
    }
}

const mapBillsIvaGas = (bills = []) => {
    try {
        return bills.map((value) => {
            return {
                id_factura: value.id_factura,
                fecha_compra: value.fecha,
                correlativo_factura: value.no_factura,
                proveedor_factura: value.proveedor,
                ordenes_trabajo: value.orden,
                total_factura: value.total,
                iva_factura: CalculateIva((value.total - CalculateIdp(value.galones, changeTypeGas(value.id_gasto)))),
                total_siva: CalculateWithOutIva((value.total - CalculateIdp(value.galones, changeTypeGas(value.id_gasto)))),
                total_idp_factura: CalculateIdp(value.galones, changeTypeGas(value.id_gasto)),
                total_sidp_factura: (value.total - CalculateIdp(value.galones, changeTypeGas(value.id_gasto))),
                total_inguat_factura: 0,
                galones_factura: value.galones,
                exceso_factura: value.sobreGasto,
                status: true,
                fecha_registro_factura: new Date(),
                fk_id_usuario: value.id_usuario,
                fk_id_tipo_documento: changeTypeBill(value.tipo),
                fk_id_moneda: value.id_moneda,
                fk_id_subgasto: value.id_gasto
            }
        });
    } catch (error) {
        return null
    }
}

const mapBillsWithOutIva = (bills = []) => {
    try {
        return bills.map((value) => {
            return {
                id_factura: value.id_factura,
                fecha_compra: value.fecha,
                correlativo_factura: value.no_factura,
                proveedor_factura: value.proveedor,
                ordenes_trabajo: value.orden,
                total_factura: value.total,
                iva_factura: 0,
                total_siva: value.total,
                total_idp_factura: 0,
                total_sidp_factura: 0,
                total_inguat_factura: 0,
                galones_factura: 0,
                exceso_factura: value.sobreGasto,
                status: true,
                fecha_registro_factura: new Date(),
                fk_id_usuario: value.id_usuario,
                fk_id_tipo_documento: changeTypeBill(value.tipo),
                fk_id_moneda: value.id_moneda,
                fk_id_subgasto: value.id_gasto
            }
        });
    } catch (error) {
        return null
    }
}

function getBills(res, str, axios, bills) {
    axios.get('http://190.113.91.36:3000/api/eventos/factura/')
        .then((response) => {
            const data = response.data
            if (isArray(data)) {
                const billsWithOutIva = mapBillsWithOutIva(data.filter(value => value.tipo === 'Recibo' || value.tipo === 'Factura PC'))
                const billsWithIva = mapBillsIva(data.filter(value => value.tipo === 'Factura' && value.galones === 0))
                const billsGas = mapBillsIvaGas(data.filter(value => value.tipo === 'Factura' && value.galones !== 0))

                let dataBills = billsWithOutIva.concat(billsWithIva).concat(billsGas)
                let dataSend = arrayOfArray(dataBills)

                createBills(res, str, bills, dataSend)
            }
        })
        .catch((error) => {
            res.json(error)
        })
}

function arrayOfArray(data = []) {
    try {
        let dataSend = [];
        let dataNested = []
        let cont = 0

        data.forEach((value, index) => {

            dataNested.push(value);

            if (cont === 100) {
                dataSend.push(dataNested)
                dataNested = []
                cont = 0;
            } 

            if (index === (data.length - 1)) {
                dataSend.push(dataNested)
                dataNested = []
                cont = 0;
            }

            cont += 1
        })

        return dataSend

    } catch (error) {
        console.log(error)
        return [];
    }
}

function createBills(res, str, bills, dataBills = []) {
    try {
        dataBills.forEach((value) => {
            bills.bulkCreate(value).then(billsCreated => {
                if (!billsCreated) {
                    res.json(billsCreated)
                }
            })
        })

        res.json({
            message: 'Data migrated successfully'
        })
    } catch (error) {
        res.json(error);
    }
}

function migrateLiquidations(req, res, liquidation) {
    
}