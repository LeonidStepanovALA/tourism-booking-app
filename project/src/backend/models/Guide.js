const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  specializations: [{
    type: String,
    enum: ['history', 'nature', 'culture', 'adventure', 'food', 'architecture'],
  }],
  languages: [{
    type: String,
    required: true,
  }],
  experience: {
    type: Number, // years
    required: true,
  },
  services: [{
    title: {
      type: String,
      required: true,
    },
    description: String,
    duration: Number, // hours
    price: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    maxGroupSize: Number,
  }],
  availability: [{
    date: Date,
    timeSlots: [{
      start: String,
      end: String,
      isAvailable: Boolean,
    }],
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  certificates: [{
    name: String,
    issuer: String,
    year: Number,
    image: String,
  }],
  profileImage: String,
  location: {
    city: String,
    country: String,
  },
});

module.exports = mongoose.model('Guide', guideSchema); 