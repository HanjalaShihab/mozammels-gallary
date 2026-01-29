const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const upload = require('../middleware/upload');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get featured courses
router.get('/featured', courseController.getFeaturedCourses);

// Get course by ID
router.get('/:id', courseController.getCourse);

// Create new course
router.post('/', upload.single('image'), courseController.createCourse);

// Update course
router.put('/:id', upload.single('image'), courseController.updateCourse);

// Delete course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
