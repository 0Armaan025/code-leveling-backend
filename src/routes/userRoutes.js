const express = require("express");
const router = express.Router();
const User = require('../models/User');

// Example route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Getting all users from the database" });
});

router.post("/register", (req, res) => {

});

module.exports = router;
