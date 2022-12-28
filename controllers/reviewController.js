const Review = require("../models/Review");
const APIFeatues = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private
const createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const newReview = new Review(req.body);
  const savedReview = await newReview.save();
  res.status(201).json({
    status: "Success",
    message: "Review has been created",
    data: {
      review: savedReview,
    },
  });
});

// @desc    Update review
// @route   PATCH /api/v1/reviews/:id
// @access  Private
const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!review) {
    return next(new AppError("Review not found", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Review has been updated",
    data: {
      review,
    },
  });
});

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
// const deleteReview = catchAsync(async (req, res, next) => {
//   res.status(200).json({
//     status: "Success",
//     message: "Review has been updated",
//     data: {
//       review: updatedReview,
//     },
//   });
// });

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @access  Public
const getAllReviews = catchAsync(async (req, res, next) => {
  const filterObj = req.params.id ? { tour: req.params.id } : {};
  const apiFeatures = new APIFeatues(Review.find(filterObj), req.query)
    .filter()
    .limitFields()
    .search()
    .sort()
    .paginate();
  const reviews = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @access  Public
const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("Review not found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      review,
    },
  });
});

module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getReview,
};
