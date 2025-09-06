const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const { validateRequest } = require("../middleware/validation");
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
} = require("../utils/validations");

const router = express.Router();

// Public routes
router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);

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

module.exports = router;
