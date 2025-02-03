const express = require("express");
const mongoose = require("mongoose"); // Make sure mongoose is imported
const router = express.Router();

const User = require("../models/User");





router.get("/", (req, res) => {
    res.status(200).json({ message: "Users 200 success!" });
});


router.post("/register", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists!",
                status: 400,
            });
        }

        let userData = req.body;
        let user = new User(userData);
        user._id = new mongoose.Types.ObjectId(); // Use mongoose correctly


        console.log("New User:", user);

        await user.save();

        return res.status(201).json({
            message: "User registration is successful!",
            status: 201,
            user: user,
        });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            message: "User registration failed!",
            status: 500,
            error: error.message, // Send the error message for debugging
        });
    }
});




module.exports = router;
