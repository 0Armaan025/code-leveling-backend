const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        default: "No title specified!"
    },
    message: {
        type: String,
        required: false,
        default: "No description/message specified!",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    icon: {
        type: String,
        required: false,
    },
    rewards: {
        type: [String],
        required: false,
    },
    time: {
        type: String,
        required: false,
        default: () => new Date().toLocaleTimeString(),
    }
});

module.exports = mongoose.model("Notification", NotificationSchema);