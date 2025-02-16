const mongoose = require("mongoose");
const ProjectLanguage = require("./ProjectLanguage");
const Project = require("./Project");
const Item = require("./Item");
const bcrypt = require("bcryptjs");
const Task = require("./Task");
const Achievement = require("./Achievement");
const Notification = require("./Notification");

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

    profileImageUrl: {
        type: String,
        required: false,
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
    },
    tasks: {
        type: [Task.schema],
        default: []
    },
    level: {
        type: Number,
        default: 1
    },
    items: {
        type: [Item.schema],
        default: []
    },
    bestProject: {
        type: Project.schema,

        default: {

            projectName: "No project yet",
            languages: [],
            startedOn: Date.now(),
            codingTime: 0
        },
    },
    accountType: {
        type: String,
        default: "public",

    },

    totalCodingTime: {
        type: Number,
        default: 0
    },
    projects: {
        type: [Project.schema],
        default: []
    },
    achievements: {
        type: [Achievement.schema],
        default: []
    },
    notifications: {
        type: [Notification.schema],
        default: []
    },
    logs: {
        type: Map,
        of: Number,
        default: {}
    },
    apiKey: {
        type: String,
        default: "",
    }

});

// if the user is not being created for the first time or JUST BEING UPDATED, we WON'T change the pass part.



module.exports = mongoose.model("User", userSchema);
