const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllContacts,
  deleteContact,
  updateContactStatus,
  getAllSubscribers,
  deleteSubscriber,
  bulkDelete
} = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Contact management
router.get('/contacts', getAllContacts);
router.delete('/contacts/:id', deleteContact);
router.patch('/contacts/:id/status', updateContactStatus);

// Newsletter subscribers
router.get('/subscribers', getAllSubscribers);
router.delete('/subscribers/:id', deleteSubscriber);

// Bulk operations
router.post('/bulk-delete', bulkDelete);

module.exports = router;
