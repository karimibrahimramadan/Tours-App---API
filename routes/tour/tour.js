const router = require("express").Router();
const tourController = require("../../controllers/tourController");

router.post("/", tourController.createTour);

router.get("/:tourId", tourController.getTour);

router.get("/", tourController.getAllTours);

router.patch("/:tourId", tourController.updateTour);

router.delete("/:tourId", tourController.deleteTour);

module.exports = router;
