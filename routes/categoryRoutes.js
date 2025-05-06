const express = require("express");

const {
  createCategoryController,
  getAllCategoriesController,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// create category
router.post("/create", authMiddleware, createCategoryController);

// get all categories
router.get("/getAll", authMiddleware, getAllCategoriesController);
// delete category
router.delete("/delete/:id", authMiddleware, deleteCategory);
router.put("/update/:id", authMiddleware, updateCategory);
module.exports = router;
