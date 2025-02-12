const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Notification = require("../models/Notification");

router.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            message: "Notifs 200 success!"
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Error 500 for notifs at /",
            error: e.message
        });
    }
});

router.post('/trigger-notification/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { notificationData } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                status: 404
            });
        }
        else {
            const notification = new Notification({
                notificationData
            });

            await notification.save();

            user.notifications.push(notification);
            await user.save();

            return res.status(200).json({
                message: "Notification triggered successfully!",
                status: 200
            });

        }
    }
    catch (e) {
        return res.status(500).json(
            {
                message: "Some error is there, sorry!",
                error: e.message
            }
        );
    }
});


router.get("/get-notifications/:email", async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "some error, contact armaan pwease!",
                status: 404
            });
        }
        else {
            return res.status(200).json({
                message: "Notifications fetched successfully!",
                notifications: user.notifications,
                status: 200
            });
        }

    }
    catch (e) {
        return res.status(500).json({
            message: "Some error is there, sorry!",
            error: e.message
        })
    }
});

router.get("/get-all-notifications", async (req, res) => {
    try {
        const notifications = await Notification.find();

        return res.status(200).json({
            message: "Notifications fetched successfully!",
            notifications: notifications,
            status: 200
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Some error is there",
            error: e.message
        });
    }
});

module.exports = router;
