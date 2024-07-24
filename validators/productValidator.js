const { check } = require("express-validator");
const validatorMiddlware = require("../middlewares/validatorMiddleware");
const categoryModul = require("../models/categoryModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is enpty")
    .isLength({ min: 3 })
    .withMessage("the length is lese than 3"),

  check("description")
    .notEmpty()
    .withMessage("the description not required")
    .isLength({ max: 66 })
    .withMessage("description must to least than 66"),

  check("quantity")
    .notEmpty()
    .withMessage("quantity must be required...")
    .isNumeric()
    .withMessage("quantity must to bo nmber"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("sold nor valid must to be number"),

  check("price")
    .isNumeric()
    .withMessage("price not valid must to be number....")
    .notEmpty()
    .withMessage("price not valid must to be required....")
    .isLength({ min: 2 })
    .withMessage("the price not valid muust to be more than 2 length..."),

  check("afterDiscount")
    .isNumeric()
    .withMessage("afterDiscout is must to be number")
    .custom(async (v, { req }) => {
      let prices = await req.body.price;
      if (prices <= v) {
        throw new Error(
          `the price is ${prices} greater than afterDiscount ${v}`
        );
      }
    })
    .optional(),

  check("colors")
    .optional()
    .isArray()
    .withMessage("colors not valid must to be array"),

  check("imageCover")
    .notEmpty()
    .withMessage("imageCover not valid must be required..."),

  check("Images")
    .optional()
    .isArray()
    .withMessage("Images not valid must to be array..."),

  check("category")
    .custom(async (id) => {
      let category = await categoryModul.findById(id).then((ele) => {
        if (!ele) {
          return Promise.reject("cateory not valid");
        }
      });
    })
    .isMongoId()
    .withMessage("category id not valid must to be object id...")
    .notEmpty()
    .withMessage("category not valid must to be required"),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("brand id not valid must to be Object id"),
  check("rating")
    .optional()
    .isNumeric()
    .withMessage("rrating must to be number")
    .isLength({ min: 1 })
    .withMessage("rratin it`s low")
    .isLength({ max: 5 })
    .withMessage("rratin it`s low"),
  check("ratingQuatity")
    .optional()
    .isNumeric()
    .withMessage("the ratingQuatity not valid must to be number"),

  validatorMiddlware,
];
