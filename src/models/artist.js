const mongoose = require("mongoose");
const artistSchema = mongoose.Schema({
    idArtista: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('artists', artistSchema);