const { check } = require("express-validator");
const validatorMiddlware = require("../middlewares/validatorMiddleware");

exports.createSubCategoryValidator = [
  check("name").isEmpty().withMessage("required"),
  // check("category")?.isMongoId().withMessage("id not valid"),
  validatorMiddlware,
];

exports.getSubCategoryWithId = [
  check("id").notEmpty().isMongoId().withMessage("id not valid"),
  check("name").notEmpty().withMessage("name not valid"),
  validatorMiddlware,
];

exports.updateSubCategory = [
  check("id").isMongoId().withMessage("id not valid"),
  validatorMiddlware,
];

exports.deleteSubCategory = [
  check("id").isMongoId().withMessage("id not valid"),
  validatorMiddlware,
];
