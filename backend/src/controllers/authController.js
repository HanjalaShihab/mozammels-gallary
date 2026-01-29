const User = require('../models/User');
const { getSignedJwtToken } = require('../middleware/auth');
const mongoose = require('mongoose');
const { mockArtworks } = require('../data/mockData');

const isDBConnected = () => mongoose.connection.readyState === 1;

// Mock user data for demo mode
const mockUsers = [
  {
    _id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo123',
    role: 'user',
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date()
  }
];

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Use mock data if DB not connected
    if (!isDBConnected()) {
      const newUser = {
        _id: Date.now().toString(),
        name,
        email,
        role: 'user',
        createdAt: new Date()
      };
      
      const token = getSignedJwtToken(newUser._id, newUser.role);
      
      return res.status(201).json({
        success: true,
        message: 'User registered successfully (Demo Mode)',
        token,
        user: newUser
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with that email' 
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = getSignedJwtToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error registering user' 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Use mock data if DB not connected
    if (!isDBConnected()) {
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        const token = getSignedJwtToken(mockUser._id, mockUser.role);
        
        return res.status(200).json({
          success: true,
          message: 'Login successful (Demo Mode)',
          token,
          user: {
            _id: mockUser._id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role
          }
        });
      } else {
        return res.status(401).json({ 
          success: false, 
          message: 'Demo Mode: User: demo@example.com (demo123) or Admin: admin@example.com (admin123)' 
        });
      }
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = getSignedJwtToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error logging in' 
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    // Use mock data if DB not connected
    if (!isDBConnected()) {
      const user = mockUsers.find(u => u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      return res.status(200).json({ success: true, data: user });
    }

    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching user' 
    });
  }
};

// Logout (client-side removes token)
exports.logout = (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    // Use mock data if DB not connected
    if (!isDBConnected()) {
      const user = mockUsers.find(u => u._id === req.user.id);
      if (name) user.name = name;
      if (bio) user.bio = bio;
      
      return res.status(200).json({ 
        success: true, 
        message: 'Profile updated (Demo Mode)',
        data: user 
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error updating profile' 
    });
  }
};
