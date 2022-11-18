const bcrypt = require('bcrypt'); // import bcrypt
const jwt = require('jsonwebtoken'); // import package jsonwebtoken

const User = require('../models/User'); //import du modèle User

// inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // fonction hash crypte le password du body de la req, salt à 10 exécutions de l'algo hash
        .then(hash => {                  // récup le hash du password
            const user = new User({        // on enregistre le hash dans un nouveau user avec le model mongoose
                email: req.body.email,
                password: hash               // on enregistre le hash du password et pas le password en blanc
            });
            user.save()                    // on save le user dans la base de donnée
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })                     // on cherhce un user qui correspond à l'email de l'user
        .then(user => {                                         // si la requête réussie
            if (!user) {                                        // si l'user n'existe pas
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }                                                   // si l'user existe
            bcrypt.compare(req.body.password, user.password)    // on compare le mdp fourni par le mdp de la database
                .then(valid => {
                    if (!valid) {                               // si mdp correct
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }                                           // si mdp correct
                    res.status(200).json({                      // code OK avec les infos d'authentification utilisés par la database
                        userId: user._id,
                        token: jwt.sign(                        // fonction sign de jwt qui prends des arguments :
                            { userId: user._id },               // objet pour que la req corresponde à l'userId
                            'RANDOM_TOKEN_SECRET',              // la clé secrète pour l'encodage
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


