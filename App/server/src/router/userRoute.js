const express = require("express");
const router = express.Router();
const lognRoute = require("../controllers/login.js");
const userRoute = require("../controllers/Register.js");
const profileRoute = require("../profile/me.js");

const verifyToken = require("../utils/verifyToken.js");
const DeleteAccount = require("../profile/deleteAccount.js");
const ForgotPass = require("../controllers/forgotPassword.js");
const joinMember = require("../controllers/member.js");

//router to fetch
router.post("/register", userRoute.RegisterForm);
router.post("/login", lognRoute.Login);
router.post("/verify-otp", userRoute.VerifyOTP);
router.get("/me", verifyToken, profileRoute.Profile);
router.post("/delete-account", verifyToken, DeleteAccount.DeleteAccount);
router.post("/cancel-delete", verifyToken, DeleteAccount.CancelDeletion);
router.post("/forgot-password", ForgotPass.ForgotPassword);
router.post("/reset-password", ForgotPass.ResetPassword);
router.post("/member", verifyToken, joinMember.Join);

module.exports = router;
