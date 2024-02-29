const JoinUser = require("../../models/join.Model");
const User = require("../../models/user.Model");
// const {
//   Tamulpur,
//   Baksa,
//   Chirang,
//   Kokrajhar,
//   Udalgury,
// } = require("../../models/dist.Model");

exports.JoinUser = async (req, res) => {
  try {
    //Todo is we need to extract userType from token
    // const { token } = req.userId;
    const { id } = req.body;
    const token = await User.findById(id);
    console.log(token);

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "id not found",
      });
    }
    // Check if the user is an admin or superAdmin
    if (token.userType !== "admin" && token.userType !== "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // If the user has permission, fetch all join users
    // const allJoinUser = await JoinUser.find();
    // const allJoinUser = await JoinUser.find().populate("user");
    let allJoinUsers = [];

    // Iterate over each district model and populate the user and district fields
    const districtModels = [Tamulpur, Baksa, Chirang, Kokrajhar, Udalgury];
    for (const DistrictModel of districtModels) {
      const joinUsers = await DistrictModel.find()
        .populate("user")
        .populate({
          path: "joinedId",
          populate: {
            path: "user",
          },
        });
      // Concatenate the join users from each district model
      allJoinUsers = allJoinUsers.concat(joinUsers);
    }
    const count = allJoinUsers.length;

    return res.status(200).json({
      success: true,
      message: "All Join Users fetched successfully",
      allUsers: allJoinUsers,
      total: count,
    });
  } catch (error) {
    console.error("Error fetching all join users:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all join users",
    });
  }
};
