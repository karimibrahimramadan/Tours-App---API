const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A tour must have a description"],
      trim: true,
    },
    duration: { type: Number, required: [true, "A tour must have a duration"] },
    summary: { type: String, trim: true },
    slug: String,
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a max group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: ["Easy", "Medium", "Hard"],
    },
    price: { type: Number, required: [true, "A tour must have a price"] },
    priceDiscount: Number,
    ratingAverage: { type: Number, default: 0 },
    ratingQuantity: { type: Number, default: 0 },
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    startDates: [Date],
    secretTour: { type: Boolean, default: false, select: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const hookData = await this.model.findOne(this.getQuery()).select("__v");
  this.set({ __v: hookData.__v + 1 });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
