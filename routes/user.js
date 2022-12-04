const express = require('express');
const router = express.Router(); // création de routeur grâce à express
const userCtrl = require('../controllers/user'); 
const checkEmail = require("../middleware/email"); //import du validateur d'email
const checkPassword = require("../middleware/password"); //import du validateur de password

router.post('/signup', checkEmail, checkPassword, userCtrl.signup);   
router.post('/login', userCtrl.login);      

module.exports = router;