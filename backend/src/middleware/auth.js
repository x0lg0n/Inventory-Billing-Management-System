const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract token from Bearer token
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token payload.'
      });
    }
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not found or inactive.'
      });
    }

    // Note: Don't require businessId here - let users complete profile first

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token expired.'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};

//  Profile completion middleware
// Ensures user has completed their profile before accessing protected routes

const requireProfileCompleted = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. User not authenticated.'
    });
  }

  if (!req.user.profileCompleted) {
    return res.status(403).json({
      success: false,
      message: 'Profile completion required. Please complete your profile first.',
      requiresProfileCompletion: true
    });
  }

  next();
};

/**
 * Authorization middleware
 * Checks if user has required role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not authenticated.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

/**
 * Business access middleware - Updated
 * Ensures user can only access data from their business
 */
const checkBusinessAccess = (req, res, next) => {
  try {
    // Validate request object
    if (!req) {
      return res.status(500).json({ success: false, message: 'Invalid request object' });
    }

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not authenticated.'
      });
    }

    // Check if user has businessId
    if (!req.user.businessId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data. Business ID not found.'
      });
    }

    // Set businessId for the request
    req.businessId = req.user.businessId;
    
    // Continue to next middleware
    next();
  } catch (error) {
    console.error('checkBusinessAccess error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error in business access check.'
    });
  }
};

module.exports = {
  authenticate,
  authorize,
  checkBusinessAccess,
  requireProfileCompleted
};