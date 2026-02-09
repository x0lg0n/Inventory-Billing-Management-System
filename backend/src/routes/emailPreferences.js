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
      message: error.message
    });
  }
});

// Update email preferences
router.put('/', authenticate, async (req, res) => {
  try {
    const preferences = await EmailPreference.findOneAndUpdate(
      { userId: req.user._id, businessId: req.user.businessId },
      req.body,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;