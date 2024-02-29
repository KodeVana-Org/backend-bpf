const User = require('../models/user.Model');
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    try {
      const { email, phone, password } = req.body;
  
      if ((!email && !phone) || !password) {
        throw new Error("Email or phone and password are required.");
      }
  
      let query;
  
      // Check if login attempt is made using email or phone
      if (email) {
        query = { email: email };
      } else {
        query = { phone: phone };
      }
  
      // Find the user based on the provided email or phone
      const user = await User.findOne(query);
  
      // If no user found, return error
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Check if password matches
      const isPasswordMatch = await user.comparePassword(password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid password." });
      }
      
      //token-generate
      const token = jwt.sign({
        email:query,
        userType: user.userType,
        id: user._id
      },
      process.env.JWT_SECRET_KEY
      )
      // If email is provided, return user's email; otherwise, return phone
      const contactInfo = email ? user.email : user.phone;
  
      return res.status(200).json({ message: "Login successful." , contactInfo: contactInfo, token: token });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Failed to log in." });
    }
  };
  