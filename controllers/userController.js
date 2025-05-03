const userModel = require("../models/userModel");

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
    res.status(400).send({
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

module.exports = { getUserController, updateUserController };
