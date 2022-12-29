const Joi = require("joi");

const createReviewValidation = {
  body: Joi.object()
    .required()
    .keys({
      review: Joi.string().min(3).required(),
      rating: Joi.number().positive().min(1).max(5).required(),
    }),
  params: Joi.object()
    .required()
    .keys({
      tourId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const upateReviewValidation = {
  body: Joi.object()
    .required()
    .keys({
      review: Joi.string().min(3),
      rating: Joi.number().positive().min(1).max(5),
    }),
  params: Joi.object()
    .required()
    .keys({
      reviewId: Joi.string().hex().length(24).required(),
      tourId: Joi.string().hex().length(24).required(),
    }),
};

const deleteReviewValidation = {
  params: Joi.object()
    .required()
    .keys({
      reviewId: Joi.string().hex().length(24).required(),
      tourId: Joi.string().hex().length(24).required(),
    }),
};

const getReviewValidation = {
  params: Joi.object()
    .required()
    .keys({
      reviewId: Joi.string().hex().length(24).required(),
      tourId: Joi.string().hex().length(24).required(),
    }),
};

const getAllReviewsValidation = {
  params: Joi.object()
    .required()
    .keys({
      tourId: Joi.string().hex().length(24),
    }),
};

module.exports = {
  createReviewValidation,
  upateReviewValidation,
  deleteReviewValidation,
  getReviewValidation,
  getAllReviewsValidation,
};
