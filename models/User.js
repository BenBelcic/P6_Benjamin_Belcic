const mongoose = require('mongoose');

// import du plugin uniqueValidator 
const uniqueValidator = require('mongoose-unique-validator'); 

const userSchema = mongoose.Schema({
    email: { type: String, required:true, unique: true },
    password: { type: String, required: true }
});

// on applique le plugin uniqueValidator au schema 
userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model('User', userSchema);