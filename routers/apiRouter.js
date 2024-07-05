const express = require("express");
const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");
const ApiError = require("../utis/apiError");
const { param, validationResult, check } = require("express-validator");
const router = express.Router();

const schema = new Schema(
  {
    name: String,
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

let categoryModul = model("study1", schema);

// read API
router.get(
  "/",
  check("name").notEmpty().withMessage("write name"),
  (req, res, next) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    next();
  },
  async (req, res, next) => {
    let category = await categoryModul.find({});

    if (!category) {
      return next(new ApiError(`this id not found`, 404));
    } else {
      res.json({ limit: category.length, category });
    }
  }
);

// create pages
router.get("/", async (req, res) => {
  let { page } = req.quer;
  let limit = 5;
  let skip = (page - 1) * limit;
  let categoryPage = await categoryModul.find({}).limit(limit).skip(skip);
  res.status(200).json({ page, data: categoryPage });
});

// filter category
router.get(
  "/:id",
  // use express validationResult
  param("id").isMongoId().withMessage("the id not valid"),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  async (req, res, next) => {
    let { id } = req.params;
    let category = await categoryModul.findById(id);
    if (!category) {
      return next(new ApiError(`this id not found`, 404));
    } else {
      res.status(200).json({ category });
    }
  }
);

// Update API
router.put("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  let { name } = req.body;
  try {
    let data = await categoryModul.create({ name, slug: slugify(name) });
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
