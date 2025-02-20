const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const ShoutOut = require("../models/ShoutOut");


router.get("/", async (req, res) => {
    try {
        return res.status(200).json({ message: "Leaderboard 200 success!" });
    }
    catch (e) {
        res.status(500).json({ message: "Error fetching leaderboard", error: e.message });
    }
});

router.get("/get-leaderboard/:type", async (req, res) => {

    const { type } = req.params;

    //IDEA: first get all the users then based on type sort them and return them in the order
    //FOR NOW: Total coding time and DevBits only
    //TODO: add the by language feature

    try {
        const users = await User.find();
        let leaderboard = [];
        if (type === "total-coding-time") {
            leaderboard = users.sort((a, b) => b.totalCodingTime - a.totalCodingTime)
                .map((user, index) => ({ rank: index + 1, name: user.devName, totalCodingTime: user.totalCodingTime }));
        } else if (type === "dev-bits") {
            leaderboard = users.sort((a, b) => b.devBits - a.devBits)
                .map((user, index) => ({ rank: index + 1, name: user.devName, devBits: user.devBits }));
        }

        return res.status(200).json({ message: "Leaderboard fetched successfully", leaderboard });
    }
    catch (e) {
        return res.status(500).json({ message: "Error fetching leaderboard", error: e.message });
    }
});

// LET'S ADD SHOUT OUT ROUTES HERE ONLY OR SOMETHING


router.post("/add-shout-out/:email", async (req, res) => {

    const { email } = req.params;
    const { message } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingShoutOut = await ShoutOut.findOne({ devName: user.devName });
        if (existingShoutOut) {
            return res.status(400).json({ message: "Shout out for this user already exists" });
        }

        const profilePictureUrl = user.profileImageUrl;
        const devName = user.devName;

        const shoutOut = new ShoutOut({
            _id: new mongoose.Types.ObjectId(),
            message,
            profilePictureUrl,
            devName
        });

        await shoutOut.save();

        return res.status(201).json({ message: "Shout out added successfully", shoutOut });
    }
    catch (e) {
        return res.status(500).json({ message: "Error adding shout out", error: e.message });
    }

});

router.get("/get-shoutouts", async (req, res) => {
    try {
        const shoutOuts = await ShoutOut.find();
        return res.status(200).json({
            message: "Got all the shoutouts, 200!",
            shoutOuts: shoutOuts,

        }
        );
    }
    catch (e) {
        return res.status(500).json({
            message: "Some error is there",
            error: e.message,
        });
    }
});

router.delete("/remove-shout-out/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const shoutOut = await ShoutOut.findById(id);
        if (!shoutOut) {
            return res.status(404).json({ message: "Shout out not found" });
        }

        const currentTime = new Date();
        const shoutOutTime = new Date(shoutOut.createdAt);
        const timeDifference = currentTime - shoutOutTime;

        if (timeDifference > 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
            await ShoutOut.findByIdAndDelete(id);
            return res.status(200).json({ message: "Shout out removed successfully" });
        } else {
            return res.status(400).json({ message: "Shout out cannot be removed before 24 hours" });
        }
    } catch (e) {
        return res.status(500).json({ message: "Error removing shout out", error: e.message });
    }
});

module.exports = router;
