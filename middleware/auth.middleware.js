const jwt = require('jsonwebtoken')
const config = require('../config/config')
const verifyToken = (req, res, next) => {

    const token = req.get('Authorization');
    jwt.verify(token, config.seed, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid token'
                }
            });
        }

        next();

    });

};

module.exports = {
    verifyToken
};