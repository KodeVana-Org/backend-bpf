const User = require("../models/user.Model.js");
const otpGenerator = require("otp-generator");
const OTP = require("../models/otp.Model.js");
const otpSender = require("../utils/OtpSender.js");

exports.RegisterForm = async (req, res) => {
  try {
    const { phone, password, email } = req.body;
    let phoneNumberWithCountryCode;
    if (phone!=undefined) {
      return  phoneNumberWithCountryCode = "+91" + phone;
    }
      

    console.log(phoneNumberWithCountryCode, password, email);
    let verificationMethod;

    if (!email && !phoneNumberWithCountryCode) {
      throw new Error("Email or phone number is required.");
    }

    // Check if the provided input looks like an email or a phone number
    if (email) {
      if (email.includes("@")) {
        verificationMethod = "email";
      } else {
        throw new Error("Invalid email format.");
      }
    } else if (phoneNumberWithCountryCode) {
      if (!/^\+?\d+$/.test(phone)) {
        throw new Error("Invalid phone number format.");
      }
      verificationMethod = "phone";
    }

    // Generate OTP
    const otp = Math.floor(10000 + Math.random() * 90000);
    console.log("the otp is :", otp);

    // Save OTP and expiration time to the database
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in milliseconds

    // Send OTP to user via email or SMS based on verificationMethod
    if (verificationMethod === "email") {
      otpSender.sendOTPByEmail(email, otp);
    } else if (verificationMethod === "phone") {
      otpSender.sendOTPViaSMS(phoneNumberWithCountryCode, otp);
    }

    // Save OTP and expiration time to the database
    await OTP.create({
      email: email,
      phone: phoneNumberWithCountryCode,
      otp: otp,
      expiration: otpExpiration,
    });

    return res
      .status(200)
      .json({ otp, message: "OTP sent successfully. Please verify." });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

exports.VerifyOTP = async (req, res) => {
  try {
    const { email, otp, phone } = req.body;
    console.log(email, phone);

    // Find the user in the database based on email or phone
    const user = await User.findOne({ email: email, phone: phone });

    // If user not found or OTP doesn't match, return error
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Check if OTP is expired (e.g., after 5 minutes)
    const otpTimestamp = user.createdAt.getTime();
    const currentTimestamp = Date.now();
    const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (currentTimestamp - otpTimestamp > otpValidityDuration) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Clear the OTP from the database (optional: you may want to keep it for audit purposes)
    await user.updateOne({ otp: null });

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};
