const express = require("express");

const {
  createCategoryController,
  getAllCategoriesController,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// create category
router.post("/create", authMiddleware, createCategoryController);

// get all categories
router.get("/getAll", authMiddleware, getAllCategoriesController);
module.exports = router;
