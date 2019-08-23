module.exports = {
    develop: {
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        port: process.env.PORT,
        db: process.env.DB_DV,
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
    },
    production: {
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        port: process.env.PORT,
        db: process.env.DB_PR,
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
    }
};