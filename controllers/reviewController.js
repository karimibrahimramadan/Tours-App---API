const Review = require("../models/Review");
const APIFeatues = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// @desc    Create new review
// @route   POST /api/v1/tours/:tourId/reviews
// @access  Private
const createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
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
// @route   PATCH /api/v1/tours/:tourId/reviews/:reviewId
// @access  Private
const updateReview = factory.updateOne(Review);

// @desc    Delete review
// @route   DELETE /api/v1/tours/:tourId/reviews/:reviewId
// @access  Private
const deleteReview = factory.deleteOne(Review);

// @desc    Get all reviews
// @route   GET /api/v1/tours/:tourId/reviews
// @access  Public
const getAllReviews = factory.getAll(Review);

// @desc    Get all reviews
// @route   GET /api/v1/tours/:tourId/reviews/:reviewId
// @access  Public
const getReview = factory.getOne(Review);

module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getReview,
  deleteReview,
};
