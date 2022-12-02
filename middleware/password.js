const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le MDP doit faire 8 caractères au minimum, 30 max, avec une maj, une min et un chiffre au moins.' });
    } else {
        next();
    }
};