const { Schema } = require("mongoose");

let schema = Schema({
  name: {
    type: String,
    unique: [true, "unique name..."],
    minLength: [2, "name length it`s low"],
    maxLength: [20, "name length it`s lanch"],
  },
});
