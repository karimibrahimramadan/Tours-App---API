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
  reviewController.setUserAndTourIds,
  reviewController.createReview
);

router.get(
  "/",
  validation(validators.getAllReviewsValidation),
  reviewController.getAllReviews
);

router.get(
  "/:id",
  validation(validators.getReviewValidation),
  reviewController.getReview
);

router.patch(
  "/:id",
  restrictTo("admin", "user"),
  validation(validators.upateReviewValidation),
  reviewController.updateReview
);

router.delete(
  "/:id",
  restrictTo("admin", "user"),
  validation(validators.deleteReviewValidation),
  reviewController.deleteReview
);

module.exports = router;
