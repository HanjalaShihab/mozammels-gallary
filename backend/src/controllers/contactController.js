const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const isDBConnected = () => mongoose.connection.readyState === 1;

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'All fields are required.',
        success: false
      });
    }

    if (!isDBConnected()) {
      return res.status(503).json({
        message: 'Database is not connected. Please try again later.',
        success: false
      });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        const mailOptions = {
          from: email,
          to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
          subject: `Contact Form: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.warn('Email notification failed:', mailError.message);
      }
    }

    res.status(200).json({
      message: 'Your message has been sent successfully!',
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      message: 'Failed to send message. Please try again later.',
      success: false,
      error: error.message
    });
  }
};

// Get all messages (admin)
exports.getAllMessages = async (req, res) => {
  try {
    // If using Contact model
    // const messages = await Contact.find().sort({ createdAt: -1 });
    // res.json(messages);
    res.json({ message: 'Contact messages feature - requires Contact model' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single message
exports.getMessage = async (req, res) => {
  try {
    // const message = await Contact.findById(req.params.id);
    // if (!message) {
    //   return res.status(404).json({ message: 'Message not found' });
    // }
    // res.json(message);
    res.json({ message: 'Get message feature - requires Contact model' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    // const message = await Contact.findByIdAndDelete(req.params.id);
    // if (!message) {
    //   return res.status(404).json({ message: 'Message not found' });
    // }
    // res.json({ message: 'Message deleted successfully' });
    res.json({ message: 'Delete message feature - requires Contact model' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
