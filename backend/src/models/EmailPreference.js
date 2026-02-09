const mongoose = require('mongoose');

const emailPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessId: {
    type: String,
    required: true
  },
  transactionCreated: {
    type: Boolean,
    default: true
  },
  transactionUpdated: {
    type: Boolean,
    default: true
  },
  lowStockAlert: {
    type: Boolean,
    default: true
  },
  dailyReport: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('EmailPreference', emailPreferenceSchema);