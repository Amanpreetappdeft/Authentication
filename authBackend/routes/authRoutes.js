
const express = require("express");
const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/authController");

const {
  signupValidator,
  loginValidator,
  checkValidation,
} = require("../validators/authValidator");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post(
  "/signup",
  signupValidator,
  checkValidation,
  signup
);

router.post(
  "/login",
  loginValidator,
  checkValidation,
  login
);

router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
