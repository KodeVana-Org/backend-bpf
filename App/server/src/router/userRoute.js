const express = require("express");
const router = express.Router();
const userRoute = require("../controllers/Register.js");

//router to fetch
router.post("/register", userRoute.RegisterForm);
router.post("/verify-otp", userRoute.VerifyOTP);

module.exports = router;
