const express = require('express');
const artistsSchema = require('../models/artist');


const router = express.Router();


// Crear artista
router.post('/artists', (req,res) => {
    const artist = artistsSchema(req.body);
    artist
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// get all artists
router.get('/artists', (req,res) => {
    artistsSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// get one artist
router.get('/artists/:id', (req,res) => {
    const { id } = req.params;
    artistsSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// update artist
router.put('/artists/:id', (req,res) => {
    const { id } = req.params;
    const { idArtista, nombre, imagen, descripcion } = req.body;
    artistsSchema
        .updateOne({ _id: id}, {$set:{idArtista, nombre, imagen, descripcion}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});

// delete artist
router.delete('/artists/:id', (req,res) => {
    const { id } = req.params;
    artistsSchema
        .remove({ _id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));

});


module.exports = router;