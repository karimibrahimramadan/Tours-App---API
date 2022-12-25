const router = require("express").Router();
const authController = require("../../controllers/authController");
const userController = require("../../controllers/userController");
const { protect } = require("../../middlewares/auth");

router.post("/signup", authController.signup);

router.get("/confirm-email/:token", authController.confirmEmail);

router.post("/login", authController.login);

router.patch("/me/updatepassword", protect, authController.updatePassword);

router.patch("/forgotpassword", authController.forgotPassword);

router.patch("/resetpassword/:token", authController.resetPassword);

router.patch("/me/update", protect, userController.updateMe);

router.delete("/me/delete", protect, userController.deleteMe);

module.exports = router;
