const User = require('../models/User');
const Artwork = require('../models/Artwork');
const Blog = require('../models/Blog');
const Course = require('../models/Course');
const ShopItem = require('../models/ShopItem');
const Contact = require('../models/Contact');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalArtworks,
      totalBlogs,
      totalCourses,
      totalShopItems,
      totalContacts,
      recentUsers,
      recentContacts
    ] = await Promise.all([
      User.countDocuments(),
      Artwork.countDocuments(),
      Blog.countDocuments(),
      Course.countDocuments(),
      ShopItem.countDocuments(),
      Contact.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('-password'),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          users: totalUsers,
          artworks: totalArtworks,
          blogs: totalBlogs,
          courses: totalCourses,
          shopItems: totalShopItems,
          contacts: totalContacts
        },
        recentUsers,
        recentContacts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

// Bulk delete items
exports.bulkDelete = async (req, res) => {
  try {
    const { model, ids } = req.body;
    
    let Model;
    switch(model) {
      case 'artworks':
        Model = Artwork;
        break;
      case 'blogs':
        Model = Blog;
        break;
      case 'courses':
        Model = Course;
        break;
      case 'shop':
        Model = ShopItem;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid model type'
        });
    }

    const result = await Model.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} items deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing bulk delete',
      error: error.message
    });
  }
};

module.exports = exports;
