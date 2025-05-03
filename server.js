const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
// middlewares-->>
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("success ");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`.bgGreen);
});
