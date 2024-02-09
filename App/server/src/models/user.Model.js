const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   minlength: [5, `Username must be at least 5 characters long.`],
  //   maxlength: [32, `Username must be at most 32 characters long.`],
  //
  // },
  firstName: {
    type: String,
    required: true,
    minlength: [2, `First name must be at least 1 character long.`],
    maxlength: [32, `First name must be at most 32 characters long.`],
    validate: {
      validator: function (v) {
        return /^[A-Z][a-zA-Z]*$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid first name! First character must be capital and only letters are allowed.`,
    },
  },
  profileImage: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    minlength: [1, `Last name must be at least 1 character long.`],
    maxlength: [32, `Last name must be at most 32 characters long.`],
    validate: {
      validator: function (v) {
        return /^[A-Z][a-zA-Z]*$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid last name! First character must be capital and only letters are allowed.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [7, `Password must be at least 7 characters long.`],
    maxlength: [18, `Password must be at most 18 characters long.`],
  },
  phone: {
    type: Number,
  },
  location: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["user", "member", "admin"],
    default: "user",
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpiration: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
