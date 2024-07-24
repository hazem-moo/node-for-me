const e = require("express");
const Product = require("../models/productModel");
let ApiError = require("../utis/apiError");
const { default: slugify } = require("slugify");
const { createProductValidator } = require("../validators/productValidator");
const router = e.Router();

router.get("/", async (req, res, next) => {
  let products = await Product.find({}).populate({
    path: "category",
    select: "name",
  });
  if (!products) {
    next(new ApiError("product not found", 404));
  } else {
    res.status(200).json({ counter: products.lenght, products });
  }
});

router.post("/", createProductValidator, async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const products = await Product.create(req.body);
  if (!products) {
    return next(new ApiError("products not found"));
  }
  return res.json({ products });
});

router.put("/:id", async (req, res, next) => {
  let { id } = req.params;
  if (req.body.slug) {
    req.body.slug = slugify(req.body.title);
  }
  let products = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!products) {
    next(new ApiError("product not found", 404));
  } else {
    res.status(200).json({ products });
  }
});

module.exports = router;
