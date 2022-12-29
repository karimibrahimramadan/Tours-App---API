const router = require("express").Router();
const tourController = require("../../controllers/tourController");
const { protect } = require("../../middlewares/auth");
const validation = require("../../middlewares/validation");
const validators = require("./tourValidation");
const reviewRouter = require("../review/review");

router.use("/:tourId/reviews", reviewRouter);

router.use(protect);

router.post(
  "/",
  validation(validators.createTourValidation),
  tourController.createTour
);

router.get("/tour-stats", tourController.getTourStats);

// router.get("/monthly-plan/:year", tourController.getMonthlyPlan);

router.get(
  "/:id",
  validation(validators.getTourValidation),
  tourController.getTour
);

router.get("/", tourController.getAllTours);

router.patch(
  "/:id",
  validation(validators.updateTourValidation),
  tourController.updateTour
);

router.delete(
  "/:id",
  validation(validators.deleteTourValidation),
  tourController.deleteTour
);

module.exports = router;
