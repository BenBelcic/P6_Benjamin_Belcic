const fs = require('fs');
const Sauce = require('../models/Sauce'); //import du modèle Sauce

// récupération de la liste de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // on cherche toute la liste des objets dans Thing (pas de param entre () pour affiner la recherche)
    .then(sauces => res.status(200).json(sauces))  // on récupère le tableau things des objets, et on le renvoie avec un code 200
    .catch(error => res.status(500).json({ error })); 
};

// création d'une sauce en fonction du schéma
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() =>  res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }))
};

// récupération d'une sauce précise en fonction de son id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) // on passe un objet de comparaison pour que l'id de l'objet clic soit le même que l'id de URI
    .then(sauce => res.status(200).json(sauce))  // on récupère l'objet sauce, et on le renvoie avec un code 200
    .catch(error => res.status(404).json({ error })); // 404 car objet non trouvé
};

// modification d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {                                                    // check si le fichier existe dans la req
        ...JSON.parse(req.body.sauce),                                                  // si oui on récup l'objet en parse la string
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`    // et en recréant l'url
    } : { ...req.body };                                                                // sinon on va juste recupe l'objet du corps de la req
    Sauce.findOne({_id: req.params.id})                                                 // recup objet en bdd
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(403).json({ message: '403: unauthorized request.' });
        } else {
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'sauce modifiée' }))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch(error => res.status(400).json({ error }));
};

// suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};













// Like et dislike une sauce
exports.rateSauce = (req, res, next) => {


    // Like
    if(req.body.like === 1) {
        Sauce.findOne({ _id: req.params.id }) 
            .then((sauce) => {
                // si le tableau des users ayant liké ne contient pas l'userId
                if(!sauce.usersLiked.includes(req.body.userId)) {
                    // on va update 
                    Sauce.updateOne(
                        // cette sauce
                        { _id: req.params.id },
                        //  // On met le user dans le tableau des users ayant liké, et incrémenter les likes de 1
                        { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
                      )
                    .then(() => res.status(201).json({ message: 'Vous avez liké cette sauce!'}))
                    .catch((error) => res.status(400).json({ error }));
                }
            })
        .catch((error) => res.status(400).json({ error }));
    }


    // Annulation Like ou Dislike
    if(req.body.like===0) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if(sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
                      )
                    .then(() => res.status(201).json({ message: 'Votre avez retiré votre Like'}))
                    .catch((error) => res.status(400).json({ error }));
                }

                if(sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } }
                      )
                    .then(() => res.status(201).json({ message: 'Votre avez retiré votre Dislike'}))
                    .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }


        // Dislike
        if(req.body.like === -1) {
            Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if(!sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $push: { usersLiked: req.body.userId }, $inc: { dislikes: +1 } }
                      )
                    .then(() => res.status(201).json({ message: 'Vous avez disliké cette sauce !'}))
                    .catch((error) => res.status(400).json({ error }));  
                }
            })
            .catch((error) => res.status(400).json({ error }));
        }
};



