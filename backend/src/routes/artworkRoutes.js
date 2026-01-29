const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const upload = require('../middleware/upload');

// Get all artworks
router.get('/', artworkController.getAllArtworks);

// Get latest artworks
router.get('/latest', artworkController.getLatestArtworks);

// Get artwork by ID
router.get('/:id', artworkController.getArtwork);

// Create new artwork
router.post('/', upload.single('image'), artworkController.createArtwork);

// Get categories
router.get('/categories/all', artworkController.getCategories);

module.exports = router;