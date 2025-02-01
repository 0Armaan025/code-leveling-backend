const mongoose = require("mongoose");
const ProjectLanguage = require('./ProjectLanguage');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        codingTime: {
            type: Number,
            required: true,
            default: 0
        },
        startedOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        languages: {
            type: [ProjectLanguage.schema],
            default: []
        },

    }
});

module.exports = mongoose.model("Project", projectSchema);
