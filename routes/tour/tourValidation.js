const Joi = require("joi");

const createTourValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(5).required(),
      description: Joi.string().min(5).required(),
      duration: Joi.number().positive().min(1).required(),
      summary: Joi.string().min(5),
      maxGroupSize: Joi.number().positive().required(),
      difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
      price: Joi.number().positive().required(),
      priceDiscount: Joi.number().positive(),
      imageCover: Joi.string().required(),
      secretTour: Joi.boolean().default(false),
      images: Joi.array().items(Joi.string()),
      startDates: Joi.array().items(Joi.date()),
      startLocation: Joi.object().keys({
        type: Joi.string().valid("Point"),
        coordinates: Joi.array().items(Joi.number()),
        address: Joi.string(),
        description: Joi.string(),
      }),
      locations: Joi.array().items(
        Joi.object().keys({
          type: Joi.string().valid("Point"),
          coordinates: Joi.array().items(Joi.number()),
          address: Joi.string(),
          description: Joi.string(),
          day: Joi.number(),
        })
      ),
      guides: Joi.array().items(Joi.string().hex().length(24)),
    }),
};

const updateTourValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(5),
      description: Joi.string().min(5),
      duration: Joi.number().positive().min(1),
      summary: Joi.string().min(5),
      maxGroupSize: Joi.number().positive(),
      difficulty: Joi.string().valid("Easy", "Medium", "Hard"),
      price: Joi.number().positive(),
      priceDiscount: Joi.number().positive(),
      imageCover: Joi.string(),
      secretTour: Joi.boolean().default(false),
      images: Joi.array().items(Joi.string()),
      startDates: Joi.array().items(Joi.date()),
      startLocation: Joi.object().keys({
        type: Joi.string().valid("Point"),
        coordinates: Joi.array().items(Joi.number()),
        address: Joi.string(),
        description: Joi.string(),
      }),
      locations: Joi.array().items(
        Joi.object().keys({
          type: Joi.string().valid("Point"),
          coordinates: Joi.array().items(Joi.number()),
          address: Joi.string(),
          description: Joi.string(),
          day: Joi.number(),
        })
      ),
      guides: Joi.array().items(Joi.string().hex().length(24)),
    }),
  params: Joi.object()
    .required()
    .keys({
      tourId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getTourValidation = {
  params: Joi.object()
    .required()
    .keys({
      tourId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteTourValidation = {
  params: Joi.object()
    .required()
    .keys({
      tourId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createTourValidation,
  updateTourValidation,
  getTourValidation,
  deleteTourValidation,
};
