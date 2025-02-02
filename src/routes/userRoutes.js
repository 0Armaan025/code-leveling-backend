const express = require("express");
const mongoose = require("mongoose"); // Make sure mongoose is imported
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", (req, res) => {
    res.status(200).json({ message: "Getting all users from the database" });
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


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });

            // no matter what you gotta say that either of both is invalid, not only email so user will know something, yk what i mean
        }

        const isMatch = await user.comparePassword(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

        res.status(200).json({
            message: "Login successful!",
            token,
            user: user
        });
    }
    catch(e) {
        console.error("Error:", e.message);
        return res.status(500).json({
            message: "User login failed!",
            status: 500,
            error: e.message, // Send the error message for debugging
        });
    }
} );


module.exports = router;
