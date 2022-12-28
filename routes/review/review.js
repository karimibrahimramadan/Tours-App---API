const router = require("express").Router();
const reviewController = require("../../controllers/reviewController");
const { protect, restrictTo } = require("../../middlewares/auth");
const validation = require("../../middlewares/validation");
const validators = require("./reviewValidation");

router.get(
  "/find/:id?",
  validation(validators.getAllReviewsValidation),
  reviewController.getAllReviews
);

router.get(
  "/:id",
  validation(validators.getReviewValidation),
  reviewController.getReview
);

router.use(protect);

router.post(
  "/",
  validation(validators.createReviewValidation),
  restrictTo("user"),
  reviewController.createReview
);

// router.patch(
//   "/:id",
//   restrictTo("admin", "user"),
//   reviewController.updateReview
// );

// router.delete(
//   "/:id",
//   validation(validators.deleteReviewValidation),
//   reviewController.deleteReview
// );

module.exports = router;
