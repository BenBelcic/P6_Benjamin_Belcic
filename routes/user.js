const express = require('express');
const router = express.Router();

const User = require('../models/User'); //import du modèle User


// création d'un user en fonction du schéma
router.post('/signup', (req, res, next) => {
    const user = new User({        // création d'une nouvelle instance du modèle User
        ...req.body                  // contenant tous les champs du body de la request
    });
    user.save()                     // enregistrement du schéma Thing dans la database
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) // on renvoie une réponse (pour que la requête n'expire pas) de status 201 (bonne création de ressource)
    .catch(error => res.status(400).json({ error }));  // on renvoie un code d'error
});

// création d'un user en fonction du schéma
router.post('/login', (req, res, next) => {
    const user = new User({
        ...req.body
    });
    user.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) 
    .catch(error => res.status(400).json({ error }));  
});


module.exports = router;