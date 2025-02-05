const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Not done"
    },
    date: {
        type: Date,
        default: Date.now
    },
    xp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("task", taskSchema);
