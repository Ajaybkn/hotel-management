const express = require("express");
const { testController } = require("../controllers/testController");

const router = express.Router();

// get|post|update|delete
router.get("/test-user", testController);

module.exports = router;
