const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    default: 'The Artist'
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'painting',
      'digital',
      'sculpture',
      'photography',
      'mixed-media',
      'drawing',
      'still-life',
      'figure-painting',
      'landscape',
      'portrait'
    ],
    default: 'painting'
  },
  tags: [{
    type: String,
    trim: true
  }],
  dimensions: {
    height: Number,
    width: Number,
    unit: {
      type: String,
      default: 'cm'
    }
  },
  yearCreated: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Artwork', artworkSchema);