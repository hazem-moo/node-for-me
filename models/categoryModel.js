const { Schema, model } = require("mongoose");

let schema = new Schema(
  {
    name: {
      type: String,
      minLenght: [2, "the name is eny"],
      maxLenght: [20, "name is too high"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

let categoryModul = model("amazon", schema);

module.exports = categoryModul;
