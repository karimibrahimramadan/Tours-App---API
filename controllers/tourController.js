const Tour = require("../models/Tour");
const catchAsync = require("../utils/catchAsync");

// @desc    Create new tour
// @route   POST /api/v1/tours
// @access  Private
const createTour = catchAsync(async (req, res, next) => {
  const newTour = new Tour(req.body);
  const savedTour = await newTour.save();
  res.status(201).json({
    status: "success",
    message: "Tour created",
    data: {
      savedTour,
    },
  });
});

// @desc    Get tour
// @route   GET /api/v1/tours/:tourId
// @access  Private
const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) {
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// @desc    Get all tours
// @route   GET /api/v1/tours
// @access  Private
const getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

// @desc    Update tour
// @route   PATCH /api/v1/tours/:tourId
// @access  Private
const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(
    req.params.tourId,
    { $set: req.body },
    { new: true }
  );
  if (!tour) {
  }
  res.status(200).json({
    status: "success",
    message: "Tour updated",
    data: {
      tour,
    },
  });
});

// @desc    Delete tour
// @route   DELETE /api/v1/tours/:tourId
// @access  Private
const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.tourId);
  if (!tour) {
  }
  res.status(204).json({
    status: "success",
    message: "Tour deleted",
  });
});

module.exports = {
  createTour,
  getTour,
  getAllTours,
  updateTour,
  deleteTour,
};
