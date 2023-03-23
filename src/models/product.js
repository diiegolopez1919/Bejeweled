const mongoose = require("mongoose");
const productsSchema = mongoose.Schema({
    idProducto:{
        type: Number,
        required: true
    },
    idArtista: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    imagen1: {
        type: String,
        required: true
    },
    imagen2: {
        type: String,
        required: true
    },
    imagen3: {
        type: String,
        required: true
    },
    imagen4: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('productos', productsSchema);