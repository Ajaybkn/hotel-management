const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const getUserController = async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await userModel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // hiding password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "user found successfully",
      user,
    });
    res.status(200).send({
      success: true,
      message: "user data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get user API",
      error,
    });
  }
};
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update user api",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in password update API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
};
