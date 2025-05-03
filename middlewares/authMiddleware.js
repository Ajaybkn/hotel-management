const JWT = require("jsonwebtoken");
const colors = require("colors");
module.exports = async (req, res, next) => {
  try {
    // get token from the body

    const token = req.headers["authorization"].split(" ")[1];
    // console.log(req);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "un-authorized user",
        });
      } else {
        // console.log(req);
        req.user = { id: decode.id }; // Set decoded user ID

        // req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Authorization Token",
      error,
    });
  }
};
