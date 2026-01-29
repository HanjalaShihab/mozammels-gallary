const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Get all shop items
router.get('/', shopController.getAllItems);

// Get featured items
router.get('/featured', shopController.getFeaturedItems);

// Get shop item by ID
router.get('/:id', shopController.getItem);

// Create new shop item
router.post('/', shopController.createItem);

// Update shop item
router.put('/:id', shopController.updateItem);

// Delete shop item
router.delete('/:id', shopController.deleteItem);

module.exports = router;
