const express = require("express"); // import package Express
const mongoose = require("mongoose"); // import package mongoose
const path = require('path'); // import path
const helmet = require('helmet'); // import helmet
require('dotenv').config(); 


// déclaration des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


mongoose.connect(process.env.SECRET_DB,
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


// import de la logique grâce aux routeurs contenu dans sauceRoutes et  userRoutes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// gestion de images
app.use('/images', express.static(path.join(__dirname, 'images')));

// activation helmet 
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' })); // empêche d'intégrer la page web dans une ifram/fenêtre invisible


// on export Express pour le rendre disponible partout dans le backend
module.exports = app;