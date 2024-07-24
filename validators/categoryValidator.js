const { check } = require("express-validator");
const validatorMiddlware = require("../middlewares/validatorMiddleware");

exports.getCategoryFilteration = [
  check("id").isMongoId().withMessage("the id not valid"),
  validatorMiddlware,
];

exports.updateCategory = [
  check("id").isMongoId().withMessage("the id not valid"),
  validatorMiddlware,
];

exports.deleteCategory = [
  check("id").isMongoId().withMessage("the id not valid"),
  validatorMiddlware,
];

exports.createCategoryMiddleware = [
  check("name")
    .notEmpty()
    .withMessage("name not found her...")
    .isLength({ min: 2 })
    .withMessage("the length is low")
    .isLength({ max: 20 })
    .withMessage("the length is high"),
  validatorMiddlware,
];
