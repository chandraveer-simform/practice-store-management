const express = require("express");
const { checkAuth, authUserAccess } = require("../middleware/checkAuth.middleware");
const userFieldsValidation = require("../middleware/users.middleware");
const userControllers = require("../controllers/users.controllers");
const otpControllers = require("../controllers/otp.controllers");
const { USER_ROLE } = require("../utils/constants");
const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/signup-by-otp", userControllers.signupWitOTP);
router.post("/login", userControllers.userLogin);
router.get("/me", checkAuth, userControllers.getMe);
router.get("/getAllUsers", checkAuth, authUserAccess([USER_ROLE.OWNER, USER_ROLE.SUPER_ADMIN]), userControllers.getAllUsers);
router.post("/send-otp", userFieldsValidation.sendOTPValidation, otpControllers.sendOTP);
router.post("/send-otp?:resend", userFieldsValidation.sendOTPValidation, otpControllers.sendOTP);
router.post("/verify-otp", otpControllers.verifiyOTP);
router.get("/get-all-otp", checkAuth, authUserAccess([USER_ROLE.OWNER, USER_ROLE.SUPER_ADMIN]), otpControllers.getAllOTP);

module.exports = router;
