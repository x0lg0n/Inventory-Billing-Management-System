const mongoose = require('mongoose');

const transactionItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  total: {
    type: Number,
    required: true
  }
}, { _id: false });

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['sale', 'purchase'],
    lowercase: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: function() { return this.type === 'sale'; }
  },
  customerName: {
    type: String,
    required: function() { return this.type === 'sale'; }
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: function() { return this.type === 'purchase'; }
  },
  vendorName: {
    type: String,
    required: function() { return this.type === 'purchase'; }
  },
  products: [transactionItemSchema],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  date: {
    type: Date,
    required: [true, 'Transaction date is required'],
    default: Date.now
  },
  businessId: {
    type: String,
    required: [true, 'Business ID is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'completed'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'credit', 'other'],
    default: 'cash'
  },
  notes: {
    type: String,
    trim: true,
    maxLength: [500, 'Notes cannot exceed 500 characters']
  },
  invoiceNumber: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
transactionSchema.index({ businessId: 1, date: -1 });
transactionSchema.index({ businessId: 1, type: 1, date: -1 });
transactionSchema.index({ businessId: 1, customerId: 1 });
transactionSchema.index({ businessId: 1, vendorId: 1 });
transactionSchema.index({ invoiceNumber: 1 }, { sparse: true });

// Pre-save middleware to calculate totals
transactionSchema.pre('save', function(next) {
  // Calculate item totals
  this.products.forEach(item => {
    item.total = item.quantity * item.price;
  });
  
  // Calculate total amount
  this.totalAmount = this.products.reduce((sum, item) => sum + item.total, 0);
  
  next();
});

// Virtual for transaction summary
transactionSchema.virtual('summary').get(function() {
  const contactName = this.type === 'sale' ? this.customerName : this.vendorName;
  const itemCount = this.products.length;
  const totalQty = this.products.reduce((sum, item) => sum + item.quantity, 0);
  
  return {
    id: this._id,
    type: this.type,
    contactName,
    itemCount,
    totalQuantity: totalQty,
    totalAmount: this.totalAmount,
    date: this.date
  };
});

// Ensure virtual fields are included in JSON output
transactionSchema.set('toJSON', { virtuals: true });

// Static methods
transactionSchema.statics.findByDateRange = function(businessId, startDate, endDate) {
  return this.find({
    businessId,
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ date: -1 });
};

transactionSchema.statics.findByContact = function(businessId, contactId, contactType) {
  const filter = { businessId };
  if (contactType === 'customer') {
    filter.customerId = contactId;
  } else {
    filter.vendorId = contactId;
  }
  return this.find(filter).sort({ date: -1 });
};

transactionSchema.statics.getRevenue = function(businessId, startDate, endDate) {
  const matchStage = {
    businessId,
    type: 'sale',
    status: 'completed'
  };
  
  if (startDate && endDate) {
    matchStage.date = { $gte: startDate, $lte: endDate };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        transactionCount: { $sum: 1 }
      }
    }
  ]);
};

transactionSchema.statics.getExpenses = function(businessId, startDate, endDate) {
  const matchStage = {
    businessId,
    type: 'purchase',
    status: 'completed'
  };
  
  if (startDate && endDate) {
    matchStage.date = { $gte: startDate, $lte: endDate };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: '$totalAmount' },
        transactionCount: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Transaction', transactionSchema);