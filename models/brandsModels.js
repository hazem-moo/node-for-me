const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "the feild is required"],
      maxLength: [35, "the litter high"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const brands = model("brands", schema);

module.exports = brands;
