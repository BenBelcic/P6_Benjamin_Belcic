const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },  // l'identifiant MongoDB unique de l'user qui a créer la sauce
    name: { type: String, required: true }, // nom de la sauce
    manufacturer: { type: String, required: true }, // fabricant de la sauce
    description: { type: String, required: true }, // description de la sauce
    mainPepper: { type: String, required: true }, // le principal ingrédient épicé de la sauce
    imageURL: { type: String, required: true }, // URL de l'image de la sauce télécharger par l'user
    heat: { type: Number, required: true }, // nombre entre 1 et 10 décrivant la sauce
    likes: { type: Number, deafult: 0 }, // nombre d'users qui ont like la sauce
    dislikes: { type: Number, deafult: 0 }, // nombre d'users qui ont dislike la sauce
    usersLiked: { type: Array, deafult: [] }, // ["String <userId>"] tableau des identifiants des users qui ont like
    usersDisliked: { type: Array, deafult: [] }, // ["String <userId>"] tableau des identifiants des users qui ont dislike

});

module.exports = mongoose.model('Sauce', sauceSchema);