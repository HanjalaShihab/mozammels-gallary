const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    name: String,
    bio: String,
    avatar: String
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    required: true
  },
  curriculum: [{
    week: Number,
    title: String,
    topics: [String],
    duration: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    required: true
  },
  previewVideo: String,
  requirements: [String],
  learningOutcomes: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);