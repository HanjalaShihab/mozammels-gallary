const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mozammelsgallery.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('ℹ Admin user already exists');
      console.log('Email:', adminEmail);
      
      // Update password if needed
      existingAdmin.password = adminPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✓ Admin password updated');
    } else {
      // Create new admin user
      const admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        bio: 'Gallery Administrator'
      });
      
      console.log('✓ Admin user created successfully!');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
