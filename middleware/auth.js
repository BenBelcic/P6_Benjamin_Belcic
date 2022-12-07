const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // on récupère le token du header d'authorization avec split (il est en 2eme)
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); // on décode le token avec verify, arguments token et la clé secrete
        const userId = decodedToken.userId;                    // on récupère dans le token décodé la propriété userId
        req.auth = {                                           // on crée
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};