const express = require("express");
const { default: slugify } = require("slugify");
const ApiError = require("../utis/apiError");
const categoryModul = require("../models/categoryModel");
const {
  getCategoryFilteration,
  createCategoryMiddleware,
  updateCategory,
  deleteCategory,
} = require("../validators/categoryValidator");
const router = express.Router();

let sub = require("./subCattegoryRouter");
router.use("/:id/sub", sub);

// read API
router.get("/", async (req, res, next) => {
  let category = await categoryModul.find({});
  if (!category) {
    return next(new ApiError(`this id not found`, 404));
  } else {
    res.json({ limit: category.length, category });
  }
});

// create pages
router.get("/", async (req, res) => {
  let { page } = req.quer;
  let limit = 5;
  let skip = (page - 1) * limit;
  let categoryPage = await categoryModul.find({}).limit(limit).skip(skip);
  res.status(200).json({ page, data: categoryPage });
});

// filter category
router.get("/:id", getCategoryFilteration, async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModul.findById(id);
  if (!category) {
    return next(new ApiError(`this id not found`, 404));
  } else {
    res.status(200).json({ category });
  }
});

// Update API
router.put("/:id", updateCategory, async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  const category = await categoryModul.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  res.json({ data: category });
});

// Creat API
router.post("/", createCategoryMiddleware, async (req, res) => {
  let { name } = req.body;
  try {
    let data = await categoryModul.create({ name, slug: slugify(name) });
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", deleteCategory, async (req, res) => {
  const { id } = req.params;
  let data = await categoryModul.findByIdAndDelete(id);
  res.status(200).json({ data });
});

module.exports = router;
