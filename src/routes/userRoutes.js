const express = require("express");
const mongoose = require("mongoose"); // Make sure mongoose is imported
const router = express.Router();
const multer = require('multer');
const imgbbUploader = require('imgbb-uploader');

const upload = multer({ storage: multer.memoryStorage() });


const User = require("../models/User");

router.get("/", (req, res) => {
    res.status(200).json({ message: "Users 200 success!" });
});


router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists!',
                status: 400,
            });
        }

        let profileImageUrl = '';

        if (req.file) {
            const apiKey = 'xxx'; // Replace with your ImgBB API key
            const buffer = req.file.buffer;
            const base64Image = buffer.toString('base64');

            const response = await imgbbUploader({
                apiKey: apiKey,
                base64string: base64Image,
            });

            profileImageUrl = response.url;
        }

        const userData = {
            ...req.body,
            profileImageUrl, // This will be either the uploaded image URL or an empty string
        };

        const user = new User(userData);

        await user.save();

        return res.status(201).json({
            message: 'User registration is successful!',
            status: 201,
            user: user,
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'User registration failed!',
            status: 500,
            error: error.message,
        });
    }
});
router.get("/get/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        return res.status(200).json({ message: "User fetched successfully", user: user });
    }
    catch (e) {
        return res.status(500).json({ message: "Error fetching user", error: e.message });
    }
});

router.put("/update/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const userData = req.body;
        user.set(userData);
        const result = await user.save().then((message) => {
            return res.status(200).json({ message: "User updated successfully", user: message });
        });


    }
    catch (e) {
        return res.status(500).json({ message: "Error updating user", error: e.message });
    }
});

router.delete("/delete/:email", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully", user: user });
    }
    catch (e) {
        return res.status(500).json({ message: "Error deleting user", error: e.message });
    }
});

router.get('/check/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            return res.status(200).json({ message: "User found" });
        }
    }
    catch (e) {
        return res.status(500).json({ message: "Error checking user", error: e.message });
    }
});



module.exports = router;
