const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: 'User is not authorized!' });
            }
            req.user = decoded.user;
            next();
        });

        if (!token) {
            return res.status(401).json({ message: 'User is not authorized or the token is missing!' });
        }
    }
});

module.exports = validateToken;