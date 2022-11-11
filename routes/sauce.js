const express = require('express');
const auth = require('auth');
const router = express.Router();    // création de router

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, sauceCtrl.createSauce);        // création d'une sauce en fonction du schéma
router.get('/', auth, sauceCtrl.getAllSauces);        // récupération de la liste de toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce);      // récupération d'une sauce précise en fonction de son id
router.put('/:id', auth, sauceCtrl.modifySauce);      // mise à jour d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);   // suppression d'une sauce

module.exports = router;