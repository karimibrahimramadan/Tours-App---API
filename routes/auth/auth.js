const router = require("express").Router();
const authController = require("../../controllers/authController");

router.post("/signup", authController.signup);

router.get("/confirm-email/:token", authController.confirmEmail);

router.post("/login", authController.login);

router.patch("/me/updatepassword", authController.updatePassword);

module.exports = router;
