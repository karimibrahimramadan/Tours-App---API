const Tour = require("../models/Tour");
const APIFeatues = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @desc    Create new tour
// @route   POST /api/v1/tours
// @access  Private
const createTour = catchAsync(async (req, res, next) => {
  const newTour = new Tour(req.body);
  const savedTour = await newTour.save();
  res.status(201).json({
    status: "Success",
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
    return next(new AppError("Tour not found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

// @desc    Get all tours
// @route   GET /api/v1/tours
// @access  Private
const getAllTours = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatues(Tour.find(), req.query)
    .search()
    .filter()
    .limitFields()
    .sort()
    .paginate();
  const tours = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
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
    return next(new AppError("Tour not found", 404));
  }
  res.status(200).json({
    status: "Success",
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
    return next(new AppError("Tour not found", 404));
  }
  res.status(204).json({
    status: "Success",
    message: "Tour deleted",
  });
});

const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: "$difficulty",
        numOfRating: { $sum: "$ratingQuantity" },
        numOfTours: { $sum: 1 },
        avgRating: { $avg: "$ratingAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);
  console.log(stats);
  res.status(200).json({
    status: "Success",
    data: {
      stats,
    },
  });
});

// const getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1;
//   const plan = await Tour.aggregate([
//     {
//       $unwind: "$startDates",
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`year-01-01`),
//           $lte: new Date(`year-12-31`),
//         },
//       },
//     },
//   ]);
//   res.status(200).json({
//     status: "Success",
//     data: {
//       plan,
//     },
//   });
// });

module.exports = {
  createTour,
  getTour,
  getAllTours,
  updateTour,
  deleteTour,
  getTourStats,
  // getMonthlyPlan,
};
