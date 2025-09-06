const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxLength: [50, 'Category cannot exceed 50 characters']
  },
  businessId: {
    type: String,
    required: [true, 'Business ID is required'],
    trim: true
  },
  sku: {
    type: String,
    unique: true,
    trim: true,
    sparse: true // Allows multiple null values
  },
  isActive: {
    type: Boolean,
    default: true
  },
  minStockLevel: {
    type: Number,
    default: 0,
    min: [0, 'Minimum stock level cannot be negative']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ businessId: 1, name: 1 });
productSchema.index({ businessId: 1, category: 1 });
productSchema.index({ businessId: 1, stock: 1 });
// SKU index is created automatically by unique: true and sparse: true

// Virtual for low stock indicator
productSchema.virtual('isLowStock').get(function() {
  return this.stock <= this.minStockLevel;
});

// Ensure virtual fields are included in JSON output
productSchema.set('toJSON', { virtuals: true });

// Methods
productSchema.methods.updateStock = function(quantity, operation = 'add') {
  if (operation === 'add') {
    this.stock += quantity;
  } else if (operation === 'subtract') {
    this.stock = Math.max(0, this.stock - quantity);
  }
  return this.save();
};

// Static methods
productSchema.statics.findByBusiness = function(businessId) {
  return this.find({ businessId, isActive: true });
};

productSchema.statics.findLowStock = function(businessId) {
  return this.aggregate([
    { $match: { businessId, isActive: true } },
    { $addFields: { isLowStock: { $lte: ['$stock', '$minStockLevel'] } } },
    { $match: { isLowStock: true } }
  ]);
};

module.exports = mongoose.model('Product', productSchema);