const { Contact } = require('../models');
const { asyncHandler } = require('../middleware/validation');

/**
 * @desc    Get all contacts with search and filter
 * @route   GET /api/contacts
 * @access  Private
 */
const getContacts = asyncHandler(async (req, res) => {
  const { search, type, page = 1, limit = 10 } = req.query;
  const businessId = req.businessId;

  // Build filter object
  const filter = { businessId, isActive: true };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  if (type && ['customer', 'vendor'].includes(type.toLowerCase())) {
    filter.type = type.toLowerCase();
  }

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Get contacts with pagination
  const contacts = await Contact.find(filter)
    .sort({ name: 1 })
    .limit(limitNum)
    .skip(skip);

  // Get total count for pagination
  const total = await Contact.countDocuments(filter);

  res.json({
    success: true,
    data: {
      contacts,
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
 * @desc    Get single contact
 * @route   GET /api/contacts/:id
 * @access  Private
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    businessId: req.businessId,
    isActive: true
  });

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found'
    });
  }

  res.json({
    success: true,
    data: { contact }
  });
});

/**
 * @desc    Create new contact
 * @route   POST /api/contacts
 * @access  Private
 */
const createContact = asyncHandler(async (req, res) => {
  const contactData = {
    ...req.body,
    businessId: req.businessId
  };

  // Check if contact with same phone already exists
  const existingContact = await Contact.findOne({
    phone: contactData.phone,
    businessId: req.businessId,
    isActive: true
  });

  if (existingContact) {
    return res.status(400).json({
      success: false,
      message: 'Contact with this phone number already exists'
    });
  }

  // Check if email already exists (if provided)
  if (contactData.email) {
    const existingEmailContact = await Contact.findOne({
      email: contactData.email,
      businessId: req.businessId,
      isActive: true
    });

    if (existingEmailContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this email already exists'
      });
    }
  }

  const contact = await Contact.create(contactData);

  res.status(201).json({
    success: true,
    message: 'Contact created successfully',
    data: { contact }
  });
});

/**
 * @desc    Update contact
 * @route   PUT /api/contacts/:id
 * @access  Private
 */
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if phone already exists (if being updated)
  if (updateData.phone) {
    const existingContact = await Contact.findOne({
      phone: updateData.phone,
      businessId: req.businessId,
      _id: { $ne: id },
      isActive: true
    });

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this phone number already exists'
      });
    }
  }

  // Check if email already exists (if being updated)
  if (updateData.email) {
    const existingEmailContact = await Contact.findOne({
      email: updateData.email,
      businessId: req.businessId,
      _id: { $ne: id },
      isActive: true
    });

    if (existingEmailContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this email already exists'
      });
    }
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id, businessId: req.businessId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found'
    });
  }

  res.json({
    success: true,
    message: 'Contact updated successfully',
    data: { contact }
  });
});

/**
 * @desc    Delete contact (soft delete)
 * @route   DELETE /api/contacts/:id
 * @access  Private
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, businessId: req.businessId },
    { isActive: false },
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found'
    });
  }

  res.json({
    success: true,
    message: 'Contact deleted successfully'
  });
});

/**
 * @desc    Get customers only
 * @route   GET /api/contacts/customers
 * @access  Private
 */
const getCustomers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const businessId = req.businessId;

  const filter = { businessId, type: 'customer', isActive: true };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const customers = await Contact.find(filter)
    .sort({ name: 1 })
    .limit(limitNum)
    .skip(skip);

  const total = await Contact.countDocuments(filter);

  res.json({
    success: true,
    data: {
      customers,
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
 * @desc    Get vendors only
 * @route   GET /api/contacts/vendors
 * @access  Private
 */
const getVendors = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const businessId = req.businessId;

  const filter = { businessId, type: 'vendor', isActive: true };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const vendors = await Contact.find(filter)
    .sort({ name: 1 })
    .limit(limitNum)
    .skip(skip);

  const total = await Contact.countDocuments(filter);

  res.json({
    success: true,
    data: {
      vendors,
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
 * @desc    Update contact balance
 * @route   PATCH /api/contacts/:id/balance
 * @access  Private
 */
const updateContactBalance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, operation = 'set' } = req.body; // set, add, subtract

  const contact = await Contact.findOne({
    _id: id,
    businessId: req.businessId,
    isActive: true
  });

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found'
    });
  }

  let newBalance;
  const previousBalance = contact.currentBalance;

  switch (operation) {
    case 'add':
      newBalance = contact.currentBalance + amount;
      break;
    case 'subtract':
      newBalance = contact.currentBalance - amount;
      break;
    case 'set':
    default:
      newBalance = amount;
      break;
  }

  contact.currentBalance = newBalance;
  await contact.save();

  res.json({
    success: true,
    message: 'Contact balance updated successfully',
    data: {
      contact,
      previousBalance,
      newBalance,
      operation
    }
  });
});

/**
 * @desc    Search contacts
 * @route   GET /api/contacts/search/:term
 * @access  Private
 */
const searchContacts = asyncHandler(async (req, res) => {
  const { term } = req.params;
  const { type, limit = 10 } = req.query;

  const filter = { businessId: req.businessId, isActive: true };
  
  if (type && ['customer', 'vendor'].includes(type.toLowerCase())) {
    filter.type = type.toLowerCase();
  }

  const contacts = await Contact.searchContacts(req.businessId, term)
    .where(filter)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: {
      searchTerm: term,
      contacts,
      count: contacts.length
    }
  });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getCustomers,
  getVendors,
  updateContactBalance,
  searchContacts
};