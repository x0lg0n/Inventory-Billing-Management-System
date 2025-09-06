const { Product } = require('../models');
const { asyncHandler } = require('../middleware/validation');

/**
 * @desc    Get all products with search and filter
 * @route   GET /api/products
 * @access  Private
 */
const getProducts = asyncHandler(async (req, res) => {
  const { search, category, minStock, maxStock, page = 1, limit = 10 } = req.query;
  const businessId = req.businessId;

  // Build filter object
  const filter = { businessId, isActive: true };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  if (minStock !== undefined || maxStock !== undefined) {
    filter.stock = {};
    if (minStock !== undefined) filter.stock.$gte = parseInt(minStock);
    if (maxStock !== undefined) filter.stock.$lte = parseInt(maxStock);
  }

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Get products with pagination
  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .limit(limitNum)
    .skip(skip);

  // Get total count for pagination
  const total = await Product.countDocuments(filter);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    }
  });
});

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Private
 */
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    businessId: req.businessId,
    isActive: true
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: { product }
  });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private
 */
const createProduct = asyncHandler(async (req, res) => {
  const productData = {
    ...req.body,
    businessId: req.businessId
  };

  // Check if SKU already exists (if provided)
  if (productData.sku) {
    const existingProduct = await Product.findOne({
      sku: productData.sku,
      businessId: req.businessId,
      isActive: true
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }
  }

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { product }
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if SKU already exists (if being updated)
  if (updateData.sku) {
    const existingProduct = await Product.findOne({
      sku: updateData.sku,
      businessId: req.businessId,
      _id: { $ne: id },
      isActive: true
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }
  }

  const product = await Product.findOneAndUpdate(
    { _id: id, businessId: req.businessId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: { product }
  });
});

/**
 * @desc    Delete product (soft delete)
 * @route   DELETE /api/products/:id
 * @access  Private
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, businessId: req.businessId },
    { isActive: false },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:category
 * @access  Private
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const filter = {
    businessId: req.businessId,
    category: { $regex: category, $options: 'i' },
    isActive: true
  };

  const products = await Product.find(filter)
    .sort({ name: 1 })
    .limit(limitNum)
    .skip(skip);

  const total = await Product.countDocuments(filter);

  res.json({
    success: true,
    data: {
      category,
      products,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    }
  });
});

/**
 * @desc    Get low stock products
 * @route   GET /api/products/low-stock
 * @access  Private
 */
const getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.findLowStock(req.businessId);

  res.json({
    success: true,
    data: {
      products,
      count: products.length
    }
  });
});

/**
 * @desc    Update product stock
 * @route   PATCH /api/products/:id/stock
 * @access  Private
 */
const updateProductStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, operation = 'set' } = req.body; // set, add, subtract

  const product = await Product.findOne({
    _id: id,
    businessId: req.businessId,
    isActive: true
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  let newStock;
  switch (operation) {
    case 'add':
      newStock = product.stock + quantity;
      break;
    case 'subtract':
      newStock = Math.max(0, product.stock - quantity);
      break;
    case 'set':
    default:
      newStock = quantity;
      break;
  }

  product.stock = newStock;
  await product.save();

  res.json({
    success: true,
    message: 'Product stock updated successfully',
    data: {
      product,
      previousStock: operation === 'set' ? null : (operation === 'add' ? product.stock - quantity : product.stock + quantity),
      newStock,
      operation
    }
  });
});

/**
 * @desc    Get product categories
 * @route   GET /api/products/categories
 * @access  Private
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    { $match: { businessId: req.businessId, isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  res.json({
    success: true,
    data: {
      categories: categories.map(cat => ({
        name: cat._id,
        productCount: cat.count
      }))
    }
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getLowStockProducts,
  updateProductStock,
  getCategories
};