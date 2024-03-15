const User = require("../models/user.Model");
exports.auth = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User is not exist",
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      message: "token verified successfully",
      email: user.email,
      userId: user.userID,
      name: user.firstName + user.lastName,
      userType: user.userType,
    },
  });
};
