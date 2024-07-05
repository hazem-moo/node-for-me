const { default: mongoose } = require("mongoose");
require("dotenv").config();

const DATABASE = () => {
  mongoose.connect(process.env.DB_URL).then((res) => {
    console.log(res.connection.host);
  });
};

module.exports = DATABASE;
