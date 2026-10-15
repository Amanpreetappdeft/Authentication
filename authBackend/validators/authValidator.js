
const { body, validationResult } = require("express-validator");

const signupValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required"),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

module.exports = {
  signupValidator,
  loginValidator,
  checkValidation,
};
