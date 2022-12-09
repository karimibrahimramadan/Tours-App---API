const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/User");

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.access_token) {
    token = req.cookies.access_token;
  } else if (req.headers.access_token) {
    token = req.headers.access_token;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  req.user = user;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Authorization denied", 401));
    } else {
      next();
    }
  };
};

module.exports = {
  protect,
  restrictTo,
};
