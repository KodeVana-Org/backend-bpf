const User = require("../models/user.Model.js");
const OTP = require("../models/otp.Model.js");
const otpSender = require("../utils/OtpSender.js");
const jwt = require("jsonwebtoken");
const { renderEmailTemplate } = require("../utils/template/loginWithOtp.js");

exports.RegisterForm = async (req, res) => {
  try {
    const { emailPhone } = req.body;
    let email;
    let phone;
    let phoneNumberWithCountryCode;

    if (!emailPhone) {
      throw new Error("Email or phone number is required.");
    }

    // Check if the provided input is an email or a phone number
    if (emailPhone.includes("@")) {
      email = emailPhone;
    } else {
      phone = emailPhone;
      phoneNumberWithCountryCode = "+91" + phone;
    }

    // Find existing OTP entry based on email or phone number
    let existingOTP;
    let existingUser;
    if (email) {
      existingOTP = await OTP.findOne({ email: email });
      existingUser = await User.findOne({ email: email });
    } else if (phoneNumberWithCountryCode) {
      existingOTP = await OTP.findOne({ phone: phoneNumberWithCountryCode });
      existingUser = await User.findOne({ phone: phone });
    }
    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User already exist",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (existingOTP) {
      // Update existing OTP entry with new OTP
      existingOTP.otp = otp;
      existingOTP.expiration = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes in milliseconds
      existingOTP.createdAt = new Date();
      await existingOTP.save();
    } else {
      // Create new OTP entry
      const newOTP = new OTP({
        email: email,
        phone: phoneNumberWithCountryCode,
        otp: otp,
        expiration: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes in milliseconds
        createdAt: new Date(),
      });
      await newOTP.save();
    }

    // Send OTP to user via email or SMS based on verificationMethod
    if (email) {
      const htmlTemplate = renderEmailTemplate(email, otp);
      otpSender.sendOTPByEmail(email, otp, htmlTemplate);
    } else if (phoneNumberWithCountryCode) {
      otpSender.sendOTPViaSMS(phoneNumberWithCountryCode, otp);
    }

    return res.status(200).json({
      message: "OTP sent successfully. Please verify.",
      data: otp,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

exports.VerifyOTP = async (req, res) => {
  try {
    const { email, otp, phone, password } = req.body;
    console.log(otp);

    if (!email && !phone && !password && !otp) {
      throw new Error("Email or Phone is required");
    }

    let verificationMethod;
    let contactInfo;

    if (email) {
      verificationMethod = "email";
      contactInfo = email;
    } else {
      verificationMethod = "phone";
      contactInfo = phone;
    }

    // Find the user in the OTP collection based on email or phone
    const userOTP = await OTP.findOne({
      [verificationMethod]: contactInfo,
    }).sort({ createdAt: -1 });

    // If user not found or OTP doesn't match, return error
    if (!userOTP || !userOTP.otp || userOTP.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP or email/phone" });
    }

    // Check if OTP is expired (e.g., after 5 minutes)
    const otpTimestamp = userOTP.createdAt.getTime();
    const currentTimestamp = Date.now();
    const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (currentTimestamp - otpTimestamp > otpValidityDuration) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // If OTP is valid, save the user and remove the OTP data
    const newUser = new User();
    if (email) {
      newUser.email = email;
    } else {
      newUser.phone = phone;
    }
    newUser.password = password;
    await newUser.save();

    // Remove the user data from the OTP collection
    await OTP.deleteOne({ _id: userOTP._id });

    //token-generate
    const token = jwt.sign(
      {
        email: contactInfo,
        userType: newUser.userType,
        id: newUser._id,
      },
      process.env.JWT_SECRET_KEY,
    );

    return res
      .status(200)
      .json({ message: "User saved successfully", token: token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};

exports.LoginWithOtp = async (req, res) => {
  try {
    const { phone, email } = req.body;
    let phoneNumberWithCountryCode;
    if (phone != undefined) {
      return (phoneNumberWithCountryCode = "+91" + phone);
    }

    console.log(phoneNumberWithCountryCode, email);
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

    if (email) {
      const existingUserByEmail = await User.findOne({ email: email });
      if (!existingUserByEmail) {
        return res
          .status(400)
          .json({ error: "user not found please register first." });
      }
    } else if (phoneNumberWithCountryCode) {
      const existingUserByPhone = await User.findOne({
        phone: phoneNumberWithCountryCode,
      });
      if (!existingUserByPhone) {
        return res
          .status(400)
          .json({ error: "User not found please register first." });
      }
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Save OTP and expiration time to the database
    const otpExpiration = new Date(Date.now() + 2 * 60 * 1000); // 5 minutes in milliseconds

    // Send OTP to user via email or SMS based on verificationMethod
    if (verificationMethod === "email") {
      const htmlTemplate = renderEmailTemplate(email, otp);
      otpSender.sendOTPByEmail(email, otp, htmlTemplate);
    } else if (verificationMethod === "phone") {
      otpSender.sendOTPViaSMS(phoneNumberWithCountryCode, otp);
    }

    let existingOTP = await User.findOne({
      $or: [{ email: email }, { phone: phoneNumberWithCountryCode }],
    });

    existingOTP.otp = otp;
    existingOTP.expiration = otpExpiration;
    existingOTP.createdAt = new Date();
    await existingOTP.save();
    return res.status(200).json({
      otp,
      message: "OTP sent successfully. Please verifym, and login.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

exports.VerifyOtpAndLogin = async (req, res) => {
  try {
    const { otp, email, phone } = req.body;

    let verificationMethod;
    let contactInfo;

    if (email) {
      verificationMethod = "email";
      contactInfo = email;
    } else {
      verificationMethod = "phone";
      contactInfo = phone;
    }
    const userOTP = await User.findOne({
      [verificationMethod]: contactInfo,
    }).sort({ createdAt: -1 });

    if (!userOTP || userOTP.otp !== otp || (!userOTP.email && !userOTP.phone)) {
      return res.status(400).json({ error: "Invalid OTP or email/phone" });
    }
    // Check if OTP is expired (e.g., after 5 minutes)
    const otpTimestamp = userOTP.createdAt.getTime();
    const currentTimestamp = Date.now();
    const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (currentTimestamp - otpTimestamp > otpValidityDuration) {
      return res.status(400).json({ error: "OTP expired" });
    }
    const deleteOtp = {
      $unset: { otp: 1 },
    };

    await User.updateOne({ _id: userOTP._id }, deleteOtp);
    //token-generate
    const token = jwt.sign(
      {
        data: contactInfo,
        userType: userOTP.userType,
        id: userOTP._id,
      },
      process.env.JWT_SECRET_KEY,
    );

    return res
      .status(200)
      .json({ message: "User saved successfully", token: token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};
