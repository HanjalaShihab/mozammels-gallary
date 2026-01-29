const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.'
      });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed.',
        data: existing
      });
    }

    const subscriber = await Subscriber.create({
      email,
      source: source || 'unknown'
    });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully!',
      data: subscriber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      error: error.message
    });
  }
};