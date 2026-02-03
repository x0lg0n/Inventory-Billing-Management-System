const express = require("express");
const passport = require("../config/passport");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  completeProfile,
  googleAuth,
  googleAuthCallback,
} = require("../controllers/authController");
const { authenticate, requireProfileCompleted } = require("../middleware/auth");
const { validateRequest } = require("../middleware/validation");
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  completeProfileValidation,
} = require("../utils/validations");

const router = express.Router();



// Public routes
router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);

// Complete profile route (protected but doesn't require completed profile)
router.post("/complete-profile", authenticate, completeProfileValidation, validateRequest, completeProfile);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", 
  passport.authenticate("google", { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth_failed`,
    session: false
  }),
  googleAuthCallback
);
router.get("/google/url", googleAuth);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.get("/logout", logout);
router.get("/profile", getProfile);
router.put("/profile", updateProfileValidation, validateRequest, updateProfile);
router.put(
  "/change-password",
  changePasswordValidation,
  validateRequest,
  changePassword
);

// Routes requiring completed profile
router.use(requireProfileCompleted); // All routes below require completed profile

module.exports = router;
