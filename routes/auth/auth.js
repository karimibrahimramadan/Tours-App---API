const router = require("express").Router();
const authController = require("../../controllers/authController");
const { protect } = require("../../middlewares/auth");

router.post("/signup", authController.signup);

router.get("/confirm-email/:token", authController.confirmEmail);

router.post("/login", authController.login);

router.patch("/me/updatepassword", protect, authController.updatePassword);

module.exports = router;
