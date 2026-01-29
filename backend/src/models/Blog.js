const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: String,
    avatar: String
  },
  coverImage: {
    type: String,
    required: true
  },
  categories: [String],
  tags: [String],
  readTime: {
    type: Number,
    default: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    user: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', blogSchema);