const express = require('express');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  getSales,
  getPurchases,
  updateTransactionStatus,
  getTransactionSummary
} = require('../controllers/transactionController');
const { authenticate, checkBusinessAccess } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const {
  createTransactionValidation,
  updateTransactionStatusValidation
} = require('../utils/validations');

const router = express.Router();

// Apply authentication and business access middleware to all routes
router.use(authenticate);
router.use(checkBusinessAccess);

// Transaction CRUD routes
router.get('/', getTransactions);
router.post('/', createTransactionValidation, validateRequest, createTransaction);

// Special routes (must come before :id routes)
router.get('/summary', getTransactionSummary);
router.get('/sales', getSales);
router.get('/purchases', getPurchases);

// Individual transaction routes
router.get('/:id', getTransaction);
router.patch('/:id/status', updateTransactionStatusValidation, validateRequest, updateTransactionStatus);

module.exports = router;