const express = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getCustomers,
  getVendors,
  updateContactBalance,
  searchContacts
} = require('../controllers/contactController');
const { authenticate, checkBusinessAccess } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const {
  createContactValidation,
  updateContactValidation,
  updateBalanceValidation
} = require('../utils/validations');

const router = express.Router();

// Apply authentication and business access middleware to all routes
router.use(authenticate);
router.use(checkBusinessAccess);

// Contact CRUD routes
router.get('/', getContacts);
router.post('/', createContactValidation, validateRequest, createContact);

// Special routes (must come before :id routes)
router.get('/customers', getCustomers);
router.get('/vendors', getVendors);
router.get('/search/:term', searchContacts);

// Individual contact routes
router.get('/:id', getContact);
router.put('/:id', updateContactValidation, validateRequest, updateContact);
router.delete('/:id', deleteContact);
router.patch('/:id/balance', updateBalanceValidation, validateRequest, updateContactBalance);

module.exports = router;