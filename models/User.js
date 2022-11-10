const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true }, // adresse e-mail de l'user [unique]
    password: { type: String, required: true }, // mot de passe de l'user haché
});

module.exports = mongoose.model('User', userSchema);