const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {Object} payload - Token payload
 * @param {String} expiresIn - Token expiration time
 * @returns {String} JWT token
 */
const generateToken = (payload, expiresIn = null) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn || process.env.JWT_EXPIRE || '7d'
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
    role: user.role,
    provider: user.provider || 'local'
  };

  const token = generateToken(payload);
  const refreshToken = generateToken({ id: user._id, type: 'refresh' }, '30d');

  return {
    token,
    refreshToken,
    tokenType: 'Bearer',
    expiresIn: process.env.JWT_EXPIRE || '7d'
  };
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens
};