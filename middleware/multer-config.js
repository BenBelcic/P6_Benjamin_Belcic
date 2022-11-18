const multer = require('multer');

// dictionnaire des extensions possibles acceptées
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// objet de configuration pour multer
const storage = multer.diskStorage({                            // multer.discStorage pour enregistrer sur le disque
    destination: (req, file, callback) => {                     // la destination dans laquelle sera enregistré les fichiers avec 3 arguments
        callback(null, 'images');                               // apelle le callback,arg1: null pour dire pas d'erreur,arg2: dossier 'images' 
    },
    filename: (req, file, callback) => {                        // le nom du fichier constitué de :
        const name = file.originalname.split(' ').join('_');    // du nom original du fichier et on remplace les espaces par des '_'
        const extension = MIME_TYPES[file.mimetype];            // de l'extension qui correspondera aux mimetypes enregistrés
        callback(null, name + Date.now() + '.' + extension);    // le nom sera composé du name + un timeStamp + '.' + l'ext                
    }
});

/* on exporte le middleware, ça correspondera à l'objet { storage } 
 et ça sera un fichier unique qui sera une image */
module.exports = multer({ storage: storage }).single('image');