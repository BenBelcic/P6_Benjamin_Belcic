const bcrypt = require('bcrypt');

const User = require('../models/User'); //import du modèle User

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // fonction hash crypte le password du body de la req, salt à 10 exécutions de l'algo hash
        .then(hash => {                // récup le hash du password
            const user = new User({    // on enregistre le hash dans un nouveau user avec le model mongoose
                email: req.body.email,
                password: hash         // on enregistre le hash du password et pas le password en blanc
            });
            user.save()                // on save le user dans la base de donnée
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // ressource créée
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // error de serveur
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })                         // on cherhce un user qui correspond à l'email de l'user
        .then(user => {                                             // si la requête réussie
            if (!user) {                                            // si l'user n'existe pas
                res.status(401).json({ message: 'identification incorrecte' });
            } else {                                                // si l'user existe
                bcrypt.compare(req.body.password, user.password)    // on compare le mdp fourni par le mdp de la database
                    .then(valid => {                                // error
                        if (!valid) {                               // si mdp invalide
                            res.status(401).json({ message: 'identification incorrecte' });
                        } else {                                    // si mdp correct
                            res.status(200).json({                  // code OK avec les infos d'authentification utilisés par la database
                                userId: user._id,
                                token: 'TOKEN'                      //
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};