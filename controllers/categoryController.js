const categoryModel = require("../models/categoryModel");
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created successfully!",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in create category API",
      error,
    });
  }
};
const getAllCategoriesController = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    if (allCategories.length == 0) {
      return res.status(404).send({
        success: false,
        message: "no categories to display!",
      });
    }
    res.status(200).send({
      success: true,
      message: "categories fetched successfully!",
      allCategories,
      total: allCategories.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all category API",
      error,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please provide idI",
        error,
      });
    }
    await categoryModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in delete category API",
      error,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    const { newCategory } = req.body;

    category.title = newCategory;
    await category.save();

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in update category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  deleteCategory,
  updateCategory,
};
