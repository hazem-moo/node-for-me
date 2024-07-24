const e = require("express");
let subCategory = require("../models/subCategory");
const router = e.Router({ mergeParams: true });
const {
  createSubCategoryValidator,
  updateSubCategory,
} = require("../validators/subcategoryValidator copy");
const { default: slugify } = require("slugify");
const ApiError = require("../utis/apiError");

// get categorys
router.get("/", async (req, res) => {
  let categorys = await subCategory.find({ category: req.params.id });
  res.json({ categoryLength: categorys.length, categorys });
});

router.get("/:id", updateSubCategory, async (req, res) => {
  let { id } = req.params;
  let categorys = await subCategory.findById(id);
  res.json({ categorys });
});

router.put("/:id", updateSubCategory, async (req, res) => {
  let { id } = req.params;
  let { name, category } = req.body;
  let categorys = await subCategory.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category: category },
    { new: true }
  );
  res.json({ categorys });
});

router.post("/", createSubCategoryValidator, async (req, res, next) => {
  let { name, category } = req.body;
  let categorys = await subCategory.create({
    name,
    category,
    slug: slugify(name),
  });
  if (!categorys) {
    return next(new ApiError(`categorys not founnd her...`, 404));
  } else {
    res.json({ categorys });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const categorys = await subCategory.findByIdAndDelete(id);
  if (!categorys) {
    return next(new ApiError(`categorys not founnd her...`, 404));
  } else {
    res.json({ categorys });
  }
});

module.exports = router;
