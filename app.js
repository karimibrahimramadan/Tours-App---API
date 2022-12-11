const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("colors");
const helmet = require("helmet");
const routesController = require("./routes/routesController");
const errorHandler = require("./controllers/errorController");

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/tours", routesController.tourRouter);
app.use("/api/v1/users", routesController.userRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: `${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

module.exports = app;
