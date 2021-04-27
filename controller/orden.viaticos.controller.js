const response = require('../response/response')
module.exports = function (app, str) {

    const orderPerDiem = app.get('orden_viaticos');
    const orderDeposit = app.get('orden_deposito')
    const orderLiquidation = app.get('orden_liquidacion')
    const usersPerDiem = app.get('orden_usuario')
    const ordersPerDiem = app.get('orden_orden')
    const budgetPerDiem = app.get('orden_presupuesto')
    const country = app.get('pais')
    const company = app.get('empresa')
    const coin = app.get('moneda')
    const user = app.get('usuario')
    const userData = app.get('usuario_datos')
    const deposito = app.get('deposito')
    const liquidation = app.get('liquidacion')

    return {
        createOrder: (req, res, next) => { createOrder(req, res, next, str, orderPerDiem) },
        create: (req, res) => { createPerDiem(req, res, str) },
        update: (req, res) => { updateOrder(req, res, str, orderPerDiem) },
        delete: (req, res) => { deleteOrder(req, res, str, orderPerDiem, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem) },
        getById: (req, res) => { getByIdFull(req, res, str, orderPerDiem, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem, country, company, coin, user, userData, deposito, liquidation) },
        getAll: (req, res) => {
            getAll(req, res, str, orderPerDiem, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem, country, company, coin, user, userData)
        },
        getAllClient: (req, res) => { getAllClientName(req, res, str, orderPerDiem) }
    }
}

async function createOrder(req, res, str, orderPerDiem) {
    try {
        const orden = req.body;

        const correlativo = await orderPerDiem.max('correlativo', { where: { fk_id_empresa: orden.fk_id_empresa } })

        const newOrdenViaticos = await orderPerDiem.create({
            fecha: new Date(),
            fecha_salida: addHours(orden.fecha_salida),
            fecha_regreso: addHours(orden.fecha_regreso),
            cliente: orden.cliente,
            correlativo: ((correlativo * 1) + 1),
            status: false,
            fk_id_empresa: orden.fk_id_empresa,
            fk_id_pais: orden.fk_id_pais,
            fk_id_moneda: orden.fk_id_moneda
        });

        res.json(new response(true, str.create, null, newOrdenViaticos))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

/**
 * @description transform data, add id order per diem to the arrays
 * @param {*} orderBroadcast 
 * @param {*} id 
 */
function transformData(orderBroadcast, id) {
    try {
        let object = {
            users: [],
            budget: [],
            orders: []
        }

        if (Array.isArray(orderBroadcast.users)) {
            object.users = orderBroadcast.users.map(user => {
                return {
                    fk_id_usuario: user.fk_id_usuario,
                    encargado_orden: user.encargado_orden,
                    fk_id_orden: id
                }
            })
        }

        if (Array.isArray(orderBroadcast.budget)) {
            object.budget = orderBroadcast.budget.map(budget => {
                return {
                    observaciones: budget.observaciones,
                    gasto: budget.gasto,
                    dias: budget.dias,
                    valor: budget.valor,
                    total: budget.total,
                    fk_id_orden_viaticos: id
                }
            })
        }

        if (Array.isArray(orderBroadcast.budget)) {
            object.orders = orderBroadcast.orders.map(order => {
                return {
                    orden: order.orden,
                    fk_id_orden: id
                }
            })
        }

        return object

    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} str 
 * @param {*} ordenViaticos 
 * @param {*} orderDeposit 
 * @param {*} orderLiquidation 
 * @param {*} usersPerDiem 
 * @param {*} ordersPerDiem 
 * @param {*} budgetPerDiem 
 */
function getAll(req, res, str, ordenViaticos, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem, country, company, coin, user, userData) {
    ordenViaticos.findAll({
        include: [{
            model: ordersPerDiem
        },
        {
            model: orderDeposit
        },
        {
            model: usersPerDiem,
            include: [{
                model: user,
                include: [{ model: userData }]
            }]
        },
        {
            model: budgetPerDiem
        },
        {
            model: orderLiquidation
        },
        {
            model: country
        },
        {
            model: company
        },
        {
            model: coin
        },
        ]
    }).then((ordenes) => {
        if (ordenes) {
            res.json(new response(true, str.get, null, ordenes))
        } else {
            res.json(new response(false, str.getErr, null, ordenes))
        }
    })
        .catch(err => {
            res.json(new response(false, str.errCatch, err.message, null))
        })
}

/**
 * @description get clients name from orders per diem
 * @param {*} req 
 * @param {*} res 
 * @param {*} str 
 * @param {*} orderPerDiem 
 */
function getAllClientName(req, res, str, orderPerDiem) {
    orderPerDiem.aggregate('cliente', 'DISTINCT', {
        plain: false
    }).then((names) => {
        if (names) {
            res.json(new response(true, str.get, null, names))
        } else {
            res.json(new response(false, str.getErr, null, names))
        }
    })
        .catch(err => {
            res.json(new response(false, str.errCatch, err.message, null))
        })
}

function addHours(date) {
    const dateOut = new Date(date);
    dateOut.setHours(dateOut.getHours() + 6);
    return dateOut
}

async function getByIdFull(req, res, str, ordenViaticos, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem, country, company, coin, user, userData, deposito, liquidation) {

    try {

        const ordenes = await ordenViaticos.findOne({
            where: {
                id_orden_viaticos: req.params.id
            },
            include: [
                ordersPerDiem,
                budgetPerDiem,
                country,
                company,
                coin,
                { model: usersPerDiem, include: [{ model: user, include: [userData] }] },
                { model: orderDeposit, include: [{ model: deposito, include: [coin] }] },
                {
                    model: orderLiquidation, include: [{ model: liquidation, include: [coin, { model: user, include: [userData] }] }]
                },
            ]
        })

        res.json(new response(true, str.get, null, ordenes))

    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, err.message, null))
    }
}

async function deleteOrder(req, res, str, orderPerDiem, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem) {
    try {
        const idOrder = req.params.id
        await orderDeposit.destroy({ where: { fk_id_orden: idOrder } })
        await orderLiquidation.destroy({ where: { fk_id_orden: idOrder } })
        await budgetPerDiem.destroy({ where: { fk_id_orden_viaticos: idOrder } })
        await usersPerDiem.destroy({ where: { fk_id_orden: idOrder } })
        await ordersPerDiem.destroy({ where: { fk_id_orden: idOrder } })
        await orderPerDiem.destroy({ where: { id_orden_viaticos: idOrder } })

        res.json(new response(true, str.delete, null, true))

    } catch (error) {
        res.json(new response(false, str.errCatch, err.message, null))
    }
}

async function updateOrder(req, res, str, orderPerDiem) {
    try {
        const updated = await orderPerDiem.update({
            fecha_salida: addHours(req.body.fecha_salida),
            fecha_regreso: addHours(req.body.fecha_regreso),
            cliente: req.body.cliente,
            fk_id_pais: req.body.fk_id_pais
        }, {
            where: {
                id_orden_viaticos: req.body.id_orden_viaticos
            }
        })

        res.json(new response(true, str.update, null, updated))

    } catch (error) {
        res.json(new response(false, str.errCatch, err.message, null))
    }
}