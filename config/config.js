module.exports = {
    develop: {
        user: process.env.USER_DB || 'root',
        password: process.env.PASS_DB || '',
        port: process.env.PORT || 4000,
        db: process.env.DB_DV || 'test',
        db_: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 20,
                min: 0,
                idle: 10000
            }
        },
        status: true
    },
    production: {
        user: process.env.USER_DB || 'adminsie',
        password: process.env.PASS_DB || 'adminpass',
        port: process.env.PORT || 4001,
        db: process.env.DB_PR || 'sie_produc',
        db_: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 20,
                min: 0,
                idle: 10000
            }
        },
        status: false
    }
};