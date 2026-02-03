const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() {
      return !this.googleId; // Name is required if not OAuth user
    },
    trim: true,
    maxLength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password is required if not OAuth user
    },
    minLength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  businessId: {
    type: String,
    required: function() {
      return !this.googleId; // Business ID is required if not OAuth user
    },
    trim: true
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // OAuth2 fields
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  avatar: {
    type: String,
    trim: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLoginAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1, businessId: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.googleId;
  return userObject;
};

// Static method to find or create OAuth user
userSchema.statics.findOrCreateOAuthUser = async function(profile, provider) {
  const { id, emails, displayName, photos } = profile;
  const email = emails[0].value;
  const avatar = photos[0]?.value;

  // First try to find user by provider ID
  let user = await this.findOne({
    [`provider`]: provider,
    [`${provider}Id`]: id
  });

  // If not found, try to find by email
  if (!user) {
    user = await this.findOne({ email });
    
    // If user exists with same email, link the OAuth account
    if (user) {
      user[`${provider}Id`] = id;
      user.provider = provider;
      if (avatar && !user.avatar) user.avatar = avatar;
      user.emailVerified = true;
      user.lastLoginAt = new Date();
      await user.save();
      return user;
    }
  } else {
    // Update last login for existing OAuth user
    user.lastLoginAt = new Date();
    await user.save();
    return user;
  }

  // Create new OAuth user
  const newUser = await this.create({
    name: displayName || email.split('@')[0],
    email,
    [`${provider}Id`]: id,
    provider,
    avatar,
    emailVerified: true,
    profileCompleted: false,
    businessId: null, // Will be set during profile completion
    lastLoginAt: new Date()
  });

  return newUser;
};

module.exports = mongoose.model('User', userSchema);