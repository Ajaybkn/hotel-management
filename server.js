const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

const app = express();

dotenv.config();
// DB connection-->>
connectDb();
// middlewares-->>
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("success ");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`.bgGreen);
});
