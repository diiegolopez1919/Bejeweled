const express = require('express');
const productsSchema = require('../models/product');


const router = express.Router();


// Crear producto
router.post('/products', (req,res) => {
    const product = productsSchema(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// get all products
router.get('/products', (req,res) => {
    productsSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// get one product
router.get('/products/:id', (req,res) => {
    const { id } = req.params;
    productsSchema
        .find({idProducto:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// get Products Artista
router.get('/products/artista/:id', (req,res) => {
    const { id } = req.params;
    productsSchema
        .find({idArtista:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// update product
router.put('/products/:id', (req,res) => {
    const { id } = req.params;
    const { idProducto, idArtista, nombre, imagen1, imagen2, imagen3, imagen4, descripcion, cantidad, precio } = req.body;
    productsSchema
        .updateOne({ _id: id}, {$set:{idProducto, idArtista, nombre, imagen1, imagen2, imagen3, imagen4, descripcion, cantidad, precio}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// delete artist
router.delete('/products/:id', (req,res) => {
    const { id } = req.params;
    productsSchema
        .remove({ _id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});


module.exports = router;