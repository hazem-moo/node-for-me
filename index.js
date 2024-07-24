const DATABASE = require("./config/dataBasa");
const express = require("express");
require("dotenv").config();
const app = express();
const ApiError = require("./utis/apiError");
app.use(express.json());

const homeRouter = require("./routers/homeRouter");
const apiRouter = require("./routers/apiRouter");
let subCategoryRouter = require("./routers/subCattegoryRouter");
const router = require("./routers/brandsRouter");
const routerProduct = require("./routers/broductRouter");

// import database
DATABASE();

// import router file
app.use("/", homeRouter);
app.use("/menu", apiRouter);
app.use("/sub", subCategoryRouter);
app.use("/brands", router);
app.use("/products", routerProduct);

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
    // development module
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // production module
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
  console.log(err);
  server.close(() => {
    console.log("shutdown server");
  });
  process.exit(1);
});
