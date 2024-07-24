const express = require("express");
const brands = require("../models/brandsModels");
const { default: slugify } = require("slugify");
const ApiError = require("../utis/apiError");
const { createCategoryMiddleware } = require("../validators/categoryValidator");
const router = express.Router();

router.get("/", async (req, res) => {
  let brand = await brands.find({});
  res.json({ brand });
});

// filter brand
router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  let brand = await brands.findById(id);
  if (!brand) {
    return next(new ApiError(`this id not found`, 404));
  } else {
    res.status(200).json({ brand });
  }
});

// create brands
router.post("/", createCategoryMiddleware, async (req, res, next) => {
  const { name } = req.body;
  const brand = await brands.create({ name, slug: slugify(name) });
  if (!brand) {
    return next(new ApiError(`this name not found`, 404));
  } else {
    res.status(200).json({ brand });
  }
});

// // Update API
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  const brand = await brands.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  res.json({ brand });
});

module.exports = router;
