const router = require("express").Router();
const tourController = require("../../controllers/tourController");
const { protect } = require("../../middlewares/auth");

router.use(protect);

router.post("/", tourController.createTour);

router.get("/tour-stats", tourController.getTourStats);

// router.get("/monthly-plan/:year", tourController.getMonthlyPlan);

router.get("/:tourId", tourController.getTour);

router.get("/", tourController.getAllTours);

router.patch("/:tourId", tourController.updateTour);

router.delete("/:tourId", tourController.deleteTour);

module.exports = router;
