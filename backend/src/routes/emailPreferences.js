const express = require('express');
const { authenticate } = require('../middleware/auth');
const { EmailPreference } = require('../models');
const router = express.Router();

// Get email preferences
router.get('/', authenticate, async (req, res) => {
  try {
    let preferences = await EmailPreference.findOne({
      userId: req.user._id,
      businessId: req.user.businessId
    });

    // Create default if doesn't exist
    if (!preferences) {
      preferences = await EmailPreference.create({
        userId: req.user._id,
        businessId: req.user.businessId
      });
    }

    res.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve email preferences'
    });
  }
});

// Update email preferences
router.put('/', authenticate, async (req, res) => {
  try {
    // Explicit property access to avoid bracket notation on user input
    const update = {};
    if (typeof req.body.transactionCreated === 'boolean') {
      update.transactionCreated = req.body.transactionCreated;
    }
    if (typeof req.body.transactionUpdated === 'boolean') {
      update.transactionUpdated = req.body.transactionUpdated;
    }
    if (typeof req.body.lowStockAlert === 'boolean') {
      update.lowStockAlert = req.body.lowStockAlert;
    }
    if (typeof req.body.dailyReport === 'boolean') {
      update.dailyReport = req.body.dailyReport;
    }

    const preferences = await EmailPreference.findOneAndUpdate(
      { userId: req.user._id, businessId: req.user.businessId },
      update,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    // Return generic error message to avoid information disclosure
    res.status(500).json({
      success: false,
      message: 'Failed to update email preferences'
    });
  }
});

module.exports = router;