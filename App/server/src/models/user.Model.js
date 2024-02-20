const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
 
  profileImage: {
    type: String,
  },

  email: {
    type: String,
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
    // maxlength: [18, `Password must be at most 18 characters long.`],
  },

  phone: {
    type: Number,
  },

  userType: {
    type: String,
    enum: ["user", "member", "admin"],
    default: "user",
  },
  
  members: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Member'
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum:['active','deleting'],
    default: 'active'
  },

});

//method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next(); // If password is not modified, move to the next middleware
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
