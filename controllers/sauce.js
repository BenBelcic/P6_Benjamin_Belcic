const Sauce = require('../models/Sauce'); //import du modèle Sauce

// création d'une sauce en fonction du schéma
exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({        // création d'une nouvelle instance du modèle Sauce
        ...req.body                  // contenant tous les champs du body de la request
    });
    sauce.save()                     // enregistrement du schéma Thing dans la database
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) // on renvoie une réponse (pour que la requête n'expire pas) de status 201 (bonne création de ressource)
    .catch(error => res.status(400).json({ error }));  // on renvoie un code d'error
};

// récupération de la liste de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // on cherche toute la liste des objets dans Thing (pas de param entre () pour affiner la recherche)
    .then(sauces => res.status(200).json(sauces))  // on récupère le tableau things des objets, et on le renvoie avec un code 200
    .catch(error => res.status(400).json({ error })); 
};

// récupération d'une sauce précise en fonction de son id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) // on passe un objet de comparaison pour que l'id de l'objet clic soit le même que l'id de URI
    .then(sauce => res.status(200).json(sauce))  // on récupère l'objet thing, et on le renvoie avec un code 200
    .catch(error => res.status(404).json({ error })); // 404 car objet non trouvé
};

// modification d'une sauce
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id}) // updateOne pour update l'objet voulu
    .then(sauce => res.status(200).json(sauce))  // on récupère l'objet thing, et on le renvoie avec un code 200
    .catch(error => res.status(404).json({ error })); // 404 car objet non trouvé
};

// suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id}, { ...req.body, _id: req.params.id}) // deleteOne pour delete l'objet voulu
    .then(() => res.status(200).json({ message: 'objet supprimé !'}))  // on récupère l'objet thing, et on le renvoie avec un code 200
    .catch(error => res.status(400).json({ error })); // 404 car objet non trouvé
};


