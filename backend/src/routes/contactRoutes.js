const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit contact form
router.post('/', contactController.submitContactForm);

// Get all messages (admin only)
router.get('/', contactController.getAllMessages);

// Get message by ID
router.get('/:id', contactController.getMessage);

// Delete message
router.delete('/:id', contactController.deleteMessage);

module.exports = router;
