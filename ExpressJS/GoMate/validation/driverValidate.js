const { check, body, validationResult } = require("express-validator");

exports.validateDriver = [
  check("Name")
    .notEmpty()
    .withMessage("name must required")
    .isString()
    .withMessage("name must be string"),
  check("Mobile")
    .isMobilePhone()
    .withMessage("enter valid phone number")
    .isNumeric()
    .withMessage("enter a valid phone number"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  },
];
