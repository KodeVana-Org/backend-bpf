const User = require("../models/user.Model");
const OTP = require("../models/otp.Model");
const otpSender = require("../utils/OtpSender");

exports.ForgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      throw new Error("Email or phone number is required.");
    }

    // Check if the provided input looks like an email or a phone number
    let verificationMethod, contactInfo;
    if (email) {
      if (!email.includes("@")) {
        throw new Error("Invalid email format.");
      }
      verificationMethod = "email";
      contactInfo = email;
    } else if (phone) {
      if (!/^\+?\d+$/.test(phone)) {
        throw new Error("Invalid phone number format.");
      }
      verificationMethod = "phone";
      contactInfo = phone;
    }

    const existingUser = await User.findOne({
      [verificationMethod]: contactInfo,
    });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate OTP
    const otp = Math.floor(10000 + Math.random() * 90000);

    // Save OTP and expiration time to the database
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in milliseconds

    // Save OTP to the database
    await OTP.create({
      [verificationMethod]: contactInfo,
      otp: otp,
      expiration: otpExpiration,
    });

    // Send OTP to user via email or SMS based on verificationMethod
    if (verificationMethod === "email") {
      otpSender.sendOTPByEmail(email, otp);
    } else if (verificationMethod === "phone") {
      otpSender.sendOTPViaSMS(phone, otp);
    }

    return res
      .status(200)
      .json({ otp, message: "OTP sent successfully. Please verify." });
  } catch (error) {
    console.error("Error sending OTP for password reset:", error);
    return res
      .status(500)
      .json({ error: "Failed to send OTP for password reset." });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { email, phone, otp, newPassword } = req.body;

    if ((!email && !phone) || !otp || !newPassword) {
      throw new Error("Email or phone, OTP, and new password are required.");
    }

    let verificationMethod, contactInfo;
    if (email) {
      verificationMethod = "email";
      contactInfo = email;
    } else if (phone) {
      verificationMethod = "phone";
      contactInfo = phone;
    }

    // Find the user in the OTP collection based on email or phone
    const userOTP = await OTP.findOne({
      [verificationMethod]: contactInfo,
    }).sort({ createdAt: -1 });

    // If user not found or OTP doesn't match, return error
    if (!userOTP || userOTP.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP or email/phone" });
    }

    // Check if OTP is expired
    const currentTimestamp = Date.now();
    if (currentTimestamp > userOTP.expiration) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Find the user based on email or phone
    const user = await User.findOne({ [verificationMethod]: contactInfo });

    // Update user's password
    user.password = newPassword;
    await user.save();

    // Delete the user's OTP data
    await OTP.deleteOne({ _id: userOTP._id });

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Failed to reset password." });
  }
};
