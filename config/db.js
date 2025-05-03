const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to DB ${mongoose.connection.host}`.bgBlue);
  } catch (error) {
    console.log("DB ERROR", errorbgRed);
  }
};

module.exports = connectDb;
