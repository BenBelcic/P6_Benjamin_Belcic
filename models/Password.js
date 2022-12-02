const passwordValidator = require('password-validator'); //import package password-validator pour valider les passwords

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                            //min 8 caractères        
.is().max(30)                           //max 30 caractères       
.has().uppercase()                      //contient une majuscule au moins        
.has().lowercase()                      //contient une minuscule au moins       
.has().digits()                         //contient une un chiffre au moins       
.has().not().spaces()                   //pas d'espace 

module.exports = passwordSchema; //export du modèle