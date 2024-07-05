const express = require("express");
const rout = express.Router();

rout.get("/", (req, res) => {
  res.send(`<h2>home</h2>`);
});

module.exports = rout;
