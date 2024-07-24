const { validationResult } = require("express-validator");

const validatorMiddlware = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddlware;
