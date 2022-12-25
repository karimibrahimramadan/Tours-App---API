const User = require("../models/User");
const APIFeatues = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
const getAllUsers = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatues(User.find(), req.query)
    .search()
    .filter()
    .limitFields()
    .sort()
    .paginate();
  const users = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
});

// @desc    Get user
// @route   GET /api/v1/users/:userId
// @access  Private
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

// @desc    Update logged in user
// @route   PATCH /api/v1/users/me/update
// @access  Private
const updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/me/delete
// @access  Private
const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { active: false } },
    { new: true }
  );
  res.status(204).json({
    status: "Success",
    message: "User has been deleted",
    data: null,
  });
});

module.exports = {
  getAllUsers,
  getUser,
  updateMe,
  deleteMe,
};
