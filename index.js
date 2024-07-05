const DATABASE = require("./config/dataBasa");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const homeRouter = require("./routers/homeRouter");
const apiRouter = require("./routers/apiRouter");
const ApiError = require("./utis/apiError");
const { query } = require("express-validator");

// import database
DATABASE();

// import router file
app.use("/", homeRouter);
app.use("/api", apiRouter);

// ********
app.all("*", (req, res, next) => {
  next(new ApiError(`this rout: ${req.originalUrl} not found`), 400);

  // res.status(404).send(`
  //     <h1>this rout: ${req.originalUrl} not found</h1>
  //   `);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return err.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

let PORT = process.env.PORT;
const server = app.listen(PORT);

// error come out express
process.on("unhandledRejection", (err) => {
  console.log(`${err.name}`);
  server.close(() => {
    console.log("shutdown server");
  });
  process.exit(1);
});
