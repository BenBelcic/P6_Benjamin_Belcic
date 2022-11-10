const express = require('express');
const router = express.Router();    // création de router
const sauceCtrl = require('../controllers/sauce');

router.post('/', sauceCtrl.createSauce);        // création d'une sauce en fonction du schéma
router.get('/', sauceCtrl.getAllSauces);        // récupération de la liste de toutes les sauces
router.get('/:id', sauceCtrl.getOneSauce);      // récupération d'une sauce précise en fonction de son id
router.put('/:id', sauceCtrl.modifySauce);      // mise à jour d'une sauce
router.delete('/:id', sauceCtrl.deleteSauce);   // suppression d'une sauce

module.exports = router;