const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  availableQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  isOriginal: {
    type: Boolean,
    default: true
  },
  printSizes: [{
    size: String,
    price: Number
  }],
  framingOptions: [{
    type: String,
    price: Number
  }],
  shippingInfo: {
    domestic: Number,
    international: Number,
    estimatedDelivery: String
  },
  sold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShopItem', shopItemSchema);