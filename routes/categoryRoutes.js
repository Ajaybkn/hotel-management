const express = require("express");

const {
  createCategoryController,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// create category
router.post("/create", authMiddleware, createCategoryController);
module.exports = router;
