const mongoose = require('mongoose');

const notificationHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessId: {
    type: String,
    required: true
  },
  email: String,
  type: {
    type: String,
    enum: ['transaction_created', 'transaction_updated', 'low_stock', 'daily_report'],
    required: true
  },
  subject: String,
  status: {
    type: String,
    enum: ['sent', 'failed', 'bounced'],
    default: 'sent'
  },
  error: String,
  transactionId: mongoose.Schema.Types.ObjectId,
  sentAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Add index for querying notifications by user and business
notificationHistorySchema.index({ userId: 1, businessId: 1 });
notificationHistorySchema.index({ businessId: 1, createdAt: -1 });

module.exports = mongoose.model('NotificationHistory', notificationHistorySchema);