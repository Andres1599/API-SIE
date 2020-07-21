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


    return {
        createOrder: (req, res, next) => {
            createOrder(req, res, next, str, orderPerDiem)
        },
        createOrderBudget: (req, res, next) => {
            createBudget(req, res, next, str, budgetPerDiem)
        },
        createOrderUsers: (req, res, next) => {
            createUsers(req, res, str, next, usersPerDiem)
        },
        createOrderOrders: (req, res, next) => {
            createOrders(req, res, next, str, ordersPerDiem)
        },
        create: (req, res) => {
            createPerDiem(req, res, str)
        },
        update: (req, res) => {},
        delete: (req, res) => {},
        getById: (req, res) => {},
        getAll: (req, res) => {
            getAll(req, res, str, orderPerDiem, orderDeposit, orderLiquidation, usersPerDiem, ordersPerDiem, budgetPerDiem, country, company, coin, user, userData)
        },
        getAllClient: (req, res) => {
            getAllClientName(req, res, str, orderPerDiem)
        },
        max: (req, res, next) => {
            correlativeCompany(req, res, next, str, orderPerDiem)
        }
    }
}

/**
 * @description create header order
 * @param {*} req 
 * @param {*} res 
 * @param {*} str 
 * @param {*} ordenViaticos 
 */
function createOrder(req, res, next, str, orderPerDiem) {
    let orderBroadcast = req.body
    let orderReq = req.body.order
    

    orderPerDiem.create({
        fecha: new Date(),
        fecha_salida: addHours(orderReq.fecha_salida),
        fecha_regreso: addHours(orderReq.fecha_regreso),
        cliente: orderReq.cliente.cliente,
        correlativo: orderReq.correlativo,
        status: false,
        fk_id_empresa: orderReq.empresa_moneda.empresa.id_empresa,
        fk_id_pais: orderReq.pais.id_pais,
        fk_id_moneda: orderReq.empresa_moneda.moneda.fk_id_moneda
    }).then(header => {
        if (header) {
            req.body = transformData(orderBroadcast, header.id_orden_viaticos)
            next();
        } else {
            res.status(400).json(new response(false, str.createErr, null, orderBroadcast))
        }
    }).catch(err => {
        res.status(500).json(new response(false, str.errCatch, err.message, orderBroadcast))
    })
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
 * @description create budget per diem
 * @param {*} req 
 * @param {*} res 
 * @param {*} str 
 * @param {*} next 
 * @param {*} budget 
 */
function createBudget(req, res, next, str, budget) {
    let orderBroadcast = req.body
    budget.bulkCreate(orderBroadcast.budget).then(budgets => {
        if (budgets) {
            req.body = {
                orders: orderBroadcast.orders,
                users: orderBroadcast.users
            }
            next()
        } else {
            res.status(400).json(new response(false, str.createErr, null, orderBroadcast))
        }
    }).catch(err => {
        res.status(500).json(new response(false, str.errCatch, err.message, orderBroadcast))
    })
}

/**
 * @description create users per diem
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} users 
 */
function createUsers(req, res, str, next, users) {
    let orderBroadcast = req.body;

    users.bulkCreate(orderBroadcast.users).then(user => {
        if (user) {
            req.body = {
                orders: orderBroadcast.orders,
            }
            next()
        } else {
            res.status(400).json(new response(false, str.createErr, null, orderBroadcast))
        }
    }).catch(err => {
        res.status(500).json(new response(false, str.errCatch, err.message, orderBroadcast))
    })

}

/**
 * @description create orders per diem
 * @param {*} req 
 * @param {*} res `
 * @param {*} next 
 * @param {*} str 
 * @param {*} orders 
 */
function createOrders(req, res, next, str, orders) {
    let orderBroadcast = req.body;
    orders.bulkCreate(orderBroadcast.orders).then(order => {
        if (order) {
            req.body = {
                create: true,
            }
            next()
        } else {
            res.status(400).json(new response(false, str.createErr, null, orderBroadcast))
        }
    }).catch(err => {
        res.status(500).json(new response(false, str.errCatch, err.message, orderBroadcast))
    })
}


function createPerDiem(req, res, str) {
    let orderBroadcast = req.body;
    if (orderBroadcast.create) {
        res.status(201).json(new response(true, str.create, null, null))
    } else {
        res.status(400).json(new response(false, str.createErr, null, null))
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
                        include: [{model: userData}]
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

/**
 *
 * @description get last correlative from order per diem
 * @param {*} req
 * @param {*} res
 * @param {*} str
 * @param {*} orderPerDiem
 */
function correlativeCompany(req, res, next, str, orderPerDiem) {

    let orderBroadcast = req.body;

    if (!orderBroadcast.order) {
        res.status(400).json(new response(false, str.paramsErr, err.message, orderBroadcast))
    }

    orderPerDiem.max('correlativo', {
        where: {
            fk_id_empresa: orderBroadcast.order.empresa_moneda.empresa.id_empresa
        }
    }).then(company => {

        if (company) {

            orderBroadcast.order.correlativo = ((company * 1) + 1);

            req.body = orderBroadcast
            next()
        } else {
            res.status(400).json(new response(false, str.getErr, err.message, orderBroadcast))
        }

    }).catch(err => {
        res.json(new response(false, str.errCatch, err.message, null))
    })
}

function addHours(date) {
    const dateOut = new Date(date);
    dateOut.setHours(dateOut.getHours() + 6);
    return dateOut
}