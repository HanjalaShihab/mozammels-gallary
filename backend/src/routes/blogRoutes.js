const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload');

// Get all blog posts
router.get('/', blogController.getAllPosts);

// Get latest blog posts
router.get('/latest', blogController.getLatestPosts);

// Get blog post by ID
router.get('/:id', blogController.getPost);

// Create new blog post
router.post('/', upload.single('image'), blogController.createPost);

// Update blog post
router.put('/:id', upload.single('image'), blogController.updatePost);

// Delete blog post
router.delete('/:id', blogController.deletePost);

module.exports = router;
