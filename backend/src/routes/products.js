const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getLowStockProducts,
  updateProductStock,
  getCategories
} = require('../controllers/productController');
const { authenticate, checkBusinessAccess } = require('../middleware/auth');
const { requireProfileCompletion } = require('../middleware/profileCompletion');
const { validateRequest } = require('../middleware/validation');
const {
  createProductValidation,
  updateProductValidation,
  updateStockValidation
} = require('../utils/validations');

const router = express.Router();

// Apply authentication, profile completion, and business access middleware to all routes
router.use(authenticate);
router.use(requireProfileCompletion);
router.use(checkBusinessAccess);

// Product CRUD routes
router.get('/', getProducts);
router.post('/', createProductValidation, validateRequest, createProduct);

// Special routes (must come before :id routes)
router.get('/categories', getCategories);
router.get('/low-stock', getLowStockProducts);
router.get('/category/:category', getProductsByCategory);

// Individual product routes
router.get('/:id', getProduct);
router.put('/:id', updateProductValidation, validateRequest, updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', updateStockValidation, validateRequest, updateProductStock);

module.exports = router;