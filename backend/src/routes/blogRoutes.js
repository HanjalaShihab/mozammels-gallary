const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blog posts
router.get('/', blogController.getAllPosts);

// Get latest blog posts
router.get('/latest', blogController.getLatestPosts);

// Get blog post by ID
router.get('/:id', blogController.getPost);

// Create new blog post
router.post('/', blogController.createPost);

// Update blog post
router.put('/:id', blogController.updatePost);

// Delete blog post
router.delete('/:id', blogController.deletePost);

module.exports = router;
