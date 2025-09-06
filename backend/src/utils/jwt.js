const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {Object} payload - Token payload
 * @returns {String} JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * Verify JWT token
 * @param {String} token - JWT token
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Generate auth tokens
 * @param {Object} user - User object
 * @returns {Object} Token object
 */
const generateAuthTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    businessId: user.businessId,
    role: user.role
  };

  const token = generateToken(payload);

  return {
    token,
    tokenType: 'Bearer',
    expiresIn: process.env.JWT_EXPIRE || '7d'
  };
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens
};