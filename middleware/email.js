const validator = require('validator');

module.exports = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(400).json({ message: ` '${req.body.email}' n'est pas un email valide !` });
    } else {
        next();
    }
};