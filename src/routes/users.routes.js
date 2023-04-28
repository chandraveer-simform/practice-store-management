const express = require("express");
const checkAuth = require("../middleware/checkAuth.middleware");
const userFieldsValidation = require("../middleware/users.middleware");
const userControllers = require("../controllers/users.controllers");
const otpControllers = require("../controllers/otp.controllers");
const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/signup-by-otp", userControllers.signupWitOTP);
router.post("/login", userControllers.userLogin);
router.get("/me", checkAuth, userControllers.getMe);
router.get("/getAllUsers", checkAuth, userControllers.getAllUsers);
router.post("/send-otp", userFieldsValidation.sendOTPValidation, otpControllers.sendOTP);
router.post("/send-otp?:resend", userFieldsValidation.sendOTPValidation, otpControllers.sendOTP);
router.post("/verify-otp", otpControllers.verifiyOTP);
router.get("/get-all-otp", checkAuth, otpControllers.getAllOTP);

module.exports = router;
