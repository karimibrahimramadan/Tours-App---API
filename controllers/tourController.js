const Tour = require("../models/Tour");
const APIFeatues = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// @desc    Create new tour
// @route   POST /api/v1/tours
// @access  Private
const createTour = catchAsync(async (req, res, next) => {
  req.body.imageCover = `${req.protocol}://${req.get("host")}/${req.dest}/${
    req.files.imageCover[0].filename
  }`;
  let images = [];
  req.files.images.forEach((file) => {
    images.push(
      `${req.protocol}://${req.get("host")}/${req.dest}/${file.filename}`
    );
  });
  req.body.images = images;
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
const getTour = factory.getOne(Tour);

// @desc    Get all tours
// @route   GET /api/v1/tours
// @access  Private
const getAllTours = factory.getAll(Tour);

// @desc    Update tour
// @route   PATCH /api/v1/tours/:tourId
// @access  Private
const updateTour = factory.updateOne(Tour);

// @desc    Delete tour
// @route   DELETE /api/v1/tours/:tourId
// @access  Private
const deleteTour = factory.deleteOne(Tour);

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
