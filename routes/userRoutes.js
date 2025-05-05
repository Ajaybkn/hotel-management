const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// get user

router.get("/getUser", authMiddleware, getUserController);

// update user

router.put("/updateUser", authMiddleware, updateUserController);

//  reset  password
router.post("/resetPassword", authMiddleware, resetPasswordController);
//  update password
router.post("/updatePassword", authMiddleware, updatePasswordController);

//  delete user

router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
