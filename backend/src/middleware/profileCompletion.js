const { User } = require('../models');
const { asyncHandler } = require('../middleware/validation');

// Middleware to check if user has completed profile

const requireProfileCompletion = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Check if user has completed profile (has businessId and profileCompleted flag)
  if (!user.businessId || !user.profileCompleted) {
    return res.status(403).json({
      success: false,
      message: 'Profile completion required',
      error: 'PROFILE_NOT_COMPLETED',
      redirectTo: '/complete-profile'
    });
  }

  next();
});

module.exports = {
  requireProfileCompletion
};