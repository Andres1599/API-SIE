const _axios = require('axios');
const {
    isArray,
    changeTypeBill,
    CalculateIva,
    CalculateWithOutIva,
    changeTypeGas,
    CalculateIdp,
    groupBy
} = require('../utils/utilidades');

module.exports = (app, str) => {
    const bills = app.get('factura')
    const liquidation = app.get('liquidacion')
    const billLiquidation = app.get('liquidacion_factura')
    return {
        migrateBills: (req, res) => {
            getBills(res, str, _axios, bills)
        },
        migrateLiquidation: (req, res) => {
            migrateLiquidations(res, _axios, liquidation, billLiquidation)
        },
        migrateUpdateLiquidation: (req, res) => {
            updateLiquidations(res, _axios, liquidation)
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


function sortData(data = [], ) {
    try {
        return data.sort((a, b) => {
            if (a.id_lq > b.id_lq) {
                return 1
            }

            if (a.id_lq < b.id_lq) {
                return -1
            }

            return 0
        })
    } catch (error) {
        return []
    }
}

function dataSorted(data = [], keys = []) {
    try {
        let dataResponse = []
        keys.forEach(value => {
            dataResponse.push(sortData(data[value]))
        })

        return dataResponse
    } catch (error) {
        return []
    }
}

function groupByIdLiquidation(data = []) {
    try {
        let dataResponse = []
        data.forEach(value => {
            dataResponse.push(groupBy(value, 'id_lq'))
        })

        return dataResponse
    } catch (error) {
        return []
    }
}

function migrateLiquidations(res, axios, liquidation, billLiquidation) {
    axios.get('http://190.113.91.36:3000/api/eventos/liquidacion/')
        .then((response) => {
            const data = response.data
            if (isArray(data)) {

                // group by user
                const dataSend = groupBy(data, 'id_usuario')

                // get key values from object
                const dataKeys = Object.getOwnPropertyNames(dataSend) || [];

                // sort array's 
                const dataSort = dataSorted(dataSend, dataKeys)

                // group by id liquidation by user
                const dataGroupUserLiquidation = groupByIdLiquidation(dataSort)

                prepareLiquidation(res, liquidation, billLiquidation, dataGroupUserLiquidation)
            }
        })
        .catch((error) => {
            res.json(error)
        })
}

function prepareLiquidation(res, liquidation, billLiquidation, data = []) {
    try {

        let listLiquidations = []
        let totalBills = 0
        // round user
        data.forEach(value => {
            const propertyName = Object.getOwnPropertyNames(value) // ['1', '2', ...] represent liquidation
            // access to liquidation that represent by property name
            propertyName.forEach(key => {
                const liquidationHeader = { // transform to liquidation header
                    id_liquidacion: value[key][0].id_lq,
                    fecha: null,
                    fecha_cierra: null,
                    estado: false,
                    id_usuario: value[key][0].id_usuario,
                    id_empresa: null,
                    id_moneda: value[key][0].id_moneda,
                    id_tipo_liquidacion: 1
                }

                const billsPerLiquidation = value[key].map(bill => {
                    return {
                        id_factura: bill.id_factura
                    }
                })

                liquidationHeader.item_liquidacions = billsPerLiquidation

                totalBills += value[key].length

                listLiquidations.push(liquidationHeader)
            })
        })

        createLiquidation(res, liquidation, billLiquidation, listLiquidations)

    } catch (error) {
        res.json(error)
    }

}

function createLiquidation(res, liquidation, billLiquidation, data = []) {
    try {
        data.forEach(value => {
            liquidation.create(value, {
                include: [{
                    model: billLiquidation,
                    as: 'item_liquidacions'
                }]
            }).then(created => {
                if (!created) {
                    res.json(created)
                }
            }).catch(error => {
                res.json(error)
            })
        })

        res.json({
            message: 'Create liquidations'
        })
    } catch (error) {
        res.json(error)
    }
}

function transformData(data = []) {
    try {
        return data.map(value => {
            return {
                where: {
                    id_liquidacion: value.id_liquidacion,
                    id_usuario: value.id_usuario
                },
                data: {
                    fecha: value.fecha,
                    fecha_cierra: value.fecha_cierre,
                    estado: (value.id_estado === 7) ? true : false,
                    id_empresa: (value.id_empresa === null) ? 6 : value.id_empresa
                }
            }
        })
    } catch (error) {
        return []
    }
}

function updateLiquidations(res, axios, liquidation) {
    axios.get('http://190.113.91.36:3000/api/eventos/migrate/liquidation')
        .then(response => {
            const data = response.data
            if (isArray(data)) {

                // transform data to update liquidations
                const dataLiquidation = transformData(data)

                dataLiquidation.forEach( value =>{
                    liquidation.update(value.data, {
                        where: value.where
                    }).then( updated => {
                        if (!updated) {
                            res.json(updated)
                        }
                    })
                })

                res.json({
                    message: 'Update liquidation'
                })
            }
        }).catch(error => {
            res.json(error)
        })
}