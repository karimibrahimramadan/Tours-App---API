const router = require("express").Router({ mergeParams: true });
const reviewController = require("../../controllers/reviewController");
const { protect, restrictTo } = require("../../middlewares/auth");
const validation = require("../../middlewares/validation");
const validators = require("./reviewValidation");

router.use(protect);

router.post(
  "/",
  validation(validators.createReviewValidation),
  restrictTo("user"),
  reviewController.createReview
);

router.get(
  "/",
  validation(validators.getAllReviewsValidation),
  reviewController.getAllReviews
);

router.get(
  "/:reviewId",
  validation(validators.getReviewValidation),
  reviewController.getReview
);

// router.patch(
//   "/:reviewId",
//   restrictTo("admin", "user"),
//   reviewController.updateReview
// );

// router.delete(
//   "/:reviewId",
//   validation(validators.deleteReviewValidation),
//   reviewController.deleteReview
// );

module.exports = router;
