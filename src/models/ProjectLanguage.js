const mongoose = require("mongoose");

const projectLanguageSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    timeSpent: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("ProjectLanguage", projectLanguageSchema);
