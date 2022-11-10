const express = require("express"); // import package Express
const mongoose = require("mongoose"); // import package mongoose

const Sauce = require('./models/Sauce'); //import du modèle Sauces


mongoose.connect("mongodb+srv://Benjamin_Belcic:Benjamin_Belcic_Database01@cluster0.vut60kf.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('connexion à MongoDB réussie !'))
.catch(() => console.log('connexion à MongoDB échouée !'));

// lancement Express
const app = express();


// middleware définissant les headers d'autorisation pour les interactions navigateurs/serveurs pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});


app.use(express.json()); //middleware pour que Express prenne en compte toutes les requêtes écrites en JSON et rend exploitable leur body dans l'objet req (la request). Pour pouvoir écrire le POST
// le package bodyparser fait PerformanceObserverEntryList, donne acces au corps de la requete

// création d'une sauce en fonction du schéma
app.post('/api/auth/sauces', (req, res, next) => {
    const sauce = new Sauce({        // création d'une nouvelle instance du modèle Thing
        ...req.body                  // contenant tous les champs du body de la request
    });
    sauce.save()                     // enregistrement du schéma Thing dans la database
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) // on renvoie une réponse (pour que la requête n'expire pas) de status 201 (bonne création de ressource)
    .catch(error => res.status(400).json({ error }));  // on renvoie un code d'error
});

// récupération d'une sauce précise en fonction de son id
app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) // on passe un objet de comparaison pour que l'id de l'objet clic soit le même que l'id de URI
    .then(sauce => res.status(200).json(sauce))  // on récupère l'objet thing, et on le renvoie avec un code 200
    .catch(error => res.status(404).json({ error })); // 404 car objet non trouvé
});

// mise à jour d'une sauce
app.put('/api/sauces/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id}) // updateOne pour update l'objet voulu
    .then(sauce => res.status(200).json(sauce))  // on récupère l'objet thing, et on le renvoie avec un code 200
    .catch(error => res.status(404).json({ error })); // 404 car objet non trouvé
});

// suppression d'une sauce'
app.delete('/api/sauces/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id}, { ...req.body, _id: req.params.id}) // deleteOne pour delete l'objet voulu
    .then(() => res.status(200).json({ message: 'objet supprimé !'}))  // on récupère l'objet thing, et on le renvoie avec un code 200
    .catch(error => res.status(400).json({ error })); // 404 car objet non trouvé
});

// récupération de la liste de toutes les sauces
app.get('/api/sauces', (req, res, next) => {
    Sauce.find() // on cherche toute la liste des objets dans Thing (pas de param entre () pour affiner la recherche)
    .then(sauces => res.status(200).json(sauces))  // on récupère le tableau things des objets, et on le renvoie avec un code 200
    .catch(error => res.status(400).json({ error })); 
});

// on export Express pour le rendre disponible partout dans le backend
module.exports = app;