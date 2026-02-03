const { User } = require('../models');
const { generateAuthTokens } = require('../utils/jwt');
const { asyncHandler } = require('../middleware/validation');
const crypto = require('crypto');

// Helper function to create user response object
const createUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    businessId: user.businessId,
    role: user.role,
    profileCompleted: user.profileCompleted,
    provider: user.provider,
    avatar: user.avatar,
    emailVerified: user.emailVerified,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, businessId } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    businessId: businessId || null,
    profileCompleted: !!businessId
  });

  // Generate tokens
  const tokens = generateAuthTokens(user);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: createUserResponse(user),
      ...tokens
    }
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Generate tokens
  const tokens = generateAuthTokens(user);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: createUserResponse(user),
      ...tokens
    }
  });
});

/**
 * @desc    Logout user
 * @route   GET /api/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  // Note: In a more sophisticated setup, you might want to 
  // maintain a blacklist of tokens or use refresh tokens
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: {
      user: createUserResponse(user)
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
   const { name, businessId, profileCompleted } = req.body;
   
   const updateData = {
     name: name || req.user.name,
     ...(businessId && { businessId }),
     ...(profileCompleted !== undefined && { profileCompleted })
   };
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: createUserResponse(user)
    }
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});


const completeProfile = asyncHandler(async (req, res) => {
  const { businessId } = req.body;
  
  // Check if business ID already exists
  const existingUser = await User.findOne({ businessId });
  if (existingUser && existingUser._id.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: 'Business ID already exists. Please choose another one.'
    });
  }

  // Update user profile
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      businessId,
      profileCompleted: true
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    message: 'Profile completed successfully',
    data: {
      user: createUserResponse(user)
    }
  });
});


const googleAuth = asyncHandler(async (req, res) => {
  const state = crypto.randomBytes(32).toString('hex');
  const redirectUri = process.env.FRONTEND_URL || 'http://localhost:3000';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback')}&` +
    `response_type=code&` +
    `scope=profile email&` +
    `state=${state}&` +
    `access_type=offline&` +
    `prompt=consent`;

  // Store state in session or cache for validation

  req.oauthState = state;

  res.json({
    success: true,
    data: {
      authUrl,
      state
    }
  });
});


const googleAuthCallback = asyncHandler(async (req, res) => {
  const { state, code, error } = req.query;
  
  if (error) {
    const redirectUri = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${redirectUri}/login?error=oauth_failed&message=${error}`);
  }

  if (!state || !code) {
    const redirectUri = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${redirectUri}/login?error=oauth_failed&message=Invalid OAuth parameters`);
  }

  const user = req.user;
  
  if (!user) {
    const redirectUri = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${redirectUri}/login?error=oauth_failed&message=Authentication failed`);
  }

  // Generate tokens
  const tokens = generateAuthTokens(user);

  // Update last login
  user.lastLoginAt = new Date();
  await user.save();

  const redirectUri = process.env.FRONTEND_URL || 'http://localhost:3000';
  const tokenParam = encodeURIComponent(tokens.token);
  const refreshTokenParam = encodeURIComponent(tokens.refreshToken);
  
  // Redirect to frontend with tokens and profile completion status
  const profileCompleted = user.businessId && user.profileCompleted;
  res.redirect(`${redirectUri}/auth/callback?token=${tokenParam}&refreshToken=${refreshTokenParam}&success=true&profileCompleted=${profileCompleted}`);
});

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  completeProfile,
  googleAuth,
  googleAuthCallback
};