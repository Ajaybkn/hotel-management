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
module.exports = {
  createCategoryController,
  getAllCategoriesController,
  deleteCategory,
};
