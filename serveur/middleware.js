const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secret_key', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalide' });
            }
            req.userId = decoded.userId;
            next();
        });
    } else {
        return res.status(403).json({ message: 'Token manquant' });
    }
};


module.exports = {
    verifyToken
};