const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    devName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        required: true,
        match: [/^(http|https):\/\/[^ "]+$/, "Please provide a valid URL"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    devBits: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0,
        required: true
    },
    tasks: {
        type: [String],
        default: []
    },
    level: {
        type: Number,
        default: 1
    },
    items: {
        type: [String],
        default: []
    },
    bestProject: {
        type: String,
        default: "No projects yet!"
    },
    bestProjectUrl: {
        type: String,
        default: "No projects yet!"
    },
    totalCodingTime: {
        type: Number,
        default: 0
    },
    projects: {
        type: [String],
        default: []
    },
});

module.exports = mongoose.model("User", userSchema);
