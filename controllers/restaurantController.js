const restaurantModel = require("../models/restaurantModel");
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    // creating restaurant collection in the mongoDB
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "restaurant created successfully",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in create restaurant API",
      error,
    });
  }
};
const getAllRestauarantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (restaurants.length === 0) {
      return res.status(401).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      message: "restaurants fetched successfully",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all restaurants API",
      error,
    });
  }
};
const getAllRestauarantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(401).send({
        success: false,
        message: "No such restaurant is found!",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get restaurant by id API",
      error,
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestauarantController,
  getAllRestauarantByIdController,
};
