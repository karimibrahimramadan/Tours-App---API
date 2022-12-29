const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatues = require("../utils/apiFeatures");

const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("Document not found", 404));
    }
    res.status(204).json({
      status: "Success",
      message: "Document has been deleted",
      data: null,
    });
  });
};

const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("Document not found", 404));
    }
    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};

const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const filterObj = req.params.tourId ? { tour: req.params.tourId } : {};
    const apiFeatures = new APIFeatues(Model.find(filterObj), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();
    const docs = await apiFeatures.query;
    res.status(200).json({
      status: "Success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });
};

const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!doc) {
      return next(new AppError("Document not found", 404));
    }
    res.status(200).json({
      status: "Success",
      message: "Document has been updated",
      data: {
        doc,
      },
    });
  });
};

module.exports = {
  deleteOne,
  getOne,
  getAll,
  updateOne,
};
