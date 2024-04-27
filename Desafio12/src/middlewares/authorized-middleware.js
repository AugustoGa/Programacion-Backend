const jwt = require('jsonwebtoken');
const HTTP_RESPONSES = require('../contants/http-responses');
const { mySecret } = require('../config/db.config')

function authenticated(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(HTTP_RESPONSES.UNAUTHORIZED).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }
    try {
        const code = jwt.verify(token, process.env.mySecret);
        req.user = code.user;
        next();
    } catch (error) {
        return res.status(HTTP_RESPONSES.UNAUTHORIZED).json({ message: 'Acceso no autorizado. Token inválido.' });
    }
}

module.exports = authenticated;