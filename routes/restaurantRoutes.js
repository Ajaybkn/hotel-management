const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestauarantController,
} = require("../controllers/restaurantController");

const router = express.Router();
// create restaurant
router.post("/create", authMiddleware, createRestaurantController);
// get all reataurants

router.get("/getAll", getAllRestauarantController);
module.exports = router;
