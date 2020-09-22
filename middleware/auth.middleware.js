const jwt = require('jsonwebtoken')
const config = require('../config/config')
const verifyToken = (req, res, next) => {

    const token = req.get('Authorization');

    if (!token) {
        res.status(401).json({
            ok: false,
            message: 'Unauthorized'
        })
    }
    jwt.verify(token, config.seed, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Unauthorized'
                }
            });
        }

        req.body.userDecode = decoded

        next();

    });

};

module.exports = {
    verifyToken
};