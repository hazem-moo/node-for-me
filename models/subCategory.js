const { Schema, model } = require("mongoose");

const schemaSubCategory = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: "amazon",
    },
  },
  { timestamps: true }
);

let subCategoryModel = model("subCategory", schemaSubCategory);

module.exports = subCategoryModel;
