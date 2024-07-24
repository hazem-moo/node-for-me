const { Schema, model } = require("mongoose");

const productSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minLength: [3, "too short this title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: [66, "description too short"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 2,
    },
    afterDiscout: {
      type: Number,
    },
    colors: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: true,
    },
    Images: [String],
    category: {
      type: Schema.ObjectId,
      ref: "amazon",
      required: true,
    },
    brand: {
      type: Schema.ObjectId,
      ref: "brands",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingQuatity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

let Product = model("product", productSchema);

module.exports = Product;
