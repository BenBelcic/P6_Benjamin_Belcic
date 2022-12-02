const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const checkPassword = require("../middleware/password"); //import du validateur de password

router.post('/signup', checkPassword, userCtrl.signup);    
router.post('/login', userCtrl.login);      

module.exports = router;