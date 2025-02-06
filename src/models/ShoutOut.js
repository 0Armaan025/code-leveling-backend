const mongoose = require("mongoose");

const shoutOutSchema = new mongoose.Schema({
    profilePictureUrl: {
        type: String,
        required: true,
        match: [/^(http|https):\/\/[^ "]+$/, "Please provide a valid URL"],
    },
    devName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ShoutOut", shoutOutSchema);
