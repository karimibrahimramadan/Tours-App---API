const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("colors");
const helmet = require("helmet");
const routesController = require("./routes/routesController");
const connectDB = require("./config/db");
const errorHandler = require("./controllers/errorController");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/auth", routesController.authRouter);
app.use("/api/v1/tours", routesController.tourRouter);
app.use("/api/v1/users", routesController.userRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: `${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`.cyan.underline);
  await connectDB();
});
