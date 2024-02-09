const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true
  },

  email: {
    type: String,
  },

  phone: {
    type: Number,
  },

  expiration: {
    type: Date,
    required: true,
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
