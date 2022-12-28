const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("colors");
const helmet = require("helmet");
const routesController = require("./routes/routesController");
const errorHandler = require("./controllers/errorController");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, Try again in an hour!",
});

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1", limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// routes
app.use("/api/v1/reviews", routesController.reviewRouter);
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
