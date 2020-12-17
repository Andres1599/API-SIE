require('dotenv').config();
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
            },
            logging: false
        },
        status: true
    },
    production: {
        user: process.env.USER_DB_PR,
        password: process.env.PASS_DB_PR,
        port: process.env.PORT_PR,
        db: process.env.DB_PR_PR,
        db_: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 20,
                min: 0,
                idle: 10000
            },
            logging: false
        },
        status: false
    },
    seed: process.env.SEED
};